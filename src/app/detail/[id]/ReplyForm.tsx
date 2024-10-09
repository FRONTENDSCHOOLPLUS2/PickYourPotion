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

export async function addReply(
  _id: number,
  formData: FormData,
  accessToken: string | undefined,
  reviewImage: File[],
) {
  const data = {
    order_id: 1,
    product_id: _id,
    content: formData.content,
    extra: {
      repliesImage: reviewImage,
    },
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
  const [preview, setPreview] = useState<string[]>([]);
  const [reviewImage, setReviewImage] = useState<File[]>([]);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const orderId: string[] = [];
  const queryClient = useQueryClient();
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;
  let { id } = useParams();
  let _id = Number(id);
  const { mutate } = useMutation({
    mutationFn(formData: FormData) {
      return addReply(_id, formData, token, fileImages);
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
      setPreview([]);
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

  const fetchFile = async (file: File, accessToken: string | undefined) => {
    const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const formData = new FormData();
    formData.append("attach", file);

    try {
      const response = await fetch(`${API_SERVER}/files`, {
        method: "POST",
        headers: {
          "client-id": `${CLIENT_ID}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const resJson = await response.json();
      setFileImages((prev) => (prev ? [...prev, ...resJson.item] : resJson.item));
      if (!resJson.ok) {
        throw new Error("error");
      }
    } catch (error) {
      console.error("파일 업로드 중 에러 발생: ", error);
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      if (fileArray.length > 3) {
        InfoToast("최대 3장의 이미지만 선택할 수 있습니다.");
        return;
      }

      setReviewImage(fileArray);
      const newPreviews = fileArray.slice(0, 3).map((file) => URL.createObjectURL(file));
      setPreview(newPreviews);

      try {
        await Promise.all(fileArray.map((file) => fetchFile(file, token)));
      } catch (error) {
        console.error("파일 업로드 중 에러 발생: ", error);
      }
    }
  };

  return (
    <>
      {result && (
        <>
          {preview.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {preview.map((preview, index) => (
                <div key={index} className="mr-6">
                  <Image
                    src={preview}
                    alt={`Selected ${index + 1}`}
                    className="w-40 h-40 object-scale-down"
                    width={0}
                    height={0}
                  />
                </div>
              ))}
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
