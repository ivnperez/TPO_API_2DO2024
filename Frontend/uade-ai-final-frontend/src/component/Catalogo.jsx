import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServicios,
  fetchTipos,
  setFiltrosSeleccionados,
  limpiarFiltros,
} from "../features/servicioSlice";
import { agregarServicio } from "../features/carritoSlice";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "../css/Catalogo.css";

function Catalogo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados desde Redux
  const ServiciosFiltrados = useSelector((state) => state.servicios.filtrados);
  const Tipos = useSelector((state) => state.servicios.tipos);
  const filtrosSeleccionados = useSelector(
    (state) => state.servicios.filtrosSeleccionados
  );
  const statusServicios = useSelector((state) => state.servicios.status);
  const token = useSelector((state) => state.auth.token);
  const usuarioLogueado = !!token;

  // Estados locales
  const [paginaActual, setPaginaActual] = useState(1);
  const ServiciosPorPagina = 3;

  // Estados para modales
  const [showModal, setShowModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockMessage, setStockMessage] = useState("");

  // Cargar servicios y filtros al montar el componente
  useEffect(() => {
    if (statusServicios === "idle") {
      dispatch(fetchServicios());
    }
    dispatch(fetchTipos());
  }, [dispatch, statusServicios]);

  // Manejar selección de tipos
  const handleTipoChange = (event) => {
    const tipoId = parseInt(event.target.value);
    let nuevosFiltros = [...filtrosSeleccionados];

    if (event.target.checked) {
      nuevosFiltros.push(tipoId);
    } else {
      nuevosFiltros = nuevosFiltros.filter((id) => id !== tipoId);
    }

    dispatch(setFiltrosSeleccionados(nuevosFiltros));
    setPaginaActual(1); // Resetear a la primera página
  };

  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    dispatch(limpiarFiltros());
    setPaginaActual(1);
  };

  // Calcular servicios de la página actual
  const ServiciosPaginaActual = ServiciosFiltrados.slice(
    (paginaActual - 1) * ServiciosPorPagina,
    paginaActual * ServiciosPorPagina
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const handleCardClick = (id) => {
    navigate(`/Catalogo/${id}`);
  };

  const handleAgregarCarrito = (e, Servicio) => {
    e.stopPropagation();

    if (!usuarioLogueado) {
      setShowModal(true); // Mostrar modal si no está logueado
      return;
    }

    if (Servicio.stock <= 0) {
      setStockMessage(`El servicio "${Servicio.nombre}" no tiene stock disponible.`);
      setShowStockModal(true); // Mostrar modal de error de stock
      return;
    }

    dispatch(agregarServicio({ ...Servicio, cantidad: 1 }));
  };

  if (statusServicios === "loading") {
    return <p>Cargando servicios...</p>;
  }

  if (statusServicios === "failed") {
    return <p>Error al cargar servicios. Por favor, intenta nuevamente.</p>;
  }

  return (
    <div className="catalogo-container" style={{ marginTop: "50px" }}>
      <div className="row">
        <div className="col-md-3">
          <div className="filtros-column">
            <div className="filtros-container">
              <div className="filtros-group">
                <h4>Tipos:</h4>
                {Tipos.map((tipo) => (
                  <div key={tipo.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={tipo.id}
                      id={`tipo-${tipo.id}`}
                      onChange={handleTipoChange}
                      checked={filtrosSeleccionados.includes(tipo.id)}
                    />
                    <label className="form-check-label" htmlFor={`tipo-${tipo.id}`}>
                      {tipo.nombre}
                    </label>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary mt-3" onClick={() => setPaginaActual(1)}>
                Aplicar Filtro
              </button>
              <button className="btn btn-danger mt-3" onClick={handleLimpiarFiltros}>
                Eliminar Filtros
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="Servicios-container">
            <div className="catalogo-grid">
              {ServiciosPaginaActual.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  onClick={() => handleCardClick(product.id)}
                >
                  <img
                    src={product.imagen}
                    className="card-img-top"
                    alt={product.nombre}
                  />
                  <div className="card-content">
                    <div className="card-body">
                      <h5 className="card-title">{product.nombre}</h5>
                      <p className="card-text">
                        <strong>${product.precio}</strong>
                        {product.descuento > 0 && (
                          <span style={{ color: "red", marginLeft: "10px" }}>
                            -{product.descuento}%
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleAgregarCarrito(e, product)}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-container">
              {[...Array(Math.ceil(ServiciosFiltrados.length / ServiciosPorPagina)).keys()].map(
                (numero) => (
                  <button
                    key={numero + 1}
                    onClick={() => cambiarPagina(numero + 1)}
                    className={`btn btn-outline-primary ${
                      numero + 1 === paginaActual ? "active" : ""
                    }`}
                  >
                    {numero + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de login */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Acción no permitida"
      >
        <p>Debe iniciar sesión para agregar este servicio al carrito.</p>
      </Modal>

      {/* Modal de stock insuficiente */}
      <Modal
        show={showStockModal}
        onClose={() => setShowStockModal(false)}
        title="Stock insuficiente"
      >
        <p>{stockMessage}</p>
      </Modal>
    </div>
  );
}

export default Catalogo;












