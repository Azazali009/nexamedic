"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { getImageUrl } from "../_lib/helpers";

export default function AutoSwiperSlider({
  images = [],
  speed = 8000,
  spaceBetween = 30,
  direction = "ltr",
  className = "",
}) {
  let extendedImages = images;
  if (images.length <= 4) {
    extendedImages = [...images, ...images]; // Duplicate to allow smooth loop
  }
  return (
    <Swiper
      grabCursor={false}
      allowTouchMove={false}
      simulateTouch={false}
      loop={true}
      dir={direction}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      modules={[Autoplay]}
      speed={speed}
      spaceBetween={spaceBetween}
      breakpoints={{
        320: { slidesPerView: 2 }, // Mobile
        640: { slidesPerView: 3 }, // Small tablet
        1024: { slidesPerView: 4 }, // Desktop
      }}
      className={className}
    >
      {extendedImages?.map((slide, index) => (
        <SwiperSlide key={index}>
          {/* <div className={`mx-auto h-[50px] w-[50px] overflow-hidden`}> */}
          <div className="flex max-h-[88px] items-center justify-center md:max-h-[100px] xl:max-h-[120px] 2xl:max-h-[150px]">
            <Image
              width={500}
              height={500}
              src={getImageUrl(slide?.image)}
              alt={slide?.image?.name}
              className="h-full w-[55%] object-contain"
              priority={index < 5}
            />
          </div>
          {/* </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
