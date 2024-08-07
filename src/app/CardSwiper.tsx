import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function CardSwiper() {
  return (
    <div className="flex w-screen h-[532px] bg-whiteGray items-center ">
      <Swiper width={250}>
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
      </Swiper>
    </div>
  );
}

export default CardSwiper;
