import React from "react";
import Banner from "./Banner";
import Servicios from "./Servicios";
import ProductosDestacados from "./ServiciosDestacados";

const Home = () => {
  return (
    <>
      <Banner />
      <Servicios />
      <ServiciosDestacados />
    </>
  );
};

export default Home;