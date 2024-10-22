import React, { useEffect, useState } from "react";
import { getServicios } from "../services/Servicios";
import { getFiltros, getServiciosFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleServicio from "./DetalleServicio.jsx";
import { useDispatch, useSelector } from "react-redux";
import { agregarServicio } from "../features/carritoSlice";
import { Link, useNavigate } from "react-router-dom";

function Catalogo() {
  const [Servicios, setServicios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [Servicioseleccionado, setServicioseleccionado] = useState(null);
  const ServiciosPorPagina = 3;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    tipos: [],
  });
  const [ServiciosFiltrados, setServiciosFiltrados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);

  useEffect(() => {
    getServicios()
      .then((data) => {
        setServicios(data);
        setServiciosFiltrados(data);
      })
      .catch((error) => {
        console.error("Error al obtener getServicios:", error);
      });

    getFiltros()
      .then((data) => {
        setFiltros({ tipos: data.tipos });
      })
      .catch((error) => {
        console.error("Error al obtener getFiltros:", error);
      });
  }, []);

  const handleTipoChange = (event) => {
    const tipoId = parseInt(event.target.value);
    if (event.target.checked) {
      setTiposSeleccionados([...tiposSeleccionados, tipoId]);
    } else {
      setTiposSeleccionados(tiposSeleccionados.filter((id) => id !== tipoId));
    }
  };

  const aplicarFiltro = () => {
    setPaginaActual(1);
    getServiciosFiltros({ tipos: tiposSeleccionados })
      .then((ServiciosFiltradosTemp) => {
        setServiciosFiltrados(ServiciosFiltradosTemp);
      })
      .catch((error) => {
        console.error("Error al aplicar filtro:", error);
      });
  };

  const limpiarFiltros = () => {
    setTiposSeleccionados([]);
    setServiciosFiltrados(Servicios);
    document
      .querySelectorAll('.form-check-input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));
    setPaginaActual(1);
  };

  const abrirDetalleServicio = (Servicio) => {
    setServicioseleccionado(Servicio);
  };

  const cerrarDetalleServicio = () => {
    setServicioseleccionado(null);
  };

  const ServiciosPaginaActual = ServiciosFiltrados.slice(
    (paginaActual - 1) * ServiciosPorPagina,
    paginaActual * ServiciosPorPagina
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const MantenerMovimientoCarrito = (e, Servicio) => {
    e.preventDefault();
    dispatch(agregarServicio({ ...Servicio, cantidad: 1 }));
  };

  const handleCardClick = (id) => {
    navigate(`/Catalogo/${id}`);
  };

  return (
    <div className="catalogo-container">
      <div className="filtros-column">
        <div className="filtros-container">
          <div className="filtros-group">
            <h4>Tipos:</h4>
            {filtros.tipos.map((tipo, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={tipo.id}
                  id={`tipo-${index}`}
                  onChange={handleTipoChange}
                />
                <label className="form-check-label" htmlFor={`tipo-${index}`}>
                  {tipo.nombre}
                </label>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={aplicarFiltro}>
            Aplicar Filtro
          </button>
          <button className="btn btn-danger mt-3" onClick={limpiarFiltros}>
            Eliminar Filtros
          </button>
        </div>
      </div>
      <div className="Servicios-container">
        <h2 className="display-7 text-dark text-uppercase">Catalogo</h2>
        <div className="catalogo-grid">
          {ServiciosPaginaActual.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => handleCardClick(product.id)}
            >
              <img src={product.imagen} className="card-img-top" alt={product.nombre} />
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
                    onClick={(e) => MantenerMovimientoCarrito(e, product)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <div className="pagination">
            {[
              ...Array(
                Math.ceil(ServiciosFiltrados.length / ServiciosPorPagina)
              ).keys(),
            ].map((numero) => (
              <button
                key={numero + 1}
                onClick={() => cambiarPagina(numero + 1)}
                className={`btn btn-outline-primary ${
                  numero + 1 === paginaActual ? "active" : ""
                }`}
              >
                {numero + 1}
              </button>
            ))}
          </div>
        </div>
        {Servicioseleccionado && (
          <DetalleServicio
            Servicio={Servicioseleccionado}
            onClose={cerrarDetalleServicio}
          />
        )}
      </div>
    </div>
  );
}

export default Catalogo;
