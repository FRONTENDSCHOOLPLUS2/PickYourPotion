"use client";

import Navbar from "@/components/Navbar";
import MyPageButton from "./MyPageButton";
import MyPageList from "./MyPageList";
import { useEffect, useState } from "react";

export default function MyPage() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/users/4/name`;
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "client-id": `${CLIENT_ID}`,
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setName(result.item.name);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.error("네트워크 오류 발생", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
      <main className="px-10">
        <div className="px-3">
          <h1 className="mt-[114px] text-2xl font-medium">{`${name}님`}</h1>
          <p className="text-2xl font-medium">안녕하세요👋🏻</p>
        </div>
        <MyPageButton />
        <MyPageList />
      </main>
    </>
  );
}
