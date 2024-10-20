import React, { useEffect, useState } from "react";
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
  
  useEffect(() => {
    dispatch(fetchServiciosDestacados());
  }, [dispatch]);

  const generarSeccionDestacada = () => (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
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
          <div className="product-card position-relative" align="center">
            <img src={servicio.imagen} alt={servicio.nombre} />
            <div className="cart-concern position-absolute">
              <div className="cart-button d-flex">
              <button className="btn btn-medium btn-black" onClick={() => dispatch(agregarServicio({ ...servicio, cantidad: 1 }))}>Agregar al carrito</button>
              </div>
            </div>
            <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
              <h3 className="card-title text-uppercase">
                <a href="#">{servicio.nombre}</a>
              </h3>
              <span className="item-price text-primary">{servicio.precio}</span>
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
