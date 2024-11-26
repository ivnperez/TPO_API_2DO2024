import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiciosDestacados } from "../features/servicioSlice";
import { agregarServicio } from "../features/carritoSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/vendor.css";
import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";

function ServiciosDestacados() {
  const dispatch = useDispatch();
  const serviciosDestacados = useSelector((state) => state.servicios.destacados || []);

  // Cargar servicios destacados al cargar el componente
  useEffect(() => {
    dispatch(fetchServiciosDestacados());
  }, [dispatch]);

  const bannerTitleStyle = {
    fontWeight: "bold",
    letterSpacing: "1px",
    lineHeight: "1.2",
    marginBottom: "10px",
    color: "#000000",
  };

  const generarSeccionDestacada = () => (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {serviciosDestacados?.map((servicio, index) => (
        <SwiperSlide key={index}>
          <div
            className="product-card position-relative text-center"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                height: "auto",
                marginBottom: "15px",
              }}
            />
            <div className="card-detail">
              <h3
                className="card-title text-uppercase"
                style={{
                  ...bannerTitleStyle,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {servicio.nombre}
              </h3>
              <span
                className="item-price"
                style={{ fontWeight: "bold", color: "#000000", fontSize: "18px" }}
              >
                ${servicio.precio}
              </span>
              <div className="cart-button d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(agregarServicio({ ...servicio, cantidad: 1 }))}
                  style={{ fontWeight: "bold" }}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <section
      id="featured-services"
      className="product-store position-relative padding-large no-padding-top"
    >
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Servicios Destacados</h2>
            <div className="btn-right">
              <Link
                to="/Catalogo"
                className="btn btn-medium btn-normal text-uppercase"
                style={{ fontWeight: "bold", color: "#000000" }}
              >
                Ir a la tienda
              </Link>
            </div>
          </div>
          <div className="swiper product-swiper">{generarSeccionDestacada()}</div>
        </div>
      </div>
    </section>
  );
}

export default ServiciosDestacados;
