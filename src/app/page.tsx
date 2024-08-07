"use client";

import Link from "next/link";
import CardItemSmall from "./CardItemSmall";
import CardSwiper from "./CardSwiper";

export default function Home() {
  return (
    <div className="py-8 overflow-hidden ">
      <CardSwiper />
      <main>
      <h2 className="mb-6 text-black subTitleMedium">전통주</h2>
      <ul className="mb-12 [&>*:last-child]:mb-0 ">
        <li className="mb-3">
          <Link href="/">
            <CardItemSmall />
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/">
            <CardItemSmall />
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/">
            <CardItemSmall />
          </Link>
        </li>
      </ul>
      <h2 className="mb-6 text-black subTitleMedium">술상</h2>
      </main>
    </div>
  );
}
