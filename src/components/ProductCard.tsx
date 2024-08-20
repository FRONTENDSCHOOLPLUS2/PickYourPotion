import Image from "next/image";
import cart from "../../public/images/icons/icon-cart.svg";
import { ProductDetail } from "@/app/detail/[id]/page";

function ProductCard({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <div className="flex flex-col w-[260px] bg-white p-[10px] relative shadow-lg rounded-2xl">
      <div className="relative h-[324px] rounded-xl">
        <Image
          src={API_SERVER + data.mainImages[0].path}
          alt={data.name}
          className="object-cover h-full rounded-lg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="w-[230px] px-5 py-4 rounded-b-lg">
        <h3 className="text-black subTitleMedium text-[18px] mb-1 truncate">{data.name}</h3>
        <p className="mb-1 text-gray content">{data.extra.brewery}</p>
        <p className="mb-1 text-black contentMedium">{data.price.toLocaleString()}원</p>
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
