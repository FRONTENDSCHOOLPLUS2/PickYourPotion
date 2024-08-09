"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { LinkButton } from "@/components/LinkButton";
import { question } from "../data";
import AnswerImage from "../AnswerImage";

function QuestionPage() {
  const [resultValue, setResultValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [questionNum, setQuestionNum] = useState(1);

  const handleNextBtn = () => {
    // 현재 선택돼있는 문항의 값을 결과값에 더함
    setResultValue(resultValue + selectedValue);
    setQuestionNum(questionNum + 1);
    setSelectedValue("");
  };

  return (
    <div className="question relative flex flex-col justify-center items-center px-16 min-h-screen text-center bg-[#FFFAED]">
      <h2 className="color-black text-xl mb-3">
        <span className="inline-block py-1 px-4 mb-3 rounded-full bg-primary text-white">
          Q.{"0" + questionNum}
        </span>
        <br />
        {question[questionNum - 1].title}
      </h2>

      {/* 답변 A */}
      <>
        <Button
          id="A"
          color={`${selectedValue === "A" ? "line" : "white"}`}
          className="text-black mb-2 w-full"
          onClick={(e) => setSelectedValue(e.currentTarget.id)}
        >
          {question[questionNum - 1].A}
        </Button>

        {/* 답변 B */}
        <Button
          id="B"
          color={`${selectedValue === "B" ? "line" : "white"}`}
          className="text-black mb-2 w-full"
          onClick={(e) => setSelectedValue(e.currentTarget.id)}
        >
          {question[questionNum - 1].B}
        </Button>

        {/* 답변 C */}
        <Button
          id="C"
          color={`${selectedValue === "C" ? "line" : "white"}`}
          className="text-black mb-2 w-full"
          onClick={(e) => setSelectedValue(e.currentTarget.id)}
        >
          {question[questionNum - 1].C}
        </Button>

        {/* 답변 D */}
        {question[questionNum - 1].D && (
          <Button
            id="D"
            color={`${selectedValue === "D" ? "line" : "white"}`}
            className="text-black mb-2 w-full"
            onClick={(e) => setSelectedValue(e.currentTarget.id)}
          >
            {question[questionNum - 1].D}
          </Button>
        )}
      </>

      {/* 각 답변에 따른 일러스트 이미지 */}
      <AnswerImage questionNum={questionNum} selectedValue={selectedValue} />

      {/* questionNum가 3미만일 땐 다음 버튼, 3이상이면 결과 확인 버튼 */}
      {questionNum < 3 ? (
        <Button
          id="next-btn"
          color={`${selectedValue ? "fill" : "disabled"}`}
          className={`${!!selectedValue ? "opacity-100" : "opacity-0"} w-full`}
          onClick={handleNextBtn}
        >
          다음
        </Button>
      ) : (
        <LinkButton
          href={`/landing/${resultValue + selectedValue}`}
          className={`${!!selectedValue ? "opacity-100" : "opacity-0"} w-full`}
        >
          결과 확인
        </LinkButton>
      )}
    </div>
  );
}

export default QuestionPage;
