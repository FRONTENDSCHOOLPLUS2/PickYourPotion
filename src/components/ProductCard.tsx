import Image from "next/image";
import cart from "../../public/images/icons/icon-cart.svg";
import dummy from "../../public/community-dummy.png";

function ProductCard() {
  return (
    <div className="flex flex-col w-[230px] bg-white round relative shadow-lg">
      <div className="h-[324px] p-[10px] rounded-[10px]">
        <Image
          src={dummy}
          alt="추천 술 이미지"
          className="w-[230px] h-full object-cover rounded-[8px]"
        />
      </div>
      <div className="w-[230px] px-5 py-4 rounded-b-lg">
        <h3 className="text-black subTitleMedium text-[18px] mb-1">복순도가 손 막걸리</h3>
        <p className="text-gray content mb-1">복순도가</p>
        <p className="text-black contentMedium mb-1">32,000원</p>
      </div>
      <button
        type="button"
        className="flex w-[46px] h-[46px] bg-primary rounded-full justify-center items-center absolute bottom-[20px] right-[10px] "
      >
        <Image
          src={cart}
          alt="장바구니 아이콘"
          width={32}
          height={32}
          className="filter invert brightness-0 saturate-100"
        />
      </button>
    </div>
  );
}

export default ProductCard;
