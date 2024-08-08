"use client";

import React, { useState } from "react";
import "../sections/CardCaroseol/CardCaroseol.css";

const initialImages = [
  { id: 1, imgSrc: "/p1.png" },
  { id: 2, imgSrc: "/p2.png" },
  { id: 3, imgSrc: "/p3.png" },
//   { id: 4, imgSrc: "/p4.png" },
//   { id: 5, imgSrc: "/p5.png" },
];

const CardImagePerson = () => {
  const [images, setImages] = useState(initialImages);

  const handleClick = (index: number) => {
    const newImages = [...images];
    const clickedImage = newImages.splice(index, 1)[0];
    newImages.unshift(clickedImage);

    if (index === 0 && newImages.length > 1) {
      const firstImage = newImages.shift();
      if (firstImage) {
        newImages.push(firstImage);
      }
    }

    setImages(newImages);
  };

  return (
    <div className="flex w-full h-full items-center relative">
      {images.map((img, index) => {
        const zIndexValue = 10 - index;

        let leftSize;
        let widthClass;
        if (index === 0) {
          leftSize = 0;
          widthClass = "img-caroseol-1";
        } else if (index === 1) {
          leftSize = 30;
          widthClass = "img-caroseol-2";
        } else if (index === 2) {
          leftSize = 60;
          widthClass = "img-caroseol-3";
        } else {
          leftSize = 60;
          widthClass = "img-caroseol-3";
        }

        return (
          <React.Fragment key={img.id}>
            <img
              src={img.imgSrc}
              alt=""
              className={`img-caroseol ${widthClass} z-[${zIndexValue}] left-[${leftSize}%]`}
              onClick={() => handleClick(index)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CardImagePerson;
