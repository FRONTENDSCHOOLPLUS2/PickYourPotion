import Image from "next/image";
import dummyImage from "@/../public/community-dummy.png";
import LikeIcon from "./icons/LikeIcon";

const ReviewCard: React.FC = () => {
  return (
    <div className="relative w-[180px]">
      <Image
        src={dummyImage}
        alt="더미 이미지"
        className="w-full h-[198px] rounded-lg shadow-lg"
        layout="responsive"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-2 text-white rounded-b-lg shadow-lg flex justify-between items-center">
        <p className="text-[10px]">프랑스 파리에서 만든 입...</p>
        <div className="flex flex-row items-center text-[10px]">
          <LikeIcon className={"fill-white w-8"} />
          <span>27</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
