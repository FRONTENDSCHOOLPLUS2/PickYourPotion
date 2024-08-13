"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// await이 필요없는 async 함수때문에 eslint 비활성화
// eslint-disable-next-line
export default async function setCookie() {
  // 일주일간 보지 않기
  // const oneDay = 60 * 60 * 24;
  // cookies().set("isLandingClose", "true", {
  //   maxAge: oneDay * 7,
  // });
  // 다시 보지 않기
  cookies().set("isLandingClose", "true");
  redirect("/");
}
