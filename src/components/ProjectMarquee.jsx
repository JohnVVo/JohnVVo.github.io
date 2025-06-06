import React, { useMemo } from "react";
import { motion } from "motion/react";
// Components
import Project from "./Project";
// Data
import projectsList from "../data/projectsList.json";

const ProjectMarquee = () => {
  const randomLayout = useMemo(
    () =>
      projectsList.map(() => ({
        width: `${Math.floor(Math.random() * 100 + 400)}px`, // 400–500px
        transform: `translateX(${Math.floor(
          Math.random() * 30 - 15
        )}px) translateY(${Math.floor(
          Math.random() * 140 - 70
        )}px) rotateZ(${Math.floor(Math.random() * 6 - 3)}deg)`, // -50-50px
      })),
    [projectsList]
  );

  return (
    <div className="h-full overflow-hidden w-full p-4">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 place-items-center"
        style={{ height: "200%" }}
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...projectsList, ...projectsList].map((project, index) => (
          <div
            key={index}
            className="m-4"
            style={{
              width: randomLayout[index % projectsList.length].width,
              transform: randomLayout[index % projectsList.length].transform,
            }}
          >
            <Project
              id={project.id}
              image={`./projects/${project.image.file[0]}`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectMarquee;
