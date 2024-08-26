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
    { href: "/market/raw", label: "탁주", src: raw, alt: "탁주아이콘" },
    { href: "/market/refined", label: "청주", src: refined, alt: "청주아이콘" },
    { href: "/market/fruit", label: "과실주", src: fruit, alt: "과실주아이콘" },
    { href: "/market/liquor", label: "증류주", src: liquor, alt: "증류주아이콘" },
  ];
  return (
    <div className="flex mt-[65px] bg-whiteGray w-full h-[94px] justify-center items-center mb-3">
      <ul className="flex flex-row gap-2.5 px-[12px]">
        {links.map((link, index) => (
          <li key={index} onClick={() => handleClick(index)}>
            <Link
              href={link.href}
              className={`cursor-pointer ${activeIndex === index ? "bg-primary" : "bg-white"} flex flex-raw items-center justify-center w-[84px] h-[54px] round`}
            >
              <Image src={link.src} alt={link.alt} width={40} height={40} />
              <span
                className={`cursor-pointer ${activeIndex === index ? "text-white" : "text-[gray]"} text-sm mt-1`}
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
