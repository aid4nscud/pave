"use client";
import { motion } from "framer-motion";

export function Aurora() {
  return (
    <div className="aurora">
      <motion.div className="blob" style={{ background: "radial-gradient(closest-side, rgba(139,30,45,0.55), transparent)" }} initial={{ x: -200, y: 0 }} animate={{ x: 120, y: -40 }} transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
      <motion.div className="blob" style={{ background: "radial-gradient(closest-side, rgba(166,30,42,0.45), transparent)" }} initial={{ x: 300, y: -60 }} animate={{ x: -60, y: 40 }} transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
      <motion.div className="blob" style={{ background: "radial-gradient(closest-side, rgba(244,63,94,0.4), transparent)" }} initial={{ x: 80, y: 80 }} animate={{ x: 40, y: -10 }} transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
    </div>
  );
}


