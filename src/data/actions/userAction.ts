"use server"; // 서버 액션 정의
import { ApiResWithValidation, SingleItem, User, UserForm } from "@/types";

const SERVER = process.env.PICK_YOUR_POTION_NEXT_SERVER;
type LoginForm = {
  email: string;
  password: string;
};

export async function signUp(formData: UserForm) {
  // 이미지 업로드
  if (formData.attach !== undefined && formData.attach.length > 0) {
    const body = new FormData();
    body.append("attach", formData.attach[0]);
    const fileRes = await fetch(`${SERVER}/files`, {
      method: "POST",
      body,
    });

    const resJson = await fileRes.json();

    if (!resJson.ok) {
      throw new Error("파일 업로드 실패.");
    }

    formData.profileImage = resJson.item[0].path;
  }

  // 회원 가입
  formData.type = "user";
  delete formData.attach;

  const res = await fetch(`${SERVER}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const resData: ApiResWithValidation<SingleItem<User>, UserForm> = await res.json();

  return resData;
}

export async function login(
  //   formData: FormData
  loginData: UserForm,
): Promise<ApiResWithValidation<SingleItem<User>, LoginForm>> {
  // const loginData = {
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  // }
  const res = await fetch(`${SERVER}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  return res.json();
}
