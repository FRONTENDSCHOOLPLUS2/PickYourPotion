"use client";
import Image from "next/image";
import { ProductReplies } from "./page";
import { useState } from "react";

export default function ReplyItem({ item }: { item: ProductReplies }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const [openModal, setOpenModal] = useState<number | null>(null);

  const handleImageDetail = (index: number) => {
    setOpenModal(index);
  };
  const handleImageClose = () => {
    setOpenModal(null);
  };
  return (
    <>
      <div className="pt-5 border-gray">
        <div className="flex flex-row mt-3 justify-between w-full border-t-[0.5px] border-gray">
          <p className="mt-5 subTitleMedium">{item.user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">{item.createdAt}</p>
        </div>
        <div className="mt-3 flex items-center ">
          {item.extra?.repliesImage?.map((image, index) => (
            <div className="mr-4" key={index + 1}>
              <Image
                alt={`${item.user.name + index}`}
                width={100}
                height={100}
                src={API_SERVER + image.path}
                className="w-[100px] h-[100px] cursor-pointer rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                onClick={() => handleImageDetail(index)}
              />
              {openModal === index && (
                <div className="modal">
                  <Image
                    alt={`${item.user.name + index}`}
                    fill={true}
                    src={API_SERVER + image.path}
                    className="modal-content"
                    onClick={handleImageClose}
                  />
                  <div className="close-box">
                    <button onClick={handleImageClose} className="close">
                      x
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-5 leading-5 description text-darkGray">{item.content}</p>
      </div>
    </>
  );
}
