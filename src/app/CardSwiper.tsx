"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function CardSwiper() {
  const [hideElement, setHideElement] = useState(false);

  return (
    <div className="flex w-screen h-[530px] bg-whiteGray items-center relative overflow-hidden">
      <div className="w-full justify-center items-center absolute">
        <Swiper
          slidesPerView={1.7}
          spaceBetween={10}
          // centeredSlides={true}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          onProgress={(swiper, progress) => {
            if (progress > 0.9) {
              setHideElement(true);
            } else {
              setHideElement(false);
            }
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.7,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 40,
            },
          }}
        >
          <SwiperSlide className="ml-[25px]">
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
      </div>
      {!hideElement && (
        <div className="flex w-[100px] h-full absolute z-10 right-0 bg-custom-white pointer-events-none"></div>
      )}
    </div>
  );
}

export default CardSwiper;
