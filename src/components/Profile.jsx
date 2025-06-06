import React from "react";
import { motion, useSpring, useTransform } from "motion/react";
// Components
import NameTag from "./NameTag";
// Contexts
import { useParallaxContext } from "../sections/HeroSection";
import { usePopupContext } from "../sections/HeroSection";

const Profile = ({ details }) => {
  const { popupId, setPopupId } = usePopupContext();
  const { x, y, rotateX, rotateY } = useParallaxContext();
  const springX = useSpring(x);
  const springY = useSpring(y);

  const handlePopupClick = (e) => {
    const id = e.target.id;
    if (popupId === id) {
      setPopupId("");
    } else {
      setPopupId(id);
    }
  };

  return (
    <>
      <motion.div
        className="flex gap-x-4"
        transition={{ duration: 0.7 }}
        style={{
          x: useTransform(springX, (v) => v * 0.5),
          y: useTransform(springY, (v) => v * 0.5),
          rotateX: useTransform(rotateX, (v) => v * 0.5),
          rotateY: useTransform(rotateY, (v) => v * 0.5),
          transformPerspective: 600,
        }}
      >
        {details.map((detail, index) => (
          <button
            key={`detail-${index}`}
            id={`detail-${index}`}
            className={`cursor-pointer text-2xl text-transparent bg-clip-text ${detail.color} hover:opacity-80 `}
            onClick={(e) => handlePopupClick(e)}
          >
            {detail.label}
          </button>
        ))}
      </motion.div>
      <div className="rotate-2">
        <NameTag />
      </div>
    </>
  );
};

export default Profile;
