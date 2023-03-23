import React from "react";
import { motion } from "framer-motion";

export default ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: Function;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
