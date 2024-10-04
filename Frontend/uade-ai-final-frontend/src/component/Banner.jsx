import React from "react";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import imgBanner from "../images/banner-image.png";
import imgBanner2 from "../images/banner-image1.png";

import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

function Banner() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ deelay: 1000 }}
    >
      <SwiperSlide>
        <div className="swiper-slide">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <div className="banner-content">
                  <h3 className="display-2 text-uppercase text-dark pb-5">
                    Productos Geniales Para Vos.
                  </h3>
                  <Link
                    to="/Catalogo"
                    className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                  >
                    Ver Tienda
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-holder">
                  <img src={imgBanner} alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <div className="banner-content">
                  <h3 className="display-2 text-uppercase text-dark pb-5">
                    Todos Los Hacks Tecnologicos Que Te Gustaria Tener.
                  </h3>
                  <Link
                    to="/Catalogo"
                    className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                  >
                    Ver Tienda
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-holder">
                  <img src={imgBanner2} alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
