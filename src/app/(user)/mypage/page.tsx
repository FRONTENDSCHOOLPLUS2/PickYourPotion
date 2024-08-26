"use client";

import { useSession } from "next-auth/react";
import MyPageButton from "./MyPageButton";
import MyPageList from "./MyPageList";
import { useEffect, useState } from "react";

export default function MyPage() {
  const { data: session, status } = useSession();

  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/users/${session?.user?.id}/name`;
  const token = session?.accessToken;

  const [name, setName] = useState<string>("");

  useEffect(() => {
    // 세션이 로드되었을 때만 fetchUserName 함수 호출
    if (status === "authenticated") {
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
    }
  }, [status, session]);

  return (
    <main className="px-[25px]">
      <div className="px-3">
        <h1 className="mt-[114px] text-2xl font-medium">{`${name}님`}</h1>
        <p className="text-2xl font-medium">안녕하세요👋🏻</p>
      </div>
      <MyPageButton />
      <MyPageList />
    </main>
  );
}
