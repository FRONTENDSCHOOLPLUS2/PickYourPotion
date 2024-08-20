"use client";

import AdminInput from "./AdminInput";
import AdminSelect from "./AdminSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useRef, useState } from "react";

interface FormData {
  price: number; // 가격
  quantity: number; // 수량
  name: string; // 상품명
  content: string; // 상품 설명
  shippingFees?: number; // 배송비(생략시 0원)
  mainImages?: {
    path: string;
    name: string;
    originalname: string;
  }[]; // 상품 설명 이미지
  show?: boolean; // 상품 노출 여부
  extra?: {
    brewery: string; // 양조장
    category: string; // 주종
    degree: number; // 도수
    capacity: string; // 용량(숫자)
    capacityUnit: string; // 용량(단위)
  };
}

export default function AdminPage() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/seller/products/`;
  const token = process.env.NEXT_PUBLIC_ACCESS_TOCKEN;

  const category = [
    { value: "takjoo", name: "탁주" },
    { value: "chungjoo", name: "약·청주" },
    { value: "gwasiljoo", name: "과실주" },
    { value: "jungryujoo", name: "증류주" },
  ];

  const capacity = [
    { value: "ml", name: "ml" },
    { value: "L", name: "L" },
  ];

  const [mainImages, setMainImages] = useState<FormData["mainImages"]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const fetchFile = async () => {
    if (fileInputRef.current?.files?.length) {
      const formData = new FormData();

      // 파일 개수 제한(최대 10개)
      const files = Array.from(fileInputRef.current.files).slice(0, 10);

      files.forEach((file) => {
        formData.append("attach", file); // 각 파일을 formData에 저장
      });

      try {
        const response = await fetch(`${API_SERVER}/files/`, {
          method: "POST",
          headers: {
            "client-id": "${CLIENT_ID}",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (result.ok === 1) {
          setMainImages(result.item);
        } else {
          alert(`이미지 업로드에 실패했습니다. ${result.message}`);
        }
      } catch (error) {
        console.error("파일 업로드 중 에러 발생: ", error);
        alert("파일 업로드 중 에러가 발생했습니다.");
      }
    } else {
      alert("파일을 선택해주세요.");
    }
  };

  // 폼 제출 처리하는 함수
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    fetchFile(); // 파일 업로드

    const capacityWithUnit = `${formData.extra?.capacity}${formData.extra?.capacityUnit}`;

    const finalData = {
      ...formData,
      mainImages: mainImages, // 이미지 파일 정보 포함
      extra: {
        ...formData.extra,
        capacity: capacityWithUnit,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "client-id": `${CLIENT_ID}`,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert("상품이 정상적으로 등록되었습니다.");
      } else {
        const errorData = await response.json();
        alert(`상품 등록에 실패했습니다. ${errorData.message}`);
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit((formData) => onSubmit(formData))}
      className="flex flex-col gap-9 pt-9 px-[25px]"
    >
      {/* 상품명 */}
      <div>
        <AdminInput
          id="name"
          type="text"
          labelChildren="상품명"
          register={register("name", { required: "상품명을 입력해주세요." })}
        />
        {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
      </div>
      {/* 양조장 */}
      <div>
        <AdminInput
          id="extra.brewery"
          type="text"
          labelChildren="양조장"
          register={register("extra.brewery", { required: "양조장을 입력해주세요." })}
        />
        {errors.extra?.brewery && (
          <p className="text-red-500 mt-1">{errors.extra?.brewery.message}</p>
        )}
      </div>
      {/* 가격 */}
      <div>
        <AdminInput
          id="price"
          type="number"
          labelChildren="가격"
          register={register("price", { required: "가격을 입력해주세요." })}
        >
          {"원"}
        </AdminInput>
        {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
      </div>
      {/* 수량 */}
      <div>
        <AdminInput
          id="quantity"
          type="number"
          labelChildren="수량"
          register={register("quantity", { required: "수량을 입력해주세요." })}
        >
          {"개"}
        </AdminInput>
        {errors.quantity && <p className="text-red-500 mt-1">{errors.quantity.message}</p>}
      </div>
      {/* 주종 */}
      <div>
        <AdminSelect
          id="extra.category"
          labelChildren="주종"
          category={category}
          register={register("extra.category", { required: "주종을 선택해주세요." })}
        />
        {errors.extra?.category && (
          <p className="text-red-500 mt-1">{errors.extra.category.message}</p>
        )}
      </div>
      {/* 도수 */}
      <div>
        <AdminInput
          id="degree"
          type="number"
          labelChildren="도수"
          register={register("extra.degree", { required: "도수를 입력해주세요." })}
        >
          {"%"}
        </AdminInput>
        {errors.extra?.degree && <p className="text-red-500 mt-1">{errors.extra.degree.message}</p>}
      </div>
      {/* 용량 */}
      <div>
        <div className="flex items-end space-x-4">
          <AdminInput
            id="extra.capacity"
            type="number"
            labelChildren="용량"
            className="w-2/3"
            register={register("extra.capacity", { required: "용량을 입력해주세요." })}
          />
          <AdminSelect
            id="extra.capacityUnit"
            labelChildren=""
            category={capacity}
            className="grow"
            register={register("extra.capacityUnit", { required: "용량 단위를 선택해주세요." })}
          />
        </div>
        {errors.extra?.capacity && (
          <p className="text-red-500 mt-1">{errors.extra.capacity.message}</p>
        )}
      </div>
      {/* 상세설명 */}
      <div>
        <p className="mb-3 subTitleMedium">상세설명</p>
        <input type="file" ref={fileInputRef} multiple />
        <textarea
          {...register("content", {
            required: "상세설명을 입력해주세요.",
            minLength: {
              value: 10,
              message: "상세설명은 최소 10자 이상이어야 합니다.",
            },
          })}
          className="w-full p-5 mt-3 border h-96 border-gray round focus:outline-none focus:border-primary subTitle"
        />
        {errors.content && <p className="text-red-500 mt-1">{errors.content.message}</p>}
      </div>
      <Button type="submit" className="w-full h-16 mb-10 border">
        {"상품 등록"}
      </Button>
    </form>
  );
}
