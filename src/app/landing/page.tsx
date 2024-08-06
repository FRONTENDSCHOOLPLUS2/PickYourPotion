"use client";

import React, { useState } from "react";
import { question } from "./data";
import Button from "@/components/Button";
import { LinkButton } from "@/components/LinkButton";
import Soju from "@/components/icons/Soju";
import SojuGlass from "@/components/icons/SojuGlass";
import QuestionImage from "./QuestionImage";

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
    <div className="px-20 h-screen flex justify-center items-center">
      {/* questionNum가 0일때만 랜더링 */}
      {questionNum === 0 && (
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-subTextMedium font-black mb-4">
            당신이 원하는 술을 찾아드립니다
            <br />
            <span className="text-7xl font-black font-bold mt-4 block">조지주</span>
          </h1>
          <Button className="mb-2" onClick={() => setQuestionNum(questionNum + 1)}>
            테스트 시작하기
          </Button>
          <Button color="disabled">다시 보지 않기</Button>
        </div>
      )}

      {/* questionNum가 0과 4사이일 때 랜더링 */}
      {questionNum > 0 && questionNum < 4 && (
        <div className="question flex flex-col justify-center text-center gap-2">
          <h2 className="mb-5 color-black text-subTitle">{question[questionNum - 1].title}</h2>
          <input type="hidden" value={resultValue} />
          <Button
            id="A"
            color={`${selectedValue === "A" ? "fill" : "line"}`}
            onClick={(e) => setSelectedValue(e.currentTarget.id)}
          >
            {question[questionNum - 1].A}
          </Button>
          <Button
            id="B"
            color={`${selectedValue === "B" ? "fill" : "line"}`}
            onClick={(e) => setSelectedValue(e.currentTarget.id)}
          >
            {question[questionNum - 1].B}
          </Button>
          <Button
            id="C"
            color={`${selectedValue === "C" ? "fill" : "line"}`}
            onClick={(e) => setSelectedValue(e.currentTarget.id)}
          >
            {question[questionNum - 1].C}
          </Button>
          {question[questionNum - 1].D && (
            <Button
              id="D"
              color={`${selectedValue === "D" ? "fill" : "line"}`}
              onClick={(e) => setSelectedValue(e.currentTarget.id)}
            >
              {question[questionNum - 1].D}
            </Button>
          )}
          <Button
            id="next-btn"
            color={`${selectedValue ? "fill" : "disabled"}`}
            className={`${!!selectedValue ? "opacity-100" : "opacity-0"}`}
            onClick={handleNextBtn}
          >
            다음
          </Button>

          <QuestionImage questionNum={questionNum} selectedValue={selectedValue} />
        </div>
      )}

      {/* questionNum가 4일때 결과창 랜더링 */}
      {questionNum === 4 && (
        <div className="result flex flex-col justify-center text-center">
          <h2 className="text-center mb-2">
            이런 술이 잘 맞으실것 같아요!
            <br />
            클릭하면 상품 페이지로 이동합니다
          </h2>
          <div className="w-full h-60 bg-slate-500 mb-3">이미지가 들어갈 자리</div>
          <h3 className="mb-2">술 이름</h3>
          <p className="mb-2">술 가격</p>
          <table className="mb-5">
            <tr>
              <td width="30%">도수</td>
              <td height="32px">술 도수</td>
            </tr>
            <tr>
              <td width="30%">산미</td>
              <td height="32px">
                <div className="flex flex-row gap-[1px] h-4 bg-white rounded-full overflow-hidden">
                  <span className="bg-primary w-1/4 h-full"></span>
                  <span className="bg-primary w-1/4 h-full"></span>
                  <span className="bg-primary w-1/4 h-full"></span>
                  <span className="bg-lightGray w-1/4 h-full"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td width="30%">당도</td>
              <td height="32px">
                <div className="flex flex-row gap-[1px] h-4 bg-white rounded-full overflow-hidden">
                  <span className="bg-primary w-1/4 h-full"></span>
                  <span className="bg-primary w-1/4 h-full"></span>
                  <span className="bg-primary w-1/4 h-full"></span>
                  <span className="bg-lightGray w-1/4 h-full"></span>
                </div>
              </td>
            </tr>
          </table>

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
