import Button from "@/components/Button";
import { LinkButton } from "@/components/LinkButton";
import startPic from "../../../public/images/pic-mbti-start.png";
import Image from "next/image";
import { setCookieCloseLanding } from "./setCookie";
import Splash from "./Splash";

function LandingPage() {
  return (
    <>
      <Splash />
      <div className="px-16 min-h-screen flex justify-center items-center bg-[#FFFAED]">
        <div className="text-center">
          <h1 className="text-subTextMedium text-primary mb-4">
            당신이 원하는 술을 찾아드립니다
            <br />
            <span className="text-7xl font-bold mt-4 block">조지주</span>
          </h1>
          <Image src={startPic} width={388} height={325} className="mb-4" alt="술 추천검사 시작" />
          <LinkButton href="/landing/question" className="mb-2 w-full">
            테스트 시작하기
          </LinkButton>
          <form action={setCookieCloseLanding}>
            <Button className="w-full" color="white">
              다시 보지 않기
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
