import Image from "next/image";
import Link from "next/link";

import cart from "../../../public/images/icons/icon-cart.svg";
import search from "../../../public/images/icons/icon-search.svg";
import gnb from "../../../public/images/icons/icon-gnb.svg";

export default function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between h-14 fixed top-0 w-screen px-2 z-50 bg-white shadow-sm">
        <Link href="/">
          <Image className="" src={gnb} alt="검색 아이콘" width={40} height={40} />
        </Link>
        <div className="flex flex-row">
          <Link href="/search">
            <Image className="" src={search} alt="검색 아이콘" width={40} height={40} />
          </Link>
          <Link href="/cart">
            <Image className="" src={cart} alt="장바구니 아이콘" width={40} height={30} />
          </Link>
        </div>
      </div>
    </>
  );
}
