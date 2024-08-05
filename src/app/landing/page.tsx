"use client";

import Link from "next/link";
import React, { useState } from "react";
import { question, result } from "./data";

function LandingPage() {
  const [resultValue, setResultValue] = useState("");
  const [questionNum, setQuestionNum] = useState(0);

  const handleQuestion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setResultValue(resultValue + e.currentTarget.id);
    setQuestionNum(questionNum + 1);
  };

  return (
    <div>
      {/* questionNum가 0일때만 랜더링 */}
      {questionNum === 0 && (
        <div className="start">
          <h1>
            당신이 원하는 술을 찾아드립니다
            <br />
            조지주
          </h1>
          <button type="button" onClick={() => setQuestionNum(questionNum + 1)}>
            테스트 시작하기
          </button>
          <button type="button">다시 보지 않기</button>
        </div>
      )}
      {/* questionNum가 4보다 작을 때 랜더링 */}
      {questionNum > 0 && questionNum < 4 && (
        <div className="question">
          <h2>{question[questionNum - 1].title}</h2>
          <button type="button" id="A" onClick={handleQuestion}>
            {question[questionNum - 1].A}
          </button>
          <button type="button" id="B" onClick={handleQuestion}>
            {question[questionNum - 1].B}
          </button>
          <button type="button" id="C" onClick={handleQuestion}>
            {question[questionNum - 1].C}
          </button>
          <button type="button" id="D" onClick={handleQuestion}>
            {question[questionNum - 1].D}
          </button>
        </div>
      )}
      {/* questionNum가 4일때 결과창 랜더링 */}
      {questionNum === 4 && (
        <div className="result">
          <h2>
            이런 술이 잘 맞으실것 같아요!
            <br />
            클릭하면 상품 페이지로 이동합니다
          </h2>
          <div>결과 : {result[resultValue].content}</div>
          <button type="button" onClick={() => setQuestionNum(0)}>
            다시 하기
          </button>
          <Link href="/">쇼핑몰로 이동하기</Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
