"use client";
import Image from "next/image";
import notFoundImage from "../../public/images/404image.png";
export default function globalError() {
  return (
    <div className="flex items-center justify-center">
      <Image src={notFoundImage} width={500} height={500} alt="페이지를 찾을 수 없다는 이미지" />
    </div>
  );
}
