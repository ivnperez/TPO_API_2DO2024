import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  agregarServicio,
  eliminarServicio,
  eliminarTodoServicio,
  vaciarCarrito,
  confirmarCompra,
} from "../features/carritoSlice";
import Modal from "./Modal"; // Asegúrate de que este componente exista
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Carrito.css";

function Carrito({ children }) {
  const dispatch = useDispatch();
  const serviciosCarrito = useSelector((state) => state.carrito.servicios);
  const usuario = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    setError(null);
  }, [serviciosCarrito]);

  const precioTotal = serviciosCarrito.reduce((total, servicio) => {
    const precioString = servicio.precio.toString().replace(/[^\d]+/g, "");
    const precio = parseFloat(precioString);
    return total + precio * servicio.cantidad;
  }, 0);

  const precioTotalConDescuento = serviciosCarrito.reduce((total, servicio) => {
    const precioDescuentoString = servicio.precioDescuento
      ?.toString()
      .replace(/[^\d]+/g, "");
    const precioDescuento = parseFloat(precioDescuentoString || 0);
    return total + precioDescuento * servicio.cantidad;
  }, 0);

  const handleAbrirSolicitudModal = () => {
    setShowSolicitudModal(true);
    // Cerrar el modal del carrito al abrir el de solicitud
    const carritoModalElement = document.getElementById("carritoModal");
    if (carritoModalElement) {
      carritoModalElement.classList.remove("show");
      carritoModalElement.style.display = "none";
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
  };

  const handleCerrarSolicitudModal = () => {
    setShowSolicitudModal(false);
    setDireccion("");
    setTelefono("");
    setComentario("");
  };

  const handleConfirmarCompra = () => {
    if (!usuario || !usuario.id) {
      alert("Debe iniciar sesión para completar la compra.");
      return;
    }

    const compraData = {
      id_user: usuario.id,
      detalles: serviciosCarrito.map((item) => ({
        id_servicio: item.id,
        cantidad: item.cantidad,
      })),
      total: precioTotalConDescuento,
      solicitud: {
        direccion,
        telefono,
        comentario,
      },
    };

    setIsConfirming(true);
    dispatch(confirmarCompra(compraData))
      .then((result) => {
        if (result.type === "carrito/confirmarCompra/fulfilled") {
          alert("Compra confirmada con éxito.");
          dispatch(vaciarCarrito());
          handleCerrarSolicitudModal();
        } else {
          setError("Error al confirmar la compra. Intente nuevamente.");
        }
      })
      .finally(() => {
        setIsConfirming(false);
      });
  };

  return (
    <div>
      {children}
      <div
        className="modal fade"
        id="carritoModal"
        tabIndex="-1"
        aria-labelledby="carritoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="carritoModalLabel">
                Carrito de Compras
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {serviciosCarrito.map((servicio, index) => (
                <div key={index} className="d-flex align-items-center">
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className="img-thumbnail mr-3"
                    style={{ width: "100px" }}
                  />
                  <div className="flex-grow-1">
                    <p className="mb-0 texto-negro">{servicio.nombre}</p>
                    <p className="mb-0 texto-negro">${servicio.precio}</p>
                  </div>
                  <div className="d-flex align-items-center me-2">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => dispatch(eliminarServicio(servicio.id))}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <p className="mb-0">{servicio.cantidad}</p>
                    <button
                      className="btn btn-success ms-2"
                      onClick={() =>
                        dispatch(agregarServicio({ ...servicio, cantidad: 1 }))
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(eliminarTodoServicio(servicio.id))}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
            <div className="modal-footer d-flex flex-column align-items-start">
              <p className="texto-negro">Total: ${precioTotal.toLocaleString()}</p>
              <p className="texto-negro">
                Total con Descuento: ${precioTotalConDescuento.toLocaleString()}
              </p>
            </div>
            <div className="modal-footer texto-negro">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => dispatch(vaciarCarrito())}
                disabled={serviciosCarrito.length === 0}
              >
                Vaciar Carrito
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAbrirSolicitudModal}
                disabled={serviciosCarrito.length === 0}
              >
                Comprar
              </button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Solicitud de Servicio */}
      <Modal
        show={showSolicitudModal}
        onClose={handleCerrarSolicitudModal}
        title="Completar Solicitud de Servicio"
      >
        <form>
          <div>
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Comentario:</label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleConfirmarCompra}
            disabled={isConfirming}
          >
            Confirmar
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Carrito;
