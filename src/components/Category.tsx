"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import raw from "../../public/images/icons/icon-takju.png";
import refined from "../../public/images/icons/icon-chungju.png";
import fruit from "../../public/images/icons/icon-gwasilju.png";
import liquor from "../../public/images/icons/icon-wungryuju.png";

export default function Category() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const links = [
    { href: "/market/raw", label: "탁주", src: raw },
    { href: "/market/refined", label: "청주", src: refined },
    { href: "/market/fruit", label: "과실주", src: fruit },
    { href: "/market/liquor", label: "증류주", src: liquor },
  ];
  return (
    <div>
      <ul className="flex flex-row mb-7 mx-10 mt-2.5 justify-between ">
        {links.map((link, index) => (
          <li key={index} onClick={() => handleClick(index)}>
            <Link href={link.href} className="flex flex-col items-center justify-center ">
              <Image src={link.src} alt="검색 아이콘" width={40} height={40} />
              <span
                className={`cursor-pointer ${activeIndex === index ? "underline decoration-4 underline-offset-8" : "text-[gray]"} content`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
