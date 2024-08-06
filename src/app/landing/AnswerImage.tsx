import Soju from "@/components/icons/Soju";
import SojuGlass from "@/components/icons/SojuGlass";
import Spoon from "@/components/icons/Spoon";
import SugarDice from "@/components/icons/SugarDice";

import Image from "next/image";
import picRainy from "../../../public/images/pic-rainy-day.png";
import picSunny from "../../../public/images/pic-sunny-day.png";
import picFriends from "../../../public/images/pic-with-friends.png";
import picLover from "../../../public/images/pic-with-lover.png";

function QuestionImage({
  questionNum,
  selectedValue,
}: {
  questionNum: number;
  selectedValue: string;
}) {
  return (
    <>
      {/* 질문 1 이미지 */}
      {questionNum === 1 && (
        <div className="flex justify-center items-end gap-1">
          <SojuGlass isEmpty={selectedValue} />
          <Soju isEmpty={selectedValue} />
        </div>
      )}

      {/* 질문 2 이미지 */}
      {questionNum === 2 && (
        <div className="relateve flex justify-center">
          <Spoon className="mt-3" />
          <SugarDice
            className={`${
              (selectedValue === "A" || selectedValue === "B" || selectedValue === "C") &&
              "translate-y-0 opacity-100"
            } left-[43px] bottom-[25px]`}
          />
          <SugarDice
            className={`${
              (selectedValue === "B" || selectedValue === "C") && "translate-y-0 opacity-100"
            } left-[47px] bottom-[63px]`}
          />
          <SugarDice
            className={`${
              selectedValue === "C" && "translate-y-0 opacity-100"
            } left-[40px] bottom-[99px]`}
          />
        </div>
      )}

      {/* 질문 3 이미지 */}
      {questionNum === 3 && (
        <div className="relative m-auto w-[160px] h-[160px]">
          <Image
            src={picSunny}
            className={`absolute t-0 l-0 duration-700 ${selectedValue === "A" ? "opacity-100" : "opacity-0"}`}
            width={160}
            height={160}
            alt="맑은 날"
          />
          <Image
            src={picRainy}
            className={`absolute t-0 l-0 duration-700 ${selectedValue === "B" ? "opacity-100" : "opacity-0"}`}
            width={160}
            height={160}
            alt="비오는 날"
          />
          <Image
            src={picLover}
            className={`absolute t-0 l-0 duration-700 ${selectedValue === "C" ? "opacity-100" : "opacity-0"}`}
            width={160}
            height={160}
            alt="연인과 함께"
          />
          <Image
            src={picFriends}
            className={`absolute t-0 l-0 duration-700 ${selectedValue === "D" ? "opacity-100" : "opacity-0"}`}
            width={160}
            height={160}
            alt="친구와 함께"
          />
        </div>
      )}
    </>
  );
}

export default QuestionImage;
