"use client";

import "./slide.css";

import React, { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import AdminInput from "../AdminInput";
import AdminSelect from "../AdminSelect";
import { InfoToast } from "@/toast/InfoToast";
import { errorToast } from "@/toast/errorToast";
import { useRouter } from "next/navigation";

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
  }[]; // 상품 메인 이미지
  show?: boolean; // 상품 노출 여부
  extra?: Extra;
}

interface Extra {
  inherence: "potion"; // 고정 값 "potion"
  taste: {
    acidity: string; // 산미 (예: "2")
    sweet: string; // 당도 (예: "4")
    bitter: string; // 씁쓸함 (예: "3")
    body: string; // 바디감 (예: "4")
    alcohol: string; // 도수 (예: "18")
    sparkle: string; // 탄산 (예: "0")
    tannin: string; // 타닌 (예: "0")
  };
  detailImage?: {
    path: string;
    name: string;
    originalname: string;
  }[]; // 상품 상세 이미지
  capacity: string; // 용량(숫자)
  capacityUnit: string; // 용량(단위)
  category: string[];
  brewery: string; // 양조장 (예: "면천두견주보존회")
  useByDate: string; // 소비기한 (예: "소비 기한 없음")
  volume: string; // 용량 (예: "700")
}

export default function ProductRegister() {
  const { data: session } = useSession();
  const router = useRouter();

  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/seller/products/`;
  const token = session?.accessToken;

  const category = [
    { value: "PC01", name: "탁주 (makgeolli)" },
    { value: "PC02", name: "약·청주 (clearWine)" },
    { value: "PC03", name: "증류주 (spirits)" },
    { value: "PC04", name: "리큐르 (liquor)" },
    { value: "PC05", name: "기타 (etc)" },
  ];

  const capacity = [
    { value: "ml", name: "ml" },
    { value: "L", name: "L" },
  ];

  const [mainImages, setMainImages] = useState<FormData["mainImages"]>([]);
  const [detailImage, setDetailImage] = useState<Extra["detailImage"]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const detailFileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const fetchFile = async (file: File, type: "main" | "detail") => {
    const formData = new FormData();
    formData.append("attach", file);

    try {
      const response = await fetch(`${API_SERVER}/files`, {
        method: "POST",
        headers: {
          "client-id": `${CLIENT_ID}`,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.ok === 1) {
        if (type === "main") {
          setMainImages(result.item[0]); // 경로와 이름을 받아서 메인 이미지로 설정
        } else {
          setDetailImage((prev) => (prev ? [...prev, ...result.item] : result.item));
        }
      } else {
        alert(`이미지 업로드에 실패했습니다. ${result.message}`);
      }
    } catch (error) {
      console.error("파일 업로드 중 에러 발생: ", error);
      alert("파일 업로드 중 에러가 발생했습니다.");
    }
  };

  const handleMainImageChange = async () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      await fetchFile(file, "main");
    } else {
      InfoToast("메인 이미지를 선택해주세요.");
    }
  };

  const handleDetailImagesChange = async () => {
    if (detailFileInputRef.current?.files?.length) {
      const files = Array.from(detailFileInputRef.current.files);
      // 파일 개수 제한(최대 10개)
      const limitedFiles = files.slice(0, 10);
      for (const file of limitedFiles) {
        await fetchFile(file, "detail");
      }
    } else {
      InfoToast("상세 이미지를 선택해주세요.");
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    formData.price = Number(formData.price);
    formData.quantity = Number(formData.quantity);

    handleMainImageChange(); // 메인 이미지 업로드
    handleDetailImagesChange(); // 디테일 이미지 업로드

    const capacityWithUnit = `${formData.extra?.capacity}${formData.extra?.capacityUnit}`;

    const finalData = {
      ...formData,
      mainImages: mainImages, // 메인 이미지 정보 포함
      extra: {
        inherence: "potion", // 고정 값 "potion"
        ...formData.extra,
        detailImage: detailImage, // 디테일 이미지 정보 포함
        capacity: capacityWithUnit,
        category: formData.extra?.category ? [formData.extra.category] : [],
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

      const result = await response.json();

      if (response.ok) {
        InfoToast("상품이 정상적으로 등록되었습니다.");
        router.push("/admin/products");
      } else {
        const errorData = await response.json();
        InfoToast(`상품 등록에 실패했습니다. ${errorData.message}`);
      }
    } catch (error) {
      errorToast("네트워크 오류가 발생했습니다.");
    }
  };

  const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // 슬라이더의 현재 값에 따라 바 색상을 설정
    e.target.style.setProperty("--value", `${(value / 5) * 100}%`); // 0~5 범위로 설정
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
          id="alcohol"
          type="number"
          labelChildren="도수"
          register={register("extra.taste.alcohol", { required: "도수를 입력해주세요." })}
        >
          {"%"}
        </AdminInput>
        {errors.extra?.taste?.alcohol && (
          <p className="text-red-500 mt-1">{errors.extra.taste.alcohol.message}</p>
        )}
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
      {/* 당도 */}
      <div>
        <label htmlFor="extra.taste.sweet" className="block text-sm font-medium">
          당도
        </label>
        <input
          type="range"
          id="extra.taste.sweet"
          min="0"
          max="5"
          step="1"
          defaultValue="0"
          className="w-full"
          {...register("extra.taste.sweet", {
            required: "당도를 입력해주세요.",
            onChange: onSliderChange,
          })}
        />
        <p className="text-gray-500">선택한 당도: {watch("extra.taste.sweet")}</p>
        {errors.extra?.taste?.sweet && (
          <p className="text-red-500 mt-1">{errors.extra.taste.sweet.message}</p>
        )}
      </div>

      {/* 산미 */}
      <div>
        <label htmlFor="extra.taste.acidity" className="block text-sm font-medium">
          산미
        </label>
        <input
          type="range"
          id="extra.taste.acidity"
          min="0"
          max="5"
          step="1"
          defaultValue="0"
          className="w-full"
          {...register("extra.taste.acidity", {
            required: "산미를 입력해주세요.",
            onChange: onSliderChange,
          })}
        />
        <p className="text-gray-500">선택한 산미: {watch("extra.taste.acidity")}</p>
        {errors.extra?.taste?.acidity && (
          <p className="text-red-500 mt-1">{errors.extra.taste.acidity.message}</p>
        )}
      </div>

      {/* 바디감 */}
      <div>
        <label htmlFor="extra.taste.body" className="block text-sm font-medium">
          바디감
        </label>
        <input
          type="range"
          id="extra.taste.body"
          min="0"
          max="5"
          step="1"
          defaultValue="0"
          className="w-full"
          {...register("extra.taste.body", {
            required: "바디감을 입력해주세요.",
            onChange: onSliderChange,
          })}
        />
        <p className="text-gray-500">선택한 바디감: {watch("extra.taste.body")}</p>
        {errors.extra?.taste?.body && (
          <p className="text-red-500 mt-1">{errors.extra.taste.body.message}</p>
        )}
      </div>

      {/* 씁쓸함 */}
      <div>
        <label htmlFor="extra.taste.bitter" className="block text-sm font-medium">
          씁쓸함
        </label>
        <input
          type="range"
          id="extra.taste.bitter"
          min="0"
          max="5"
          step="1"
          defaultValue="0"
          className="w-full"
          {...register("extra.taste.bitter", {
            required: "씁쓸함을 입력해주세요.",
            onChange: onSliderChange,
          })}
        />
        <p className="text-gray-500">선택한 씁쓸함: {watch("extra.taste.bitter")}</p>
        {errors.extra?.taste?.bitter && (
          <p className="text-red-500 mt-1">{errors.extra.taste.bitter.message}</p>
        )}
      </div>

      {/* 탄산 */}
      <div>
        <label htmlFor="extra.taste.sparkle" className="block text-sm font-medium">
          탄산
        </label>
        <input
          type="range"
          id="extra.taste.sparkle"
          min="0"
          max="5"
          step="1"
          defaultValue="0"
          className="w-full"
          {...register("extra.taste.sparkle", {
            required: "탄산을 입력해주세요.",
            onChange: onSliderChange,
          })}
        />
        <p className="text-gray-500">선택한 탄산: {watch("extra.taste.sparkle")}</p>
        {errors.extra?.taste?.sparkle && (
          <p className="text-red-500 mt-1">{errors.extra.taste.sparkle.message}</p>
        )}
      </div>

      {/* 소비기한 */}
      <div>
        <AdminInput
          id="extra.useByDate"
          type="text"
          labelChildren="소비기한"
          register={register("extra.useByDate", { required: "소비기한을 입력해주세요." })}
        />
        {errors.extra?.useByDate && (
          <p className="text-red-500 mt-1">{errors.extra?.useByDate.message}</p>
        )}
      </div>
      {/* 메인 이미지 업로드 */}
      <div>
        <p className="mb-3 subTitleMedium">메인 이미지</p>
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleMainImageChange} />
      </div>
      {/* 디테일 이미지 업로드 */}
      <div>
        <p className="mb-3 subTitleMedium">디테일 이미지</p>
        <input
          type="file"
          ref={detailFileInputRef}
          accept="image/*"
          multiple
          onChange={handleDetailImagesChange}
        />
      </div>
      {/* 상세설명 */}
      <div>
        <p className="mb-3 subTitleMedium">상세설명</p>
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
      <Button type="submit" className="w-full h-16 mb-10 border subTitleLight">
        {"상품 등록"}
      </Button>
    </form>
  );
}
