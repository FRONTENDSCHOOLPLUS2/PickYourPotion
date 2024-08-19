import Image from "next/image";
import dummy from "../../public/community-dummy.png";
import liketrue from "../../public/images/icons/icon-like-true.svg";

export default function ReviewCardItem() {
  return (
    <div className="h-[196px] w-[182px] flex flex-col relative overflow-hidden rounded-lg group">
      <div className="absolute inset-0 transition-transform duration-300 scale-100 group-hover:scale-125">
        <Image src={dummy} alt="후기 이미지" className="object-cover w-full h-full" />
      </div>
      <div className="relative flex w-full h-full bg-custom-gradient">
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[7px] h-[40px] pt-[12px]">
          <span className="text-white description">프랑스 파리에서 만든 ....</span>
          <div className="flex flex-row items-center justify-center">
            <Image
              src={liketrue}
              alt="좋아요버튼"
              className="w-[24px] h-[24px] filter invert brightness-0 saturate-100 pb-[2px]"
            />
            <span className="text-white description">78</span>
          </div>
        </div>
      </div>
    </div>
  );
}
