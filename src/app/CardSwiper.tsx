"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function CardSwiper() {
  const [hideElement, setHideElement] = useState(false);

  return (
    <div className="pt-20">
      <div className="relative w-screen py-10 overflow-hidden bg-ivory">
        <Swiper
          id="main-is-new-swiper"
          slidesPerView={1.3}
          spaceBetween={10}
          onProgress={(swiper, progress) => {
            if (progress > 0.9) {
              setHideElement(true);
            } else {
              setHideElement(false);
            }
          }}
          breakpoints={{
            360: {
              slidesPerView: 1.5,
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
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
        {!hideElement && (
          <div className="absolute top-0 right-0 z-10 flex w-1/5 h-full pointer-events-none bg-custom-white"></div>
        )}
      </div>
    </div>
  );
}

export default CardSwiper;
