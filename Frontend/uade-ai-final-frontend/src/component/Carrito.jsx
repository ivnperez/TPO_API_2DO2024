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
  limpiarStockError,
} from "../features/carritoSlice";
import { fetchSolicitudes } from "../features/solicitudesSlice"; // Importación de fetchSolicitudes
import Modal from "./Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Carrito.css";

function Carrito({ children }) {
  const dispatch = useDispatch();
  const serviciosCarrito = useSelector((state) => state.carrito.servicios);
  const stockError = useSelector((state) => state.carrito.stockError);
  const usuario = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    setError(null);
  }, [serviciosCarrito]);

  const precioTotal = serviciosCarrito.reduce((total, servicio) => {
    const precio = parseFloat(servicio.precio || 0);
    return total + precio * servicio.cantidad;
  }, 0);

  const precioTotalConDescuento = serviciosCarrito.reduce((total, servicio) => {
    const precioDescuento = parseFloat(
      servicio.precioDescuento || servicio.precio || 0
    );
    return total + precioDescuento * servicio.cantidad;
  }, 0);

  const handleAbrirSolicitudModal = () => {
    const carritoModalElement = document.getElementById("carritoModal");
    if (carritoModalElement) {
      const modalInstance = window.bootstrap.Modal.getInstance(carritoModalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    setShowSolicitudModal(true);
  };

  const handleCerrarSolicitudModal = () => {
    setShowSolicitudModal(false);
    setDireccion("");
    setTelefono("");
    setComentario("");
  };

  const handleCerrarConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCerrarStockModal = () => {
    dispatch(limpiarStockError());
  };

  const handleConfirmarCompra = () => {
    if (!usuario || !usuario.id) {
      alert("Debe iniciar sesión para completar la compra.");
      return;
    }

    const solicitudData = {
      direccion,
      telefono,
      comentario,
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: new Date().toISOString().split("T")[0],
      usuarioId: usuario.id,
      servicioId: serviciosCarrito[0]?.id,
    };

    setIsConfirming(true);

    // Crear solicitud y luego confirmar la compra
    fetch("http://localhost:4002/solicitudes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitudData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear la solicitud.");
        }
        return response.json();
      })
      .then(() => {
        // Confirmar compra
        const compraData = {
          id_user: usuario.id,
          detalles: serviciosCarrito.map((item) => ({
            id_servicio: item.id,
            cantidad: item.cantidad,
          })),
          total: precioTotalConDescuento,
        };

        dispatch(confirmarCompra(compraData))
          .then(() => {
            setShowConfirmModal(true); // Mostrar modal de confirmación
            handleCerrarSolicitudModal();
            dispatch(vaciarCarrito()); // Vaciar carrito después de la compra

            // **Actualizar la lista de solicitudes**
            dispatch(fetchSolicitudes());
          })
          .catch((error) => {
            console.error("Error al confirmar la compra:", error);
            setError("Error al confirmar la compra. Intente nuevamente.");
          });
      })
      .catch((error) => {
        console.error("Error al crear la solicitud:", error);
        setError("Error al crear la solicitud. Intente nuevamente.");
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
                    <p className="mb-0 texto-negro">Precio: ${servicio.precio}</p>
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
              <p className="texto-negro">Total con Descuento: ${precioTotalConDescuento.toLocaleString()}</p>
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

      {/* Modal de Confirmación */}
      <Modal
        show={showConfirmModal}
        onClose={handleCerrarConfirmModal}
        title="Confirmación Exitosa"
      >
        <p>El pedido del servicio se realizó con éxito.</p>
      </Modal>

      {/* Modal de Error de Stock */}
      <Modal
        show={!!stockError}
        onClose={handleCerrarStockModal}
        title="Error de Stock"
      >
        <p>{stockError}</p>
      </Modal>
    </div>
  );
}

export default Carrito;
