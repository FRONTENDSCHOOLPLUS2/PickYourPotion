"use client";

import { twMerge } from "tailwind-merge";
import CartIcon from "./icons/CartIcon";
import { useSession } from "next-auth/react";
import { fetchAddCart } from "@/app/detail/[id]/AddCart";
import { InfoToast } from "@/toast/InfoToast";
import { errorToast } from "@/toast/errorToast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CartButton({ _id, className }: { _id: number; className?: string }) {
  const session = useSession();
  const token = session.data?.accessToken;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn() {
      if (token) {
        return fetchAddCart(_id, 1, token);
      } else {
        throw new Error("Access token is undefined");
      }
    },
    onSuccess(resData) {
      if (resData) {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      } else {
        console.error(resData.message);
      }
    },
    onError(err) {
      console.error(err);
    },
  });
  const sessionCheckEvent = () => {
    if (token) {
      mutate();
      InfoToast("장바구니에 상품을 추가했습니다.");
    } else {
      errorToast("로그인 후 이용하실 수 있습니다.");
      router.push("/login");
    }
  };

  return (
    <button
      type="button"
      className={twMerge(
        "relative bottom-3 flex justify-center items-center right-3 w-12 h-12 bg-primary rounded-full overflow-hidden cursor-pointer",
        className,
      )}
      onClick={sessionCheckEvent}
    >
      <CartIcon className="fill-white" />
      <span className="a11y-hidden">술바구니에 담기</span>
    </button>
  );
}

export default CartButton;
