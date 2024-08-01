"use client"
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const links = [
    { href: "/main", label: "오늘의 술" },
    { href: "/market", label: "술상" },
    { href: "/community", label: "술창고" },
    { href: "/map", label: "지도" },
  ];
  return (
    <ul className="flex flex-row h-12 items-center mx-5 justify-between">
      {links.map((link, index) => (
        <li key={index} onClick={() => handleClick(index)} className="list-none">
          <Link href={link.href}>
            <span
              className={`cursor-pointer ${activeIndex === index ? "underline decoration-4 underline-offset-8" : "text-[gray]"} subTitleMedium`}
            >
              {link.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
