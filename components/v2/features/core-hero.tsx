"use client";

import { motion } from "framer-motion";

export function CoreFeaturesHero() {
  return (
    <div className="lg:col-span-1 bg-linear-to-b from-[#003DEF] to-[#101980] rounded-xl md:rounded-4xl p-8 relative overflow-hidden min-h-125 flex-col justify-center items-center shadow-lg hidden md:flex">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="absolute bottom-80 right-24 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
      >
        Low cost
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          bounce: 0.5,
          duration: 0.8,
          delay: 0.1,
        }}
        className="absolute bottom-60 -rotate-12 right-21.25 md:right-28 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
      >
        Fast settlement
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          bounce: 0.5,
          duration: 0.8,
          delay: 0.2,
        }}
        className="absolute bottom-44 -rotate-3 left-16 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
      >
        Enhanced security
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          bounce: 0.5,
          duration: 0.8,
          delay: 0.3,
        }}
        className="absolute bottom-20 left-16 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
      >
        Multi-currency support
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -150, x: "-50%", scale: 0.5 }}
        whileInView={{ opacity: 1, y: "-50%", x: "-50%", scale: 0.9 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          bounce: 0.6,
          duration: 0.8,
          delay: 0.4,
        }}
        className="absolute top-[39%] md:top-[58%] rotate-10 left-[30%] bg-white text-[#6B7280] px-4 py-2  rounded-full text-sm font-bold shadow-xl z-10"
      >
        Global Access
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          bounce: 0.5,
          duration: 0.8,
          delay: 0.5,
        }}
        className="absolute bottom-28 rotate-25 left-[43%] translate-x-10 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
      >
        Easy payment
      </motion.div>

      <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
    </div>
  );
}
