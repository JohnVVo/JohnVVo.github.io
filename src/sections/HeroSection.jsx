import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
// Components
import Profile from "../components/Profile";
import Contact from "../components/Contact";

const ParallaxContext = createContext();
export const useParallaxContext = () => {
  return useContext(ParallaxContext);
};

const PopupContext = createContext();
export const usePopupContext = () => {
  return useContext(PopupContext);
};

const details = [
  {
    label: "Software Engineer",
    color: "bg-gradient-to-r from-violet-500 to-blue-500",
    courses: ["Software Engineering"],
    skills: [
      "React",
      "Tailwind",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    label: "AI/Machine Learning",
    color: "bg-gradient-to-r from-pink-400 to-pink-600",
    courses: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures",
      "Algorithms",
      "Statistics",
    ],
    skills: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  },
];

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const HeroSection = () => {
  const [popupId, setPopupId] = useState("");
  const containerRef = useRef(null);
  // Directional and rotational motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  return (
    <PopupContext.Provider value={{ popupId, setPopupId }}>
      <div className="h-screen p-4" ref={containerRef}>
        <div className="h-full flex flex-col md:flex-row items-center border rounded-lg p-4 justify-center bg-[url('/wave1.svg')] bg-no-repeat bg-cover bg-center">
          <ParallaxContext.Provider
            value={{ containerRef, x, y, rotateX, rotateY }}
          >
            <div className="w-full md:w-1/2 flex flex-col gap-y-8 place-items-center">
              <Profile details={details} />
              <p className="min-w-48 w-3/4 text-center max-h-64 overflow-y-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                fugit quia deleniti. Ratione necessitatibus expedita alias illo
                quidem a molestias earum, repellendus dolorem ab fugit
                voluptatem animi adipisci delectus quas!
              </p>
            </div>
          </ParallaxContext.Provider>
          <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
            <AnimatePresence>
              {popupId && (
                <motion.div
                  className="w-full flex justify-center h-1/3 gap-4 flex-col md:flex-row items-center md:place-items-stretch"
                  variants={variants}
                  animate={{ opacity: 1, y: [-100, 0] }}
                  transition={{ duration: 0.3, damping: 10 }}
                  exit={{ opacity: 0, y: -100 }}
                >
                  <aside className="flex w-full flex-col shadow-lg rounded-lg bg-white min-h-48">
                    <h3 className="text-center mb-4">Relevant Courses</h3>
                    <ul className="list-disc list-inside 2xl:mx-16 space-y-4 text-center md:text-start overflow-y-auto px-4">
                      <AnimatePresence mode="wait">
                        {details[
                          parseInt(popupId?.split("-")[1], 10)
                        ]?.courses?.map((course, index) => (
                          <motion.li
                            key={course}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3 }}
                          >
                            {course}
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </aside>
                  <aside className="flex flex-col w-full shadow-lg rounded-lg bg-white">
                    <h3 className="text-center mb-4">Skills</h3>
                    <grid className="list-none w-full grid md:flex md:flex-col lg:grid grid-cols-2 text-center gap-4">
                      <AnimatePresence mode="wait">
                        {details[
                          parseInt(popupId?.split("-")[1], 10)
                        ]?.skills?.map((skill, index) => (
                          <motion.li
                            key={skill}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3 }}
                          >
                            {skill}
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </grid>
                  </aside>
                </motion.div>
              )}
            </AnimatePresence>
            <Contact />
          </div>
        </div>
      </div>
    </PopupContext.Provider>
  );
};

export default HeroSection;
