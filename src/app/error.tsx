"use client";
import Button from "@/components/Button";
import drunken from "../../public/images/404image.png";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-auto my-auto flex flex-col justify-center items-center">
      <Image src={drunken} alt={"만취이미지"} className="  mt-[80px] w-[300px] h-auto" />
      <p className="font-content text-darkGray mt-5 items-center justify-center ">
        존재하지 않는 페이지로 이동하셨어요.
      </p>
      <p className="font-content text-darkGray mt-2 items-center justify-center ">
        입력하신 주소가 맞는지 다시한번 확인 해주세요:)
      </p>
      <Link href={"/"}>
        <Button
          color={"fill"}
          className="flex w-[378px] h-[62px]  items-center justify-center mt-[120px]"
        >
          다시 술담으러 가기
        </Button>
      </Link>
    </div>
  );
}
