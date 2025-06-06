import React, { useEffect } from "react";
import { motion, useSpring, animate } from "motion/react";
// Contexts
import { useParallaxContext } from "../sections/HeroSection";

const NameTag = () => {
  const { containerRef, x, y, rotateX, rotateY } = useParallaxContext();
  const springX = useSpring(x);
  const springY = useSpring(y);
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e) => {
      // Get boundaries of container
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left - rect.width / 2;
      const relativeY = e.clientY - rect.top - rect.height / 2;

      const maxOffset = 50;
      const maxRotate = 20;
      const resistance = 0.1;

      const offsetX = Math.max(
        -maxOffset,
        Math.min(maxOffset, relativeX * resistance)
      );
      const offsetY = Math.max(
        -maxOffset,
        Math.min(maxOffset, relativeY * resistance)
      );

      animate(x, offsetX, { duration: 0.3, easing: "ease-out" });
      animate(y, offsetY, { duration: 0.3, easing: "ease-out" });

      animate(rotateX, (-offsetY / maxOffset) * maxRotate, {
        duration: 0.3,
        easing: "ease-out",
      });
      animate(rotateY, (offsetX / maxOffset) * maxRotate, {
        duration: 0.3,
        easing: "ease-out",
      });
    };

    const resetPosition = () => {
      animate(x, 0, { duration: 0.4, easing: "ease-out" });
      animate(y, 0, { duration: 0.4, easing: "ease-out" });
      animate(rotateX, 0, { duration: 0.5, easing: "ease-out" });
      animate(rotateY, 0, { duration: 0.5, easing: "ease-out" });
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", resetPosition);

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", resetPosition);
    };
  }, [x, y]);

  return (
    <motion.div
      className="bg-red-400 text-white w-72 place-items-center text-center p-2 rounded-lg shadow-lg"
      transition={{ duration: 0.7 }}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 600,
      }}
    >
      <h1 className="w-full tracking-wider">HELLO</h1>
      <p className="text-xl">my name is</p>
      <h2 className="bg-white p-2 rounded-lg text-black mt-2 w-full font-gloria">
        John Vo
      </h2>
    </motion.div>
  );
};

export default NameTag;
