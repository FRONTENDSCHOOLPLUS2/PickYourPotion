"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import cart from "../../../public/images/icons/icon-cart.svg";
import search from "../../../public/images/icons/icon-search.svg";
import logo from "../../../public/images/LOGO.png";

export default function Header() {
  const { data: session } = useSession(); // 로그인 세션 정보 가져오기
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[100]">
      <div className="flex flex-row items-center justify-between py-3 w-[inherit] px-2 bg-white">
        <Link href="/">
          <Image src={logo} alt="조지주 홈으로" width={40} height={25} />
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
      <ul className="flex flex-row items-end justify-between px-4 pb-3 w-[inherit] h-12 border-b bg-white border-b-zinc-200 navTitleMedium">
        <li>
          <Link
            href="/"
            className={
              pathname === "/" ? "underline decoration-4 underline-offset-8" : "text-[gray]"
            }
          >
            오늘의 술
          </Link>
        </li>
        <li>
          <Link
            href="/market/raw"
            className={
              pathname.includes("/market")
                ? "underline decoration-4 underline-offset-8"
                : "text-[gray]"
            }
          >
            술창고
          </Link>
        </li>
        <li>
          <Link
            href="/brewery"
            className={
              pathname === "/brewery" ? "underline decoration-4 underline-offset-8" : "text-[gray]"
            }
          >
            대동술지도
          </Link>
        </li>
        <li>
          {session ? (
            <Link
              href="/mypage"
              className={
                pathname === "/mypage" ? "underline decoration-4 underline-offset-8" : "text-[gray]"
              }
            >
              마이페이지
            </Link>
          ) : (
            <Link
              href="/login"
              className={
                pathname === "/login" ? "underline decoration-4 underline-offset-8" : "text-[gray]"
              }
            >
              <span>로그인</span>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}
