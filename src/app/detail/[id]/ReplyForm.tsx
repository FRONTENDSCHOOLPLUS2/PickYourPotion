"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Submit } from "@/components/Submit";
import InputError from "@/components/InputError";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { InfoToast } from "@/toast/InfoToast";
import Image from "next/image";
import cameraIcon from "../../../../public/images/icons/icon-camera.svg";

export interface FormData {
  content: string;
}
export interface Product {
  _id: string;
}
export interface Order {
  products: Product[];
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

export async function getOrder(accessToken: string | undefined) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/orders`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default function ReplyForm() {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const orderId: string[] = [];
  const queryClient = useQueryClient();
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;
  let { id } = useParams();
  let _id = Number(id);
  const { mutate } = useMutation({
    mutationFn(formData: FormData) {
      return addReply(_id, formData, token);
    },
    onSuccess(resData) {
      if (resData) {
        queryClient.invalidateQueries({
          queryKey: ["detail", id],
        });
        reset();
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
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    mutate(formData);
    if (!token) {
      InfoToast("후기를 등록하려면 로그인해야 합니다.");
      router.push("/login");
    } else {
      InfoToast("후기를 작성했습니다.");
    }
  };

  useEffect(() => {
    const getOrderData = async () => {
      if (token) {
        const data = await getOrder(token);
        setOrderData(data);
      }
    };
    getOrderData();
  }, [session?.data]);

  orderData.map((order) => {
    order?.products?.map((product) => {
      orderId.push(product._id);
    });
  });

  const result = orderId.find((v) => v.toString() === id);

  const [preview, setPreview] = useState(null); // 이미지 미리보기 URL

  // 파일이 선택되면 미리보기 설정
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일만 사용
    if (file) {
      const imageURL = URL.createObjectURL(file); // 이미지 URL 생성
      setPreview(imageURL); // 미리보기 상태 업데이트
    }
  };
  return (
    <>
      {result && (
        <>
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="Selected" style={{ width: "300px", height: "auto" }} />
            </div>
          )}
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
            <input
              id="reviewImage"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <label htmlFor="reviewImage" className="cursor-pointer">
              <Image alt="" width={0} height={0} src={cameraIcon} />
            </label>
            <Submit>전송</Submit>
          </form>
          <InputError target={errors.content} />
        </>
      )}
    </>
  );
}
