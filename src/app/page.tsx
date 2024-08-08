"use client";

import ImageSlider from "@/components/sections/CardFrameMotion/ImageSlider";
import Image from "next/image";
import { ListInfoCard } from "../../contants";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const steps = ListInfoCard.length;
  const array = Array.from({ length: steps }, (_, i) => i);

  const [positionIndexes, setPositionIndexes] = useState<number[]>(array);

  const positions = ["left"];
  const imageVariants: any = {
    left: { x: "-50%", scale: 1, zIndex: ListInfoCard.length },
  };

  for (let i = 1; i < ListInfoCard.length; i++) {
    const position = `right${i}`;
    positions.push(position);
    imageVariants[position] = {
      x: `${(i < 3 ? i - 1 : 0) * 40}%`,
      scale: 1 - i * 0.1,
      zIndex: ListInfoCard.length - i,
      opacity: i > 2 ? 0 : 1,
    };
  }

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) =>
          (prevIndex + (ListInfoCard.length - 1)) % ListInfoCard.length
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
          updatedIndexes[i] =
            (updatedIndexes[i] + (8 - clickedPosition)) % ListInfoCard.length;
        } else if (updatedIndexes[i] >= clickedPosition) {
          updatedIndexes[i] =
            (updatedIndexes[i] - clickedPosition) % ListInfoCard.length;
        }
      }
      updatedIndexes[clickedIndex] = 0;

      setPositionIndexes(updatedIndexes);
    }
  };

  return (
    <main>
      <div className="container py-8 flex flex-col gap-10">
        <p className="text-center text-[40px] text-[#1A497F] font-[600]">
          GƯƠNG MẶT 5 SAO
        </p>

        <div className="flex items-center gap-6 h-[500px]">
          <div className="w-[23.4%] flex flex-col items-start gap-4">
            <p className="text-[20px] text-[#09315E] font-[300]">
              Nguyễn Minh Hằng
            </p>
            <p className="text-[20px] text-[#09315E] font-[600]">IELTS 9.0</p>
            <p className="text-[16px] text-[#09315E] font-[300]">
              Khóa học:{" "}
              <span className="text-[16px] text-[#09315E] font-[600]">
                IELTS PRO ONLINE
              </span>
            </p>

            <div className="flex flex-col items-start gap-4">
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#09315E] mx-3 mt-2"></div>
                <p className="text-[16px] text-justify text-[#09315E] font-[300] w-[90%]">
                  Học sinh chương trình tiếng Anh bổ trợ theo chuẩn đầu ra IELTS
                  do Atlantic Five-Star English giảng dạy tại trường THPT Tây Hồ
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#09315E] mx-3 mt-2"></div>
                <p className="text-[16px] text-justify text-[#09315E] font-[300] w-[90%]">
                  Học sinh THPT Chuyên Ngoại ngữ, ĐH Quốc gia HN
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#09315E] mx-3 mt-2"></div>
                <p className="text-[16px] text-justify text-[#09315E] font-[300] w-[90%]">
                  Quý quân Đường lên đỉnh Olympia năm thứ 21
                </p>
              </div>
            </div>
          </div>

          <div className="w-[76.6%] flex flex-col gap-6">
            <div className="flex items-center flex-col justify-center ">
              {ListInfoCard.map((item, index) => (
                <motion.img
                  key={index + item.id}
                  src={item.img}
                  alt={item.name}
                  className="rounded-[12px] cursor-grab"
                  initial="left"
                  animate={positions[positionIndexes[index]]}
                  variants={imageVariants}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "380px",
                    height: "380px",
                    position: "absolute",
                  }}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-5">
              {ListInfoCard.map((_, index) => (
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
        </div>
      </div>
    </main>
  );
}
