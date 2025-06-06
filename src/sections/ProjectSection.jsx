import React, { useState } from "react";
import { motion } from "motion/react";
// Components
import UtilityMarquee from "../components/UtilityMarquee";
import ProjectMarquee from "../components/ProjectMarquee";

const ProjectSection = () => {
  return (
    <div className="h-screen p-4">
      <div className="h-full flex flex-col md:flex-row border rounded-lg px-4 items-center bg-[url('/wave2.svg')] bg-no-repeat bg-cover bg-center">
        <div className="flex flex-col ">
          {/* <UtilityMarquee /> */}
          <h2 className="text-center">Explore my projects!</h2>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <ProjectMarquee />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
