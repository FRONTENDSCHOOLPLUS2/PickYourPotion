import PortOne from "@portone/browser-sdk/v2";
import { ProductDetail } from "./page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export default function Buying({ data }: { data: ProductDetail }) {
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;
  console.log(token);

  const sessionCheckEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (token) {
      router.push("/pay");
    } else {
      e.preventDefault();
      alert("구매를 하려면 로그인해야 합니다.");
      router.push("/login");
    }
  };
  return (
    <button
      className={`contentMedium w-[244px] h-[62px] flex items-center justify-center cursor-pointer bg-primary text-white round`}
      onClick={sessionCheckEvent}
    >
      구매하기
    </button>
  );
}
