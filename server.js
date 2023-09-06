import * as path from "node:path";
import * as url from "node:url";
import { Sequelize, Op, DataTypes } from "sequelize";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config({ path: path.resolve(__dirname, ".env") });

const database = new Sequelize({
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
});

const Survey = database.define("surveys", {
  uuid: DataTypes.UUID,
  answers: DataTypes.JSON,
  deviceCreatedAt: DataTypes.DATE,
  hostname: DataTypes.TEXT,
  mode: DataTypes.TEXT,
});

const port = process.env.PORT ?? 3000;
const corsOrigins = (process.env.CORS_ORIGNS ?? "").split(",");

database
  .sync({ alter: true })
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(
      cors({
        origin(origin, next) {
          if (origin && !corsOrigins.includes(origin)) {
            return next(new Error("Not allowed by CORS"));
          }
          next(null, true);
        },
        credentials: true,
      }),
    );
    app.post("/api/sync-entries", async (req, res) => {
      try {
        if (!Array.isArray(req.body.entries)) {
          return res
            .status(422)
            .json({ errors: { server: "Failed to sync entries" } });
        }

        if (req.body.id === "surveys") {
          const alreadySyncedEntries = await Survey.findAll({
            attributes: ["uuid"],
            where: {
              uuid: { [Op.in]: req.body.entries.map((entry) => entry.uuid) },
            },
          });
          const entriesToSync = req.body.entries.filter((entry) => {
            const found = alreadySyncedEntries.find((alreadySyncedEntry) => {
              return alreadySyncedEntry.uuid === entry.uuid;
            });
            return found === undefined;
          });
          await Survey.bulkCreate(
            entriesToSync.map((entryToSync) => {
              return {
                uuid: entryToSync.uuid,
                answers: entryToSync.answers,
                deviceCreatedAt: entryToSync.createdAt,
                hostname: req.body.hostname,
                mode: req.body.mode,
              };
            }),
          );
          return res.status(201).json({ errors: { server: "Entries synced" } });
        }
        res.status(422).json({ errors: { server: "Failed to sync entries" } });
      } catch (err) {
        console.error(err);
        res.status(422).json({ errors: { server: "Failed to sync entries" } });
      }
    });
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
