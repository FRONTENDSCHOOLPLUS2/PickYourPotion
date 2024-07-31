import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/router";

export default function Navbar() {
  // const router = useRouter();

  const links = [
    { href: "/main", label: "오늘의 술" },
    { href: "/market", label: "술 창고" },
    { href: "/community", label: "술상" },
    { href: "/map", label: "대동술지도" },
  ];
  return (
    <ul className="flex flex-row h-12 items-center mx-5 justify-between">
      {links.map((link.index))<li></li>}
    </ul>
  );
}

// <Link href="/main" className="cursor-point subTitleMedium text-gray text-[20px]">
//   오늘의 술
// </Link>
// <Link href="/market" className="cursor-point subTitleMedium text-gray text-[20px]">
//   술상
// </Link>
// <Link href="/community" className="cursor-point subTitleMedium text-gray text-[20px]">
//   술창고
// </Link>
// <Link href="/map" className="cursor-point subTitleMedium text-gray text-[20px]">
//   오늘의 술
// </Link>
