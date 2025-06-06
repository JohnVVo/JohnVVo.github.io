import { useState, useEffect, useContext, createContext, useRef } from "react";
import { motion } from "motion/react";
import "./App.css";
// Components
import Navbar from "./components/Navbar";
// Sections
import HeroSection from "./sections/HeroSection";
import ProjectSection from "./sections/ProjectSection";
import ViewProjectSection from "./sections/ViewProjectSection";

// Create contexts
const SectionContext = createContext();
export const useSectionContext = () => {
  return useContext(SectionContext);
};

const ProjectContext = createContext();
export const useProjectContext = () => {
  return useContext(ProjectContext);
};

// Variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Sections
const mainSections = [
  <HeroSection />,
  <ProjectSection />,
  <ViewProjectSection />,
];

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [activeProjectId, setActiveProjectId] = useState(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
      console.log("Observing:", el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ProjectContext.Provider value={{ activeProjectId, setActiveProjectId }}>
      <SectionContext.Provider
        value={{ activeSection, setActiveSection, sectionRefs }}
      >
        <Navbar />
        <main className="pl-32">
          {mainSections.map((Section, index) => (
            <motion.section
              key={`section-${index}`}
              id={`section-${index + 1}`}
              ref={(el) => (sectionRefs.current[index] = el)}
              //
              variants={variants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.7, ease: "easeInOut" }}
              viewport={{ amount: 0.4 }}
            >
              {Section}
            </motion.section>
          ))}
        </main>
      </SectionContext.Provider>
    </ProjectContext.Provider>
  );
}

export default App;
