import Image from "next/image";
import notFoundImage from "../../public/images/404image.png";
import Link from "next/link";
import Button from "@/components/Button";
import { LinkButton } from "@/components/LinkButton";
export default function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-7">
      <Image src={notFoundImage} width={300} height={500} alt="페이지를 찾을 수 없다는 이미지" />
      <LinkButton
        href="/"
        color={"fill"}
        className="flex w-full items-center justify-center mt-[120px]"
      >
        다시 술담으러 가기
      </LinkButton>
    </div>
  );
}
