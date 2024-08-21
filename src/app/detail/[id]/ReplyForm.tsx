"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Submit } from "@/components/Submit";
import InputError from "@/components/InputError";

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

export default function ReplyForm() {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const queryClient = useQueryClient();
  let { id } = useParams();
  let _id = Number(id);
  const { mutate } = useMutation({
    mutationFn(formData: FormData) {
      return addReply(_id, formData, accessToken);
    },
    onSuccess(resData) {
      if (resData) {
        queryClient.invalidateQueries({
          queryKey: ["detail", id],
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
    <>
      <form className="flex justify-between mt-6 " onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border-b-[1px] border-lightGray py-2 focus:outline-none focus:border-primary"
          placeholder="이번 술은 어떠셨나요?"
          autoComplete="off"
          {...register("content", {
            required: "내용은 필수입니다.",
            minLength: {
              value: 2,
              message: "2글자 이상 입력해주세요.",
            },
          })}
        />
        <Submit>전송</Submit>
      </form>
      <InputError target={errors.content} />
    </>
  );
}
