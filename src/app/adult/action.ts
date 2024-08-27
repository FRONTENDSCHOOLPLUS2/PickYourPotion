"use server";

import { auth } from "@/auth";
import { RequestCertificationResponseCallback } from "@/types/iamportExtends";
import { redirect, RedirectType } from "next/navigation";

const IMP_API_KEY = process.env.NEXT_PUBLIC_API_V1_REST_API_KEY;
const IMP_API_SECRET = process.env.NEXT_PUBLIC_API_V1_REST_API_SECRET;
const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// 유저의 id와 access-token을 가져오는 함수
export const getUserIdToken = async () => {
  const session = await auth();
  const userId = session?.user?.id!;
  const userAccessToken = session?.accessToken;
  return { userId, userAccessToken };
};

// 서버에 저장된 유저 정보를 가져오는 함수
export const getUserInfo = async (userId: string) => {
  const res = await fetch(`${API_SERVER}/users/${userId}`, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  return res.json();
};

// 유저 정보의 extra값에 {isAdult: true}를 업데이트하는 함수
const updateUserIsAdult = async (userId: string, extraInfo: object, accessToken: string) => {
  const res = await fetch(`${API_SERVER}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "client-id": `${CLIENT_ID}`,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      extra: { ...extraInfo, isAdult: true },
    }),
  });
  return res.json();
};

// 포트원 서버로부터 access-token을 받아오는 함수
export const getToken = async () => {
  try {
    const data = await fetch("https://api.iamport.kr/users/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imp_key: IMP_API_KEY,
        imp_secret: IMP_API_SECRET,
      }),
    });
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

// 본인인증 완료 후 실행될 콜백함수
export const certificationCallback: RequestCertificationResponseCallback = async (response) => {
  const { success, error_msg } = response;

  if (success) {
    const userImpUid = response.imp_uid;
    const tokenData = await getToken();
    const { access_token } = tokenData.response;

    // imp_uid를 바탕으로 서버에 고객 정보 조회 요청하는 함수
    const getCertifications = await fetch(`https://api.iamport.kr/certifications/${userImpUid}`, {
      method: "GET",
      headers: { Authorization: access_token },
    });
    const userInfoJsonData = await getCertifications.json();

    // 고객의 생일 정보로부터 출생년 추출
    const userBirthYear = +userInfoJsonData.response.birthday.slice(0, 4);

    // 사용자가 성인일 경우 -> 서버에 저장된 고객정보에 isAdult 추가 후 상품페이지로 이동
    if (new Date().getFullYear() - userBirthYear >= 19) {
      const { userId, userAccessToken } = await getUserIdToken();
      const userInfo = await getUserInfo(userId);
      const userExtraInfo = userInfo.item.extra;
      updateUserIsAdult(userId, userExtraInfo, userAccessToken!);
      // stateless 모달 출력
      redirect("?confirmSuccess=true", RedirectType.push);
    } else {
      // 사용자가 성인이 아닐 경우 -> 성인만 구매할 수 있는 상품입니다 모달 출력
      redirect("?confirmFailed=true", RedirectType.push);
    }
  } else {
    console.error(`본인인증 실패! : ${error_msg}`);
  }
};
