import Soju2bottle from "@/components/icons/Soju2bottle";
import SojuGlass from "@/components/icons/SojuGlass";
import Spoon from "@/components/icons/Spoon";
import SugarDice from "@/components/icons/SugarDice";
import Sunny from "@/components/icons/Sunny";
import Rainy from "@/components/icons/Rainy";
import Heart from "@/components/icons/Heart";
import Cheers from "@/components/icons/Cheers";

function AnswerImage({
  questionNum,
  selectedValue,
}: {
  questionNum: number;
  selectedValue: string;
}) {
  return (
    <div className="py-8">
      {/* 질문 1 이미지 */}
      {questionNum === 1 && (
        <div className="flex justify-center items-end gap-1">
          <SojuGlass isEmpty={selectedValue} />
          <Soju2bottle isEmpty={selectedValue} />
        </div>
      )}

      {/* 질문 2 이미지 */}
      {questionNum === 2 && (
        <div className="relative w-full h-full flex justify-center">
          <Spoon className="mt-3" />
          <SugarDice
            className={`absolute -translate-y-6 duration-700 ease-in-out opacity-0 ${
              (selectedValue === "B" || selectedValue === "C") && "translate-y-0 opacity-100"
            } left-[16px] bottom-[24px]`}
          />
          <SugarDice
            className={`absolute -translate-y-6 duration-700 ease-in-out opacity-0 ${
              selectedValue === "C" && "translate-y-0 opacity-100"
            } left-[20px] bottom-[60px]`}
          />
        </div>
      )}

      {/* 질문 3 이미지 */}
      {questionNum === 3 && (
        <div className="relative m-auto w-[220px] h-[220px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sunny className={`${selectedValue === "A" ? "opacity-100" : "opacity-0"}`} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Rainy className={`${selectedValue === "B" ? "opacity-100" : "opacity-0"}`} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Heart
              className={`${selectedValue === "C" ? "opacity-100" : "opacity-0"} animate-custom-bounce`}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Cheers className={`${selectedValue === "D" ? "opacity-100" : "opacity-0"}`} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswerImage;
