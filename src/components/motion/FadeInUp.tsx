"use client";

import { motion } from "framer-motion";

type FadeInUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function FadeInUp({ children, className, delay = 0 }: FadeInUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
