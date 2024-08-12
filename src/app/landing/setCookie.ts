"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// await이 필요없는 async 함수때문에 eslint 비활성화
// eslint-disable-next-line
export default async function setCookie() {
  const oneDay = 60 * 60 * 24;
  cookies().set("isLandingClose", "true", {
    maxAge: oneDay * 7,
  });
  redirect("/");
}
