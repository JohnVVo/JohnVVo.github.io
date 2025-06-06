import React, { useState, useEffect, reateContext, useContext } from "react";
import {
  motion,
  AnimatePresence,
  wrap,
  useMotionValue,
  useTransform,
} from "motion/react";
// Components
import UtilityMarquee from "../components/UtilityMarquee";
// Icons
import { ArrowUpToLine, ChevronUp, ChevronDown } from "lucide-react";
// Data
import projectsList from "../data/projectsList.json";
// Contexts
import { useProjectContext } from "../App";
import { useSectionContext } from "../App";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  enter: (direction) => ({
    y: -direction * 50,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    y: direction * 50,
    opacity: 0,
  }),
};

const ViewProjectSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { activeProjectId, setActiveProjectId } = useProjectContext();
  const { sectionRefs } = useSectionContext();
  const [showArrow, setShowArrow] = useState(false);
  const [direction, setDirection] = useState(1);
  // Motion values for drag
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.2, 1, 0.2]);

  const setSlide = (newDirection) => {
    const newActiveProjectId = wrap(
      0,
      projectsList.length,
      activeProjectId - 1 + newDirection
    );
    setDirection(newDirection);
    setActiveProjectId(newActiveProjectId + 1);
    setCurrentImageIndex(0); // Reset to first image of new project
  };
  console.log("Active Project ID:", activeProjectId);

  return (
    <div className="h-screen p-4">
      <div className="h-full flex flex-col md:flex-row border rounded-lg p-4 items-center bg-[url('/stacked_waves1.svg')] bg-no-repeat bg-cover bg-center">
        {activeProjectId ? (
          <div className="w-full h-full flex items-center">
            <div className="w-2/5 h-full  flex flex-col gap-4 justify-center items-center">
              <div className="h-1/2 flex flex-col gap-4 justify-end items-center">
                <button
                  className="z-10 cursor-pointer"
                  onClick={() => setSlide(-1)}
                >
                  <ChevronUp color="white" size={48} />
                </button>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.a
                    key={activeProjectId}
                    style={{ x, opacity }}
                    className="text-4xl"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.3,
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {projectsList[activeProjectId - 1]?.name}
                  </motion.a>
                </AnimatePresence>
                <button
                  className="z-10 cursor-pointer"
                  onClick={() => setSlide(1)}
                >
                  <ChevronDown color="white" size={48} />
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  className="h-1/2 flex flex-wrap flex-col items-center gap-4"
                  key={activeProjectId}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <UtilityMarquee
                    utility={projectsList[activeProjectId - 1].utility}
                    color={projectsList[activeProjectId - 1].color}
                  />
                  <ul className="list-disc list-inside px-16">
                    {projectsList[activeProjectId - 1].description.map(
                      (desc, index) => (
                        <li key={index} className="italic">
                          {desc}
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="w-3/5 h-full flex items-center justify-center"
                key={activeProjectId}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`./projects/${
                    projectsList[activeProjectId - 1]?.image.file[
                      currentImageIndex
                    ]
                  }`}
                  className="rounded-lg bg-white shadow-lg border-16 border-white"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div
              className="relative p-4 cursor-pointer hover:opacity-80"
              onMouseEnter={() => setShowArrow(true)}
              onMouseLeave={() => setShowArrow(false)}
              onClick={() =>
                sectionRefs.current[1]?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <AnimatePresence>
                {showArrow && (
                  <motion.div className="absolute top-0 left-0 w-full h-full place-items-center">
                    <motion.div
                      className="pb-2"
                      initial={{ opacity: 0, y: -10, rotateZ: -10 }}
                      animate={{ opacity: 1, y: -50, rotateZ: 0 }}
                      exit={{ opacity: 0, y: -10, rotateZ: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpToLine color="white" size={48} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              <h2 className="h-full text-center text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-indigo-600">
                Click on a project to learn more.
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProjectSection;
