import Button from "@/components/Button";
import { LinkButton } from "@/components/LinkButton";
import startPic from "../../../public/images/pic-mbti-start.png";
import Image from "next/image";
import { setCookieCloseLanding } from "./setCookie";
import Splash from "./Splash";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "원하는 술 찾기",
  openGraph: {
    title: "원하는 술 찾기",
    description: "원하는 술 찾기 페이지",
    url: "/landing",
  },
};
function LandingPage() {
  return (
    <>
      <Splash />
      <div className="px-16 min-h-screen flex justify-center items-center bg-[#FFFAED]">
        <div className="text-center">
          <h1 className="mb-4 text-subTextMedium text-primary">
            당신이 원하는 술을 찾아드립니다
            <br />
            <span className="block mt-4 font-bold text-7xl">조지주</span>
          </h1>
          <Image src={startPic} width={388} height={325} className="mb-4" alt="술 추천검사 시작" />
          <LinkButton href="/landing/question" className="w-full mb-2">
            테스트 시작하기
          </LinkButton>
          <form action={setCookieCloseLanding}>
            <Button type="submit" className="w-full" color="white">
              다시 보지 않기
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
