import React from "react";
import Banner from "./Banner";
import Servicios from "./Servicios";
import ServiciosDestacados from "./ServiciosDestacados";

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