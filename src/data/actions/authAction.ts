"use server";
import { signIn } from "../../auth";
import { redirect } from "next/navigation";

// email/password 로그인
export async function signInWithCredentials(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      redirect: false,
    });
    console.log(result);
    // redirect("/"); //try 블럭 내부에서 호출하면 에러로인식해서 catch 됨
  } catch (err) {
    console.error(err);
  }
  redirect("/");
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/" });
}
export async function signInWithNaver() {
  await signIn("naver", { redirectTo: "/" });
}
