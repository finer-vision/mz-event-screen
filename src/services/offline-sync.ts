import { update } from "idb-keyval";

type ID = string;

type Entry<Data = object> = Data & {
  uuid: string;
  syncingToServer: boolean;
  syncedToServer: boolean;
};

type OfflineSyncOptions = {
  ids: ID[];
  serverUrl: string;
  mode: string;
  syncInterval?: number;
  syncChunkSize?: number;
};

class OfflineSync {
  private readonly serverUrlEndpoint: OfflineSyncOptions["serverUrl"];
  private readonly mode: OfflineSyncOptions["mode"];
  private timeout?: NodeJS.Timeout;
  private readonly syncInterval: number;
  private readonly syncChunkSize: number;
  private ids: OfflineSyncOptions["ids"] = [];

  constructor(options: OfflineSyncOptions) {
    this.ids = options.ids;
    this.serverUrlEndpoint = options.serverUrl;
    this.mode = options.mode;
    this.syncInterval = options.syncInterval ?? 5000;
    this.syncChunkSize = options.syncChunkSize ?? 10;
  }

  async save<Data>(id: ID, data: Data) {
    if (!this.ids.includes(id)) {
      this.ids.push(id);
    }
    await update<Entry<Data>[]>(id, (entries = []) => {
      return entries.concat({
        ...data,
        uuid: this.uuid(),
        syncingToServer: false,
        syncedToServer: false,
      });
    });
  }

  start() {
    Promise.allSettled(
      this.ids.map(async (id) => {
        try {
          // Reset entries in syncing to server state
          await update<Entry[]>(id, (entries = []) => {
            return entries.map<Entry>((entry) => {
              if (entry.syncingToServer && !entry.syncedToServer) {
                return { ...entry, syncingToServer: false };
              }
              return entry;
            });
          });
        } catch (err) {
          console.error(err);
        }
      }),
    ).finally(() => this.process());
  }

  private process() {
    clearTimeout(this.timeout);
    if (this.ids.length === 0) {
      this.timeout = setTimeout(() => this.process(), this.syncInterval);
      return;
    }
    Promise.allSettled(this.ids.map((id) => this.sync(id))).finally(() => {
      this.timeout = setTimeout(() => this.process(), this.syncInterval);
    });
  }

  private async sync<Data>(id: ID) {
    let unSyncedEntries: Entry<Data>[] = [];
    try {
      // Flag un-synced entries as syncing to the server
      await update<Entry<Data>[]>(id, (entries = []) => {
        unSyncedEntries = entries.filter(
          (entry) => !entry.syncingToServer && !entry.syncedToServer,
        );
        return entries.map<Entry<Data>>((entry) => {
          if (entry.syncingToServer || entry.syncedToServer) return entry;
          return { ...entry, syncingToServer: true };
        });
      });
    } catch (err) {
      console.error(err);
    }
    // Sync entries to the server chunk-by-chunk
    const chunks = this.chunk(unSyncedEntries, this.syncChunkSize);
    for (const entries of chunks) {
      const uuids = entries.map((entry) => entry.uuid);
      let syncedUuids: string[] = [];
      try {
        const res = await fetch(this.serverUrlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            hostname: location.hostname,
            mode: this.mode,
            entries,
          }),
        });
        if (res.ok) {
          syncedUuids = [...uuids];
        }
      } catch (err) {
        console.error(err);
      }
      // Flag successfully synced entries as synced to the server
      try {
        await update<Entry<Data>[]>(id, (entries = []) => {
          return entries.map<Entry<Data>>((entry) => {
            if (!uuids.includes(entry.uuid)) return entry;
            return {
              ...entry,
              syncingToServer: false,
              syncedToServer: syncedUuids.includes(entry.uuid),
            };
          });
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  private chunk<T = any>(array: T[], size: number) {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunks.push(chunk);
    }
    return chunks;
  }

  private uuid() {
    let d = Date.now();
    let d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

const offlineSync = new OfflineSync({
  ids: ["surveys"],
  serverUrl: import.meta.env.VITE_SERVER_URL,
  mode: import.meta.env.MODE,
});

export default offlineSync;
