"use client";

import Link from "next/link";
import React, { useState } from "react";

interface resultType {
  [result: string]: { productNumber: number; content: string };
}

const question = [
  { title: "평소 주량이 어떻게 되세요?", type: "alchol", A: "half", B: "1bottle", C: "2bottle" },
  { title: "원하시는 당도를 선택해주세요!", type: "sweet", A: 0, B: 50, C: 100 },
  {
    title: "술과 언제 함께 하실건가요?",
    type: "situation",
    A: "summer",
    B: "rainy",
    C: "romantic",
    D: "friend",
  },
];

const result: resultType = {
  AAA: { productNumber: 123, content: "AAA 술 추천 문구~~~~" },
  AAB: { productNumber: 123, content: "AAB 술 추천 문구~~~~" },
  AAC: { productNumber: 123, content: "AAC 술 추천 문구~~~~" },
  AAD: { productNumber: 123, content: "AAD 술 추천 문구~~~~" },
  ABA: { productNumber: 123, content: "ABA 술 추천 문구~~~~" },
  ABB: { productNumber: 123, content: "ABB 술 추천 문구~~~~" },
  ABC: { productNumber: 123, content: "ABC 술 추천 문구~~~~" },
  ABD: { productNumber: 123, content: "ABD 술 추천 문구~~~~" },
  ACA: { productNumber: 123, content: "ACA 술 추천 문구~~~~" },
  ACB: { productNumber: 123, content: "ACB 술 추천 문구~~~~" },
  ACC: { productNumber: 123, content: "ACC 술 추천 문구~~~~" },
  ACD: { productNumber: 123, content: "ACD 술 추천 문구~~~~" },
  BAA: { productNumber: 123, content: "BAA 술 추천 문구~~~~" },
  BAB: { productNumber: 123, content: "BAB 술 추천 문구~~~~" },
  BAC: { productNumber: 123, content: "BAC 술 추천 문구~~~~" },
  BAD: { productNumber: 123, content: "BAD 술 추천 문구~~~~" },
  BBA: { productNumber: 123, content: "BBA 술 추천 문구~~~~" },
  BBB: { productNumber: 123, content: "BBB 술 추천 문구~~~~" },
  BBC: { productNumber: 123, content: "BBC 술 추천 문구~~~~" },
  BBD: { productNumber: 123, content: "BBD 술 추천 문구~~~~" },
  BCA: { productNumber: 123, content: "BCA 술 추천 문구~~~~" },
  BCB: { productNumber: 123, content: "BCB 술 추천 문구~~~~" },
  BCC: { productNumber: 123, content: "BCC 술 추천 문구~~~~" },
  BCD: { productNumber: 123, content: "BCD 술 추천 문구~~~~" },
  CAA: { productNumber: 123, content: "CAA 술 추천 문구~~~~" },
  CAB: { productNumber: 123, content: "CAB 술 추천 문구~~~~" },
  CAC: { productNumber: 123, content: "CAC 술 추천 문구~~~~" },
  CAD: { productNumber: 123, content: "CAD 술 추천 문구~~~~" },
  CBA: { productNumber: 123, content: "CBA 술 추천 문구~~~~" },
  CBB: { productNumber: 123, content: "CBB 술 추천 문구~~~~" },
  CBC: { productNumber: 123, content: "CBC 술 추천 문구~~~~" },
  CBD: { productNumber: 123, content: "CBD 술 추천 문구~~~~" },
  CCA: { productNumber: 123, content: "CCA 술 추천 문구~~~~" },
  CCB: { productNumber: 123, content: "CCB 술 추천 문구~~~~" },
  CCC: { productNumber: 123, content: "CCC 술 추천 문구~~~~" },
  CCD: { productNumber: 123, content: "CCD 술 추천 문구~~~~" },
};

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

/**
 * input hidden 해놓고 버튼 선택할 때마다 value에 해당 버튼의 id값 추가
 * 버튼 4개 만들고 id에 ABCD 주기
 * 마지막에 input값 읽어와서 해당하는 컨텐츠 패치해서 불러오기
 */

export default LandingPage;
