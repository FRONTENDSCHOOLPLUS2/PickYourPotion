"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Soju2bottle from "@/components/icons/Soju2bottle";
import bannerBG2 from "../../public/images/bg-banner2.jpg";
import SojuGlass from "@/components/icons/SojuGlass";

function Banner() {
  return (
    <Swiper>
      <SwiperSlide>
        <div className="relative px-[25px] py-10 bg-ivory overflow-hidden">
          <p className="mb-2 text-black">1분만에 내 취향 술찾기!</p>
          <a href="/landing" className="px-4 py-1 text-white rounded-lg bg-primary">
            검사하기
          </a>
          <div className="absolute flex items-end justify-center gap-2 -translate-y-1/2 right-4 top-1/2 scale-[0.7]">
            <SojuGlass isEmpty="A" />
            <Soju2bottle isEmpty="A" />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="relative px-[25px] py-10 overflow-hidden"
          style={{
            background: `url(${bannerBG2.src}) no-repeat right center rgba(0,0,0,0.5)`,
            backgroundSize: "cover",
            backgroundBlendMode: "darken",
          }}
        >
          <p className="mb-2 text-white shadow">전국 찾아가는 양조장 정보를 알려드려요!</p>
          <a href="/brewery" className="px-4 py-1 text-white rounded-lg shadow bg-primary">
            보러가기
          </a>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
