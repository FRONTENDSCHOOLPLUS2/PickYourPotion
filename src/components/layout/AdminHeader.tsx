"use client";

import { useState } from "react";
import WriteReviewIcon from "../icons/WriteReviewIcon";
import AccountIcon from "../icons/AccountIcon";
import ListIcon from "../icons/ListIcon";
import AddProductIcon from "../icons/AddProductIcon";
import Link from "next/link";

function AdminHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      {/* 태블릿 이상 nav */}
      <nav className="hidden md:block fixed top-0 left-0 max-w-52 h-screen bg-slate-700 pl-5 pr-7 py-4 leading-[0]">
        <ul className="text-whiteGray">
          <li>
            <Link href="/admin/register" className="flex items-center my-5">
              <AddProductIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">상품 등록</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center my-5">
              <WriteReviewIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">등록 상품 관리</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center my-5">
              <ListIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">주문 관리</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center my-5">
              <AccountIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">사용자 관리</span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* 모바일 nav */}
      <div className="md:hidden bg-slate-700 px-5 py-4 leading-[0]">
        <button className="cursor" onClick={() => setShowMenu(!showMenu)}>
          <span className="block w-7 h-1 bg-white rounded mb-2"></span>
          <span className="block w-7 h-1 bg-white rounded mb-2"></span>
          <span className="block w-7 h-1 bg-white rounded"></span>
        </button>
      </div>
      <nav
        className={`md:hidden w-1/2 sm:w-1/3 h-screen fixed z-50 top-0 left-0 p-5 ${showMenu ? "" : "-translate-x-full"} duration-500 bg-slate-700`}
      >
        <button
          className="cursor absolute top-5 right-5 p-1"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className="block w-7 h-1 bg-white rounded mb-4 rotate-45 translate-x-1 origin-left"></span>
          <span className="block w-7 h-1 bg-white rounded -rotate-45 translate-x-1 origin-left"></span>
        </button>
        <ul className="text-whiteGray">
          <li>
            <Link href="/admin/register" className="flex items-center my-5">
              <AddProductIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">상품 등록</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center my-5">
              <WriteReviewIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">등록 상품 관리</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center my-5">
              <ListIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">주문 관리</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center my-5">
              <AccountIcon className="fill-whiteGray" />
              <span className="inline-block pt-1">사용자 관리</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AdminHeader;
