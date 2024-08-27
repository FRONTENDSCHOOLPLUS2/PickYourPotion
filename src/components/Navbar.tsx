"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [selectedLink, setSelectedLink] = useState<string>("");
  const { data: session } = useSession(); // 로그인 세션 정보 가져오기

  useEffect(() => {
    const path = window.location.pathname;
    setSelectedLink(path);
  }, []);

  return (
    <ul className="flex flex-row items-end fixed z-50 mb-1 justify-between px-4 pb-3 w-[inherit] h-[66px] border-b bg-white border-b-zinc-200 navTitleMedium">
      <li className={selectedLink === "/" ? "active" : ""}>
        <Link
          href="/"
          className={
            selectedLink === "/" ? "underline decoration-4 underline-offset-8" : "text-[gray]"
          }
          onClick={() => setSelectedLink("/")}
        >
          <span className="">오늘의 술</span>
        </Link>
      </li>
      <li className={selectedLink === "/market" ? "active" : ""}>
        <Link
          href="/market/raw"
          className={
            selectedLink === "/market/raw"
              ? "underline decoration-4 underline-offset-8"
              : "text-[gray]"
          }
          onClick={() => setSelectedLink("/market/raw")}
        >
          <span className="">술창고</span>
        </Link>
      </li>
      <li className={selectedLink === "/brewery" ? "active" : ""}>
        <Link
          href="/brewery"
          className={
            selectedLink === "/brewery"
              ? "underline decoration-4 underline-offset-8"
              : "text-[gray]"
          }
          onClick={() => setSelectedLink("/brewery")}
        >
          <span className="">대동술지도</span>
        </Link>
      </li>
      <li className={selectedLink === "/mypage" ? "active" : ""}>
        {session ? (
          <Link
            href="/mypage"
            className={
              selectedLink === "/mypage"
                ? "underline decoration-4 underline-offset-8"
                : "text-[gray]"
            }
            onClick={() => setSelectedLink("/mypage")}
          >
            <span className="">마이페이지</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className={
              selectedLink === "/login"
                ? "underline decoration-4 underline-offset-8"
                : "text-[gray]"
            }
            onClick={() => setSelectedLink("/login")}
          >
            <span>로그인</span>
          </Link>
        )}
      </li>
    </ul>
  );
}
