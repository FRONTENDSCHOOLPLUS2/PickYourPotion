"use client";
import { replyStore, userStore } from "@/zustand/Store";
import { ProductReplies } from "./page";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export interface FormData {
  content: string;
}

export async function addReply(_id: number, formData: FormData, accessToken: string | undefined) {
  const data = {
    order_id: 1,
    product_id: _id,
    content: formData.content,
  };
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/replies`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "client-id": `${CLIENT_ID}`,
    },
    body: JSON.stringify(data),
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default function ReplyForm({ item }: { item: ProductReplies }) {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const { productId } = replyStore((state) => ({
    productId: state.productId,
  }));
  const queryClient = useQueryClient();
  let { type, id } = useParams();
  let _id = Number(id);
  const { mutate } = useMutation({
    mutationFn(formData: FormData) {
      return addReply(_id, formData, accessToken);
    },
    onSuccess(resData) {
      if (resData.ok) {
        queryClient.invalidateQueries({
          queryKey: [type, id, "replies"],
        });
      } else {
        console.error(resData.message);
      }
    },
    onError(err) {
      console.error(err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    mutate(formData);
  };

  return (
    <form className="border-[0.5px] border-gray" onSubmit={handleSubmit(onSubmit)}>
      <input
        className=""
        placeholder="이번 술은 어떠셨나요?"
        {...register("content", {
          required: "내용은 필수입니다.",
          minLength: {
            value: 2,
            message: "2글자 이상 입력해주세요.",
          },
        })}
      />
      {errors.content && <span>{errors.content.message}</span>} {/* 오류 메시지 출력 */}
      <button type="submit">전송</button>
    </form>
  );
}
