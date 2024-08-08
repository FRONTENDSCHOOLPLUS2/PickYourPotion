"use client";

import Link from "next/link";
import CardItemSmall from "./CardItemSmall";
import CardSwiper from "./CardSwiper";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <CardSwiper />
      <main>
        <h2 className="mb-6 text-black subTitleMedium mt-5">전통주</h2>
        <ul className="mb-3 [&>*:last-child]:mb-0 ">
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
