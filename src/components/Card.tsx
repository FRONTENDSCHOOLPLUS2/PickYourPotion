import Image from "next/image";
import discount from "../../public/images/icons/discount.svg";
import dummy from "../../public/community-dummy.png";

interface CardProps {
  isDiscount: boolean;
  originalPrice: number;
}
const Card: React.FC<CardProps> = ({ isDiscount, originalPrice }) => {
  const discountedPrice = (originalPrice * 0.9).toFixed(0); // 10% 할인

  return (
    <div className="h-[284px] w-[182px] flex flex-col relative">
      {isDiscount && (
        <Image src={discount} alt="할인 태그" width={68} height={21} className="absolute" />
      )}
      <Image src={dummy} alt="술이미지" width={182} height={180} className="round mb-3" />
      <span className="contentMedium text-[black]">나루 생 막걸리 11.5%</span>
      <span className="description text-[gray]">한강주조</span>
      <span className="description text-[gray]">깊고 묵직한 단맛의 막걸리</span>

      {isDiscount ? (
        <div>
          <span className="contentMedium text-primary">{discountedPrice}원</span>
          <span className="description text-[gray] line-through ml-2">{originalPrice}원</span>
        </div>
      ) : (
        <span className="contentMedium text-[black]">{originalPrice}원</span>
      )}
    </div>
  );
};

export default Card;
