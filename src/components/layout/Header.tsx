"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import cart from "../../../public/images/icons/icon-cart.svg";
import search from "../../../public/images/icons/icon-search.svg";
import logo from "../../../public/images/LOGO.png";
import { fetchGetCart } from "@/app/cart/cart";
import { CartPageProps } from "@/app/cart/CartPage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InfoToast } from "@/toast/InfoToast";

export default function Header() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: cartData } = useQuery<CartPageProps>({
    queryKey: ["cart"],
    queryFn: () => fetchGetCart(token),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  queryClient.invalidateQueries({ queryKey: ["cart"] });

  const handleCartPage = () => {
    if (session) {
      router.push("/cart");
    } else {
      InfoToast("로그인 후 이용하실 수 있습니다.");
      router.push("/login");
    }
  };

  return (
    <header
      className={`${(pathname.includes("landing") || pathname.includes("admin")) && "hidden"} sticky top-0 z-[100]`}
    >
      <div className="flex flex-row items-center justify-between py-3 w-[inherit] px-2 bg-white">
        <Link href="/" className="pl-2">
          <Image src={logo} alt="조지주 홈으로" width={40} height={25} />
        </Link>
        <div className="flex flex-row items-center">
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

          <div
            className={`relative w-[40px] h-[40px] ${!cartData?.item || cartData.item.length === 0 ? "" : "redCircle"}`}
          >
            <Image
              className="w-full h-full cursor-pointer"
              src={cart}
              alt="장바구니 아이콘"
              width={40}
              height={40}
              onClick={handleCartPage}
            />
          </div>
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
