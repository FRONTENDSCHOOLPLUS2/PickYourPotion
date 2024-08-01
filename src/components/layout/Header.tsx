"use client";
import Image from "next/image";
import Link from "next/link";

import cart from "../../../public/images/icons/icon-cart.svg";
import search from "../../../public/images/icons/icon-search.svg";
import gnb from "../../../public/images/icons/icon-gnb.svg";

export default function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between h-12 mx-2">
        <Image className="" src={gnb} alt="검색 아이콘" width={30} height={30} />
        <span className="ml-8 font-medium text-[20px] text-center">지금 페이지</span>
        <div className="flex flex-row">
          <Link href="/search">
            <Image className="" src={search} alt="검색 아이콘" width={30} height={30} />
          </Link>
          <Link href="/cart">
            <Image className="" src={cart} alt="장바구니 아이콘" width={30} height={30} />
          </Link>
        </div>
      </div>
    </>
  );
}
