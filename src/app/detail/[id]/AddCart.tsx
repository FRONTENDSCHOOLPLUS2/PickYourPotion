import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddCart() {
  const session = useSession();
  const router = useRouter();

  const sessionCheckEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!session) {
      //장바구니 추가 fetch
    } else {
      e.preventDefault();
      alert("장바구니 추가를 하려면 로그인해야 합니다.");
      router.push("/login");
    }
  };
  return (
    <button
      className={`contentMedium w-[124px] h-[62px] flex items-center justify-center cursor-pointe bg-whiteGray text-darkGray round`}
      onClick={sessionCheckEvent}
    >
      술바구니
      <br /> 추가
    </button>
  );
}
