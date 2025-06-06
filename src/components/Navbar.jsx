import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
// Context
import { useSectionContext } from "../App";
// Icons
import { Github, Linkedin, Mail } from "lucide-react";

// Variants
const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // delay between children
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Navbar = () => {
  const sections = [
    { id: "section-1", label: "1" },
    { id: "section-2", label: "2" },
    { id: "section-3", label: "3" },
  ];
  const { activeSection, setActiveSection, sectionRefs } = useSectionContext();

  const handleSectionClick = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 h-full w-36 flex flex-col items-center justify-center">
      <AnimatePresence>
        {activeSection !== "section-1" && (
          <motion.div
            className={`top-1/5 absolute mt-8 flex-col flex justify-center items-center`}
            variants={childVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <a className="p-2 cursor-pointer">
              <Linkedin />
            </a>
            <a className="p-2 cursor-pointer">
              <Mail />
            </a>
            <a className="p-2 cursor-pointer">
              <Github />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.ul
        className="space-y-6 rounded-full py-6 border-blue-400/50 border"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        {sections.map((section, index) => (
          <motion.li
            key={section.id}
            id={section.id}
            className={`relative text-2xl cursor-pointer px-6 w-full text-center ${
              activeSection === section.id ? "text-blue-900" : ""
            }`}
            onClick={() => handleSectionClick(index)}
            variants={childVariants}
          >
            {activeSection === section.id && (
              <motion.div
                className="absolute left-0 top-0 h-full w-full border-l-2 border-blue-900"
                layoutId="highlight"
              />
            )}
            <span className="relative z-10">{section.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navbar;
