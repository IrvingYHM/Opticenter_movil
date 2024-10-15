import React from "react";
import { IonContent } from "@ionic/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import logo from '../../assets/an.png'
import anuncio from '../../assets/anuncioOpti.jpg'

const ImageCarousel: React.FC = () => {
  return (
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={{}}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000}}
        className="mySwiper p-2"
      >
        <SwiperSlide>
          <img
            className=""
            src={anuncio}
            alt="Descriptive alt text for Image 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={logo}
            alt="Descriptive alt text for Image 2"
          />
        </SwiperSlide>
        {/* Agregar mas imagenes*/}
        <SwiperSlide>
          <img
            src={logo}
            alt="Descriptive alt text for Image 2"
          />
        </SwiperSlide>
      </Swiper>
  );
};

export default ImageCarousel;
