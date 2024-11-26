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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

function Banner() {
  const bannerTitleStyle = {
    fontWeight: "bold",
    letterSpacing: "1.5px",
    lineHeight: "1.3",
    marginBottom: "20px",
    color: "#000",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "50px",
    boxShadow: "0 5px 15px rgba(0, 123, 255, 0.3)",
    textTransform: "uppercase",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    marginTop: "20px",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#0056b3";
    e.target.style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#007bff";
    e.target.style.transform = "scale(1)";
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
      style={{ padding: "20px 0" }}
    >
      <SwiperSlide>
        <div className="swiper-slide" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start">
                <h3
                  className="display-4 text-uppercase"
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
              <div className="col-md-6 text-center">
                <img
                  src={imgBanner}
                  alt="banner"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-slide" style={{ backgroundColor: "#e9ecef" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start">
                <h3
                  className="display-4 text-uppercase"
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
              <div className="col-md-6 text-center">
                <img
                  src={imgBanner2}
                  alt="banner"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
