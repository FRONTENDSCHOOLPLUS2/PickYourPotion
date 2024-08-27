import Image from "next/image";
import Link from "next/link";

import cart from "../../../public/images/icons/icon-cart.svg";
import search from "../../../public/images/icons/icon-search.svg";
import gnb from "../../../public/images/icons/icon-gnb.svg";

export default function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between h-14 fixed top-0 w-full px-2 z-20 bg-white shadow-sm">
        <Link href="/">
          <Image className="" src={gnb} alt="검색 아이콘" width={40} height={40} />
        </Link>
        <div className="flex flex-row">
          <Link href="/search">
            <Image
              className="w-[40px] h-[40px]"
              src={search}
              alt="검색 아이콘"
              width={40}
              height={40}
              priority
            />
          </Link>
          <Link href="/cart">
            <Image
              className="w-[40px] h-[40px]"
              src={cart}
              alt="장바구니 아이콘"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
