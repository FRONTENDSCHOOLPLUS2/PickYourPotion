import Image from "next/image";

import OrderImage from "@/../public/community-dummy-small.png";

const OrderedCard: React.FC = () => {
  return (
    <div className="flex justify-between border border-gray rounded-xl px-2 py-4">
      <div className="flex">
        <Image src={OrderImage} alt="" />
        <div className="description text-gray ml-6">
          <h2 className="contentMedium text-black">로렘입숨 생막걸리</h2>
          <p>17도</p>
          <p>입생로랑 양조장</p>
        </div>
      </div>
      <div className="flex items-end">
        <p className="text-black text-[14px]">6500원/1개</p>
      </div>
    </div>
  );
};

export default OrderedCard;
