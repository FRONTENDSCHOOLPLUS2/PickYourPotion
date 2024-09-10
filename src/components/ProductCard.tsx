import Image from "next/image";
import cart from "../../public/images/icons/icon-cart.svg";
import { ProductDetail } from "@/app/detail/[id]/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchAddCart } from "@/app/detail/[id]/AddCart";
import Link from "next/link";
import { InfoToast } from "@/toast/InfoToast";
import { errorToast } from "@/toast/errorToast";

function ProductCard({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;

  const sessionCheckEvent = () => {
    if (token) {
      fetchAddCart(data._id, 1, token);
      InfoToast("장바구니에 상품을 추가했습니다.");
    } else {
      errorToast("로그인 후 이용하실 수 있습니다.");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col bg-white p-[10px] relative shadow-lg rounded-2xl">
      <Link href={`/detail/${data._id}`}>
        <div className="relative h-[324px] rounded-xl">
          <Image
            src={API_SERVER + data.mainImages[0].path}
            alt={data.name}
            className="object-cover h-full rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <Link href={`/detail/${data._id}`}>
        <div className="w-[230px] px-5 py-4 rounded-b-lg">
          <h3 className="text-black subTitleMedium text-[18px] mb-1 truncate">{data.name}</h3>
          <p className="mb-1 truncate text-gray content">{data.extra.brewery}</p>
          <p className="mb-1 text-black contentMedium">{data.price.toLocaleString()}원</p>
        </div>
      </Link>
      <button
        type="button"
        onClick={sessionCheckEvent}
        className="flex bg-primary rounded-full justify-center items-center absolute bottom-[20px] right-[10px] p-2"
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
