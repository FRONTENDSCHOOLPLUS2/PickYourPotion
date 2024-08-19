"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// await이 필요없는 async 함수때문에 eslint 비활성화
// eslint-disable-next-line
export async function setCookieCloseLanding() {
  // 다시 보지 않기
  cookies().set("isLandingClose", "true");
  redirect("/");
}

// await이 필요없는 async 함수때문에 eslint 비활성화
// eslint-disable-next-line
export async function setCookieCloseLandingOneDay() {
  // 하루동안 보지 않기
  cookies().set("isLandingClose", "true", {
    maxAge: 60 * 60 * 24,
  });
  redirect("/");
}
