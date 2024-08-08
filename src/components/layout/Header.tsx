import Image from "next/image";
import Link from "next/link";

import cart from "../../../public/images/icons/icon-cart.svg";
import search from "../../../public/images/icons/icon-search.svg";
import gnb from "../../../public/images/icons/icon-gnb.svg";
import Navbar from "../Navbar";

export default function Header() {
  return (
    <>
      <div className="flex flex-row w-full items-center justify-between  fixed top-0  px-2 py-4 z-50 bg-white">
        <Link href="/">
          <Image className="" src={gnb} alt="검색 아이콘" width={40} height={40} />
        </Link>
        <span className="ml-8 font-medium text-[20px] text-center">지금 페이지</span>
        <div className="flex flex-row">
          <Link href="/search">
            <Image className="" src={search} alt="검색 아이콘" width={40} height={40} />
          </Link>
          <Link href="/cart">
            <Image className="" src={cart} alt="장바구니 아이콘" width={40} height={30} />
          </Link>
        </div>
      </div>
      <Navbar />
    </>
  );
}
