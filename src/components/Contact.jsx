import React from "react";
import { motion } from "motion/react";
// Contexts
import { usePopupContext } from "../sections/HeroSection";
// Icons
import { Github, Linkedin, Mail } from "lucide-react";

const Contact = () => {
  const { popupId } = usePopupContext();

  return (
    <motion.div
      layout
      className={`hidden absolute w-2/5 md:flex flex-col items-center justify-center text-center`}
      animate={{ y: popupId ? 250 : 0 }}
      transition={{
        duration: 0.3,
        type: "spring",
        damping: 10,
        stiffness: 75,
      }}
    >
      <a
        href="#"
        className="border border-blue-400/50 rounded-full p-4 text-4xl shadow-lg hover:border-blue-900 hover:shadow-blue-100/50 transition-all duration-300"
      >
        Contact Me
      </a>
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <a href="#">
          <Linkedin size={32} />
        </a>
        <a href="#">
          <Mail size={32} />
        </a>
        <a href="#">
          <Github size={32} />
        </a>
      </div>
    </motion.div>
  );
};

export default Contact;
