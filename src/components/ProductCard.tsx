import Image from "next/image";
import CartButton from "./CartButton";
import dummy from "../../public/community-dummy.png";

function ProductCard() {
  return (
    <div className="flex flex-col w-[250px] h-[458px] bg-white rounded-[10px]">
      <div className="h-[343px] rounded-[8px] overflow-hidden">
        <div className="inset-0">
          <div className="w-full h-full p-[10px]">
            <Image src={dummy} alt="복순도가 막걸리 썸네일" height={343} width={230} />
          </div>
        </div>
      </div>
      <div className="px-5 py-4 rounded-b-lg">
        <h3 className="text-black contentMedium mb-1">복순도가 손 막걸리 X 3병</h3>
        <p className="text-gray content mb-1">복순도가</p>
        <p className="text-black contentMedium mb-1">32,000원</p>
        <CartButton />
      </div>
    </div>
  );
}

export default ProductCard;
