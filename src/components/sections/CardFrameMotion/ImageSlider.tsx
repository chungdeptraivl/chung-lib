"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ImageSlider: React.FC = () => {
  const [positionIndexes, setPositionIndexes] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7,
  ]);

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 7) % 8
      );

      return updatedIndexes;
    });
  };

  const handleImageClick = (clickedIndex: number) => {
    const centerIndex = positionIndexes.indexOf(0);

    if (clickedIndex === centerIndex) {
      handleBack();
    } else {
      const updatedIndexes = [...positionIndexes];
      const clickedPosition = positionIndexes[clickedIndex];

      for (let i = 0; i < updatedIndexes.length; i++) {
        if (updatedIndexes[i] < clickedPosition) {
          updatedIndexes[i] = (updatedIndexes[i] + (8 - clickedPosition)) % 8;
        } else if (updatedIndexes[i] >= clickedPosition) {
          updatedIndexes[i] = (updatedIndexes[i] - clickedPosition) % 8;
        }
      }
      updatedIndexes[clickedIndex] = 0;

      setPositionIndexes(updatedIndexes);
    }
  };

  const images = [
    "/city1.png",
    "/city2.png",
    "/city3.png",
    "/p1.png",
    "/p2.png",
    "/p3.png",
    "/planet1.png",
    "/planet2.png",
  ];

  const positions = [
    "center",
    "right1",
    "right2",
    "right3",
    "right4",
    "right5",
    "right6",
    "right7",
  ];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 8 },
    right1: { x: "60%", scale: 0.9, zIndex: 7 },
    right2: { x: "100%", scale: 0.8, zIndex: 6 },
    right3: { x: "100%", scale: 0.7, zIndex: 5, opacity: 0 },
    right4: { x: "100%", scale: 0.6, zIndex: 4, opacity: 0 },
    right5: { x: "100%", scale: 0.5, zIndex: 3, opacity: 0 },
    right6: { x: "100%", scale: 0.4, zIndex: 2, opacity: 0 },
    right7: { x: "100%", scale: 0.3, zIndex: 1, opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center flex-col justify-center h-screen">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={image}
            className="rounded-[12px] cursor-grab"
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: "30%", height: "60%", position: "absolute" }}
            onClick={() => handleImageClick(index)}    
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-5 absolute top-[85%]">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded-full transition-all cursor-pointer ${
              positionIndexes[index] === 0
                ? "bg-[#1A497F] w-6"
                : "bg-[#B5D0F0] w-4 "
            }`}
            onClick={() => handleImageClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
