import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicios, createServicio, deleteServicio, updateServicio } from '../features/abmSlice';
import { getFiltros } from "../services/Filtros";
import "../css/Catalogo.css";
import DetalleServicio from "./DetalleServicio.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from 'react-bootstrap';

function CatalogoABM() {
  const dispatch = useDispatch();
  const Servicios = useSelector(state => state.abm.items || []);
  const status = useSelector(state => state.abm.status);
  const error = useSelector(state => state.abm.error);

  const [paginaActual, setPaginaActual] = useState(1);
  const [Servicioseleccionado, setServicioseleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const ServiciosPorPagina = 9;
  const [filtros, setFiltros] = useState({
    tipos: []
  });
  const [ServiciosFiltrados, setServiciosFiltrados] = useState([]);
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
    tipo: "",
    stock: 0,
    descuento: 0.0,
    flag_destacar: false // Asegúrate de que el campo sea booleano
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchServicios());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (Servicios) {
      setServiciosFiltrados(Servicios);
    }
  }, [Servicios]);

  useEffect(() => {
    getFiltros()
      .then((data) => {
        setFiltros(data);
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
    let ServiciosFiltradosTemp = Servicios.filter((Servicio) => {

      const filtroTipos =
        tiposSeleccionados.length === 0 ||
        tiposSeleccionados.some((tipo) => Servicio.tipo.includes(tipo));


      return filtroTipos;
    });

    setServiciosFiltrados(ServiciosFiltradosTemp);
    return ServiciosFiltradosTemp;
  };

  const limpiarFiltros = () => {
    setTiposSeleccionados([]);
    aplicarFiltro(); // Aplicar filtro vacío para mostrar todos los Servicios
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setNuevoServicio({
      ...nuevoServicio,
      imagen: file
    });
  };

  const abrirModal = (modo, Servicio = null) => {
    setModoEdicion(modo === 'editar');
    setServicioseleccionado(Servicio);
    setNuevoServicio(Servicio || {
      nombre: "",
      precio: "",
      descripcion: "",
      imagen: null,
      tipo: "",
      stock: 0,
      descuento: 0.0,
      flag_destacar: false
    });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setServicioseleccionado(null);
  };

  const manejarSubmit = () => {
    if (modoEdicion) {
      dispatch(updateServicio(nuevoServicio))
        .unwrap()
        .then(() => {
          dispatch(fetchServicios());
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al modificar el Servicio:", error);
        });
    } else {
      dispatch(createServicio(nuevoServicio))
        .unwrap()
        .then(() => {
          dispatch(fetchServicios());
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al agregar el Servicio:", error);
        });
    }
  };

  const eliminarServicioseleccionado = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este Servicio?")) {
      dispatch(deleteServicio(id))
        .unwrap()
        .then(() => {
          dispatch(fetchServicios());
        })
        .catch((error) => {
          console.error("Error al eliminar el Servicio:", error);
        });
    }
  };

  const ServiciosPaginaActual = ServiciosFiltrados.slice(
    (paginaActual - 1) * ServiciosPorPagina,
    paginaActual * ServiciosPorPagina
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="catalogo-container">
      <div className="filtros-column">
        <button
          className="btn btn-success mt-3"
          onClick={() => abrirModal('agregar')}
        >
          <FontAwesomeIcon icon={faPlusSquare} /> Agregar Servicio
        </button>
      </div>
      <div className="Servicios-container">
        <h2 className="display-7 text-dark text-uppercase">Catalogo</h2>
        <div className="catalogo-grid">
          {ServiciosPaginaActual.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => abrirModal('ver', product)}
            >
              <img src={product.imagen} className="card-img-top" alt={product.nombre} />
              <div className="card-content">
                <div className="card-body">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text">{product.precio}</p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarServicioseleccionado(product.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModal('editar', product);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
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
              >
                {numero + 1}
              </button>
            ))}
          </div>
        </div>
        {Servicioseleccionado && (
          <DetalleServicio
            Servicio={Servicioseleccionado}
            onClose={cerrarModal}
          />
        )}
      </div>
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Modificar Servicio" : "Agregar Servicio"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoServicio.nombre}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    nombre: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={nuevoServicio.precio}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    precio: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={nuevoServicio.descripcion}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    descripcion: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAnioLanzamiento">
              <Form.Label>Año de Lanzamiento</Form.Label>
              <Form.Control
                type="text"
                value={nuevoServicio.anioLanzamiento}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    anioLanzamiento: e.target.value
                  })
                }
              />
            </Form.Group>
            {!modoEdicion && (
              <Form.Group controlId="formImagen">
                <Form.Label>Cargar imagen</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImagenChange}
                />
              </Form.Group>
            )}
            <Form.Group controlId="formDesarrollador">
              <Form.Label>Desarrollador</Form.Label>
              <Form.Control
                type="text"
                value={nuevoServicio.desarrollador}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    desarrollador: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={nuevoServicio.tipo}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    tipo: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={nuevoServicio.stock}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    stock: parseInt(e.target.value)
                  })
                }
              />
            </Form.Group>
            {/* Nuevos campos */}
            <Form.Group controlId="formDescuento">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={nuevoServicio.descuento}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    descuento: parseFloat(e.target.value)
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFlagDestacar">
              <Form.Check
                type="checkbox"
                label="Flag Destacar"
                checked={nuevoServicio.flag_destacar}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    flag_destacar: e.target.checked
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={manejarSubmit}>
            {modoEdicion ? "Modificar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CatalogoABM;
