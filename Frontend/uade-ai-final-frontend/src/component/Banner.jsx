import React from "react";

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
  const bannerTitleStyle = {
    fontWeight: "bold",
    letterSpacing: "1px",
    lineHeight: "1.2", 
    marginBottom: "20px", 
    color: "#ffffff",
  };

  const buttonStyle = {
    backgroundColor: "#0d6efd",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textTransform: "uppercase",
    border: "none",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    marginTop: "15px",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#084298";
    e.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#0d6efd";
    e.target.style.transform = "scale(1)";
  };

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
    >
      <SwiperSlide>
        <div className="swiper-slide">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <div className="banner-content">
                  <h3
                    className="display-2 text-uppercase text-dark"
                    style={bannerTitleStyle}
                  >
                    El mejor servicio disponible 24/7.
                  </h3>
                  <Link
                    to="/Catalogo"
                    className="btn"
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Servicios Disponibles
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
                  <h3
                    className="display-2 text-uppercase text-dark"
                    style={bannerTitleStyle}
                  >
                    No pierdas el tiempo y dinero.
                  </h3>
                  <Link
                    to="/Catalogo"
                    className="btn"
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Servicios Disponibles
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
