import Image from "next/image";
import dummy from "../../public/community-dummy.png";
import LikeIcon from "./icons/LikeIcon";

export default function ReviewCardItem() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg">
      <Image src={dummy} className="object-cover duration-300 hover:scale-125" alt="후기 이미지" />
      <div className="absolute bottom-0 left-0 h-12 flex justify-between items-end gap-2 w-full px-3 pb-2 bg-gradient-to-t from-20% from-[rgba(0,0,0,0.8)]">
        <span className="text-white truncate description">
          프랑스 파리에서 만든프랑스 파리에서 만든프랑스 파리에서 만든프랑스 파리에서 만든프랑스
          파리에서 만든
        </span>
        <div className="flex items-center justify-center">
          <button>
            <LikeIcon className="w-6 h-6 fill-white" />
          </button>
          <span className="text-white description">78</span>
        </div>
      </div>
    </div>
  );
}
