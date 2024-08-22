import Image from "next/image";
import arrow from "../../public/images/icons/icon-drag-arrow.svg";
import arrowDown from "../../public/images/icons/icon-drag-arrow-down.svg";

export default function MovingArrow() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image
        src={arrow}
        alt="화살표"
        width={40}
        height={65}
        className="flex stretch-bounce-animation-up"
      />
      <div className="flex flex-col py-10 items-center justify-center gap-4">
        <span className=" text-white subTitleMedium">
          화면을 움직이거나 확대해 보세요 :)
        </span>
        <span className=" text-white contentMedium">양조장의 상세정보가 나와요.</span>
      </div>
      <Image
        src={arrowDown}
        alt="화살표"
        width={40}
        height={65}
        className="flex stretch-bounce-animation-down "
      />
    </div>
  );
}
