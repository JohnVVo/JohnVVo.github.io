import React from "react";
import { motion } from "motion/react";
// Contexts
import { useProjectContext } from "../App";
import { useSectionContext } from "../App";

const Project = ({ id, image }) => {
  const { setActiveProjectId } = useProjectContext();
  const { setActiveSection, sectionRefs } = useSectionContext();

  const handleClick = (e) => {
    setActiveProjectId(id);
    sectionRefs.current[2]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="rounded-lg overflow-hidden shadow-lg p-4 m-4 cursor-pointer"
      whileHover={{ scale: 1.05, opacity: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => handleClick(e)}
    >
      <img
        src={image}
        alt="Project preview"
        className="w-full h-auto object-contain rounded-lg"
      />
    </motion.div>
  );
};

export default Project;
