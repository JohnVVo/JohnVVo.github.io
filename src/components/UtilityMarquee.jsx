import React from "react";
import { motion } from "motion/react";

const UtilityMarquee = ({ utility, color }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-64 rounded-full">
      <motion.ul
        className={`inline-flex ${color}`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...utility, ...utility].map((utility, index) => (
          <li key={index} className="mx-4 text-2xl">
            {utility}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default UtilityMarquee;
