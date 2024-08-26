"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductDetail } from "./detail/[id]/page";
import "swiper/css";

function CardSwiper({ data }: { data: ProductDetail[] }) {
  const [hideElement, setHideElement] = useState(false);

  return (
    <div className="relative w-screen py-10 overflow-hidden bg-ivory">
      <Swiper
        id="main-is-new-swiper"
        className="overflow-visible"
        slidesPerView={1.2}
        spaceBetween={10}
        onProgress={(swiper, progress) => {
          if (progress > 0.9) {
            setHideElement(true);
          } else {
            setHideElement(false);
          }
        }}
        breakpoints={{
          420: {
            slidesPerView: 1.3,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {data &&
          data.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <ProductCard data={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
      {!hideElement && (
        <div className="absolute top-0 right-0 z-10 flex w-1/5 h-full pointer-events-none bg-custom-white"></div>
      )}
    </div>
  );
}

export default CardSwiper;
