import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiciosDestacados } from '../features/servicioSlice';
import { agregarServicio } from '../features/carritoSlice';
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
  const serviciosDestacados = useSelector(state => state.servicios.destacados || []);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchServiciosDestacados(token));
    }
  }, [dispatch, token]);

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
          <div className="product-card position-relative" align="center" style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "20px" }}>
            <img src={servicio.imagen} alt={servicio.nombre} style={{ maxWidth: "100%", borderRadius: "8px" }} />
            <div className="cart-concern position-absolute" style={{ bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
              <div className="cart-button d-flex">
                <button
                  className="btn btn-medium btn-dark"
                  onClick={() => dispatch(agregarServicio({ ...servicio, cantidad: 1 }))}
                  style={{ fontWeight: "bold" }}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
            <div className="card-detail d-flex justify-content-between align-items-baseline pt-4" style={{ marginTop: "30px" }}>
              <h3 className="card-title text-uppercase" style={bannerTitleStyle}>
                <a href="#" style={{ color: "#000000", textDecoration: "underline" }}>{servicio.nombre}</a>
              </h3>
              <span className="item-price" style={{ fontWeight: "bold", color: "#000000" }}>{servicio.precio}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <section
      id="mobile-products"
      className="product-store position-relative padding-large no-padding-top"
    >
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">
              Servicios Destacados
            </h2>
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
          <div className="swiper product-swiper">
            {generarSeccionDestacada()}
          </div>
        </div>
      </div>
      <div className="swiper-pagination position-absolute text-center"></div>
    </section>
  );
}

export default ServiciosDestacados;

