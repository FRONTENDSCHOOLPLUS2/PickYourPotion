"use client";

import React, { useState } from "react";
import { question } from "./data";
import Button from "@/components/Button";
import { LinkButton } from "@/components/LinkButton";
import AnswerImage from "./AnswerImage";
import Result from "./Result";
import startPic from "../../../public/images/pic-mbti-start.png";
import Image from "next/image";

function LandingPage() {
  const [resultValue, setResultValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [questionNum, setQuestionNum] = useState(0);

  const handleNextBtn = () => {
    // 현재 선택돼있는 문항의 값을 결과값에 더함
    setResultValue(resultValue + selectedValue);
    setQuestionNum(questionNum + 1);
    setSelectedValue("");
  };

  return (
    <div className="px-20 h-screen flex justify-center items-center bg-[#FFFAED]">
      {/* questionNum가 0일때만 랜더링 */}
      {questionNum === 0 && (
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-subTextMedium text-primary mb-4">
            당신이 원하는 술을 찾아드립니다
            <br />
            <span className="text-7xl font-black font-bold mt-4 block">조지주</span>
          </h1>
          <Image src={startPic} width={388} height={325} className="mb-4" alt="술 추천검사 시작" />
          <Button className="mb-2" onClick={() => setQuestionNum(questionNum + 1)}>
            테스트 시작하기
          </Button>
          <Button color="white">다시 보지 않기</Button>
        </div>
      )}

      {/* questionNum가 0과 4사이일 때 랜더링 */}
      {questionNum > 0 && questionNum < 4 && (
        <div className="question relative flex flex-col justify-center text-center gap-5">
          <h2 className="color-black text-xl">
            <span className="inline-block py-1 px-4 mb-3 rounded-full bg-primary text-white">
              Q.{questionNum}
            </span>
            <br />
            {question[questionNum - 1].title}
          </h2>

          {/* 답변 A */}
          <div className="flex flex-col justify-center gap-2">
            <Button
              id="A"
              color={`${selectedValue === "A" ? "line" : "white"}`}
              className="text-black"
              onClick={(e) => setSelectedValue(e.currentTarget.id)}
            >
              {question[questionNum - 1].A}
            </Button>

            {/* 답변 B */}
            <Button
              id="B"
              color={`${selectedValue === "B" ? "line" : "white"}`}
              className="text-black"
              onClick={(e) => setSelectedValue(e.currentTarget.id)}
            >
              {question[questionNum - 1].B}
            </Button>

            {/* 답변 C */}
            <Button
              id="C"
              color={`${selectedValue === "C" ? "line" : "white"}`}
              className="text-black"
              onClick={(e) => setSelectedValue(e.currentTarget.id)}
            >
              {question[questionNum - 1].C}
            </Button>

            {/* 답변 D */}
            {question[questionNum - 1].D && (
              <Button
                id="D"
                color={`${selectedValue === "D" ? "line" : "white"}`}
                className="text-black"
                onClick={(e) => setSelectedValue(e.currentTarget.id)}
              >
                {question[questionNum - 1].D}
              </Button>
            )}
          </div>

          <AnswerImage questionNum={questionNum} selectedValue={selectedValue} />

          {/* 다음 질문 버튼 */}
          <Button
            id="next-btn"
            color={`${selectedValue ? "fill" : "disabled"}`}
            className={`${!!selectedValue ? "opacity-100" : "opacity-0"} mb-3`}
            onClick={handleNextBtn}
          >
            다음
          </Button>
        </div>
      )}

      {/* questionNum가 4일때 결과창 랜더링 */}
      {questionNum === 4 && (
        <div className="result flex flex-col justify-center text-center">
          <Result value={selectedValue} />

          <Button className="mb-2" onClick={() => setQuestionNum(0)}>
            다시 하기
          </Button>
          <LinkButton color="disabled" href="/">
            쇼핑몰로 이동하기
          </LinkButton>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
