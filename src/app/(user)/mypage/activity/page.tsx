"use client";

import Button from "@/components/Button";
import { useState } from "react";
import MyReview from "./WrittenReview";
import ReviewToWrite from "./ReviewToWrite";

export default function ActivityPage() {
  const buttonList = ["리뷰 작성", "작성한 리뷰"];
  const [selected, setSelected] = useState<number>(0);

  const handleButtonClick = (index: number) => {
    setSelected(index);
  };

  return (
    <main>
      <div className="flex justify-center gap-2 my-10 align-middle">
        {buttonList.map((item, index) => (
          <Button
            color={index === selected ? "fill" : "disabled"}
            onClick={() => handleButtonClick(index)}
            className="w-full py-4"
            key={index}
          >
            {item}
          </Button>
        ))}
      </div>{" "}
      {selected === 0 ? <ReviewToWrite /> : <MyReview />}
    </main>
  );
}
