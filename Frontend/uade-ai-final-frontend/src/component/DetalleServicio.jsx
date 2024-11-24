import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServicioByID } from "../features/servicioSlice";
import { agregarServicio } from "../features/carritoSlice";
import Modal from "./Modal";

function DetalleServicio() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Servicio = useSelector((state) => state.servicios.servicioSeleccionado);
  const token = useSelector((state) => state.auth.token);
  const usuarioLogueado = !!token;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchServicioByID(Number(id)));
    }
  }, [dispatch, id]);

  if (!Servicio) {
    return <div className="text-center mt-5">Cargando servicio...</div>;
  }

  const handleAgregarAlCarrito = () => {
    if (!usuarioLogueado) {
      setShowModal(true);
      return;
    }

    dispatch(agregarServicio({ ...Servicio, cantidad: 1 }));
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center"
      style={{ width: "100%" }}
    >
      <div
        className="card shadow-lg d-flex flex-column align-items-center"
        style={{
          width: "90%",
          maxWidth: "1200px",
          borderRadius: "12px",
        }}
      >
        <div style={{ width: "100%", overflow: "hidden" }}>
          <img
            src={Servicio.imagen}
            alt={Servicio.nombre}
            className="card-img-top"
            style={{
              maxHeight: "300px",
              width: "100%",
              objectFit: "contain", // Ajuste para mostrar la imagen completa
            }}
          />
        </div>
        <div className="card-body text-center" style={{ width: "90%" }}>
          <h2 className="text-primary fw-bold mb-3">{Servicio.nombre}</h2>
          <p
            className="text-muted mb-4"
            style={{
              fontSize: "1.1rem",
              textAlign: "justify",
            }}
          >
            {Servicio.descripcion}
          </p>
          <h4 className="text-success mb-2">Precio: ${Servicio.precio}</h4>
          <h5 className="text-danger mb-4">
            Descuento: {Servicio.descuento > 0 ? `-${Servicio.descuento}%` : "Sin descuento"}
          </h5>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary btn-lg mt-4"
              onClick={handleAgregarAlCarrito}
              style={{ width: "50%" }}
            >
              <i className="bi bi-cart-plus me-2"></i> Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Acción no permitida"
      >
        <p>Debe iniciar sesión para agregar este servicio al carrito.</p>
      </Modal>
    </div>
  );
}

export default DetalleServicio;





