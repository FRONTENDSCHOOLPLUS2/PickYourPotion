import Image from "next/image";
import CartButton from "./CartButton";

function ProductCard() {
  return (
    <div className="min-w-[250px]">
      <div className="relative h-[345px] rounded-t-lg overflow-hidden">
        <Image
          src="/images/product/boksoondoga.jpg"
          className="object-cover"
          alt="복순도가 막걸리 썸네일"
          fill
        />
        <CartButton />
      </div>
      <div className="px-5 py-4 bg-whiteGray rounded-b-lg">
        <h3 className="text-black contentBold mb-1">복순도가 손 막걸리 X 3병</h3>
        <p className="text-gray content mb-1">복순도가</p>
        <p className="text-black contentBold mb-1">32,000원</p>
      </div>
    </div>
  );
}

export default ProductCard;
