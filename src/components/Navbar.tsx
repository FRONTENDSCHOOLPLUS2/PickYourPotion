"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [selectedLink, setSelectedLink] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname;
    setSelectedLink(path);
  }, []);

  return (
    <div>
      <ul className="flex flex-row items-end  bg-white mb-1 justify-between px-4 pb-2 w-full h-[66px] fixed z-50 subTitleMedium">
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
        <li className={selectedLink === "/community" ? "active" : ""}>
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
        </li>
      </ul>
    </div>
  );
}
