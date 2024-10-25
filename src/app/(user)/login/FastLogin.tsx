import { signInWithCredentials } from "@/model/action/userAction";
import iconLogo from "../../../../public/images/pic-mbti-start.png";
import Image from "next/image";

async function handleLogin(email: string | undefined, password: string | undefined) {
  await signInWithCredentials(email, password);
  window.location.href = "/";
}

export default function FastLogin() {
  const exEmail = process.env.NEXT_PUBLIC_EX_LOGIN_EMAIL;
  const exPassword = process.env.NEXT_PUBLIC_EX_LOGIN_PASSWORD;
  return (
    <>
      <button
        onClick={() => handleLogin(exEmail, exPassword)}
        className="flex py-3 px-10 justify-center items-center text-white  bg-primary rounded-[44px]"
      >
        <div className="flex flex-row items-center justify-center">
          <Image src={iconLogo} width={30} height={30} alt="체험 계정으로 로그인" className="m-3" />
          <p className="mt-1">체험용 계정으로 로그인</p>
        </div>
      </button>
    </>
  );
}
