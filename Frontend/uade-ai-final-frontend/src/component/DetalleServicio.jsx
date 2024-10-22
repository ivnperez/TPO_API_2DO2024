import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServicioByID } from "../features/servicioSlice";
import { agregarServicio } from "../features/carritoSlice";

function DetalleServicio() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Servicio = useSelector((state) => state.servicios.servicioSeleccionado);

  useEffect(() => {
    if (id) {
      dispatch(fetchServicioByID(Number(id)));
    }
  }, [dispatch, id]);

  if (!Servicio) {
    return <div>Cargando servicio...</div>; // Mostrar un mensaje de carga temporal
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="row w-100">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img
            src={Servicio.imagen}
            alt={Servicio.nombre}
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-8">
          <h3>{Servicio.nombre}</h3>
          <p>Descripción: {Servicio.descripcion}</p>
          <p>Precio: {Servicio.precio}</p>
          <p>
            Descuento:
            <span style={{ color: "red" }}>
              -{Servicio.descuento}%
            </span>
          </p>
          <button
            className="btn btn-medium btn-black"
            onClick={() => dispatch(agregarServicio({ ...Servicio, cantidad: 1 }))}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleServicio;
