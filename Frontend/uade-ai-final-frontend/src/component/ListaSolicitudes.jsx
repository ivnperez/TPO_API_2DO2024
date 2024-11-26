import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolicitudes } from "../features/solicitudesSlice";

const ListaSolicitudes = () => {
  const dispatch = useDispatch();
  const { solicitudes, status, error } = useSelector((state) => state.solicitudes);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSolicitudes());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Cargando solicitudes...</p>;
  }

  if (status === "failed") {
    return <p>Error al cargar solicitudes: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Solicitudes</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Servicio</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Comentario</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.id}</td>
              <td>{solicitud.usuarioNombre || "N/A"}</td>
              <td>{solicitud.servicioNombre || "N/A"}</td>
              <td>{solicitud.direccion}</td>
              <td>{solicitud.telefono}</td>
              <td>{solicitud.comentario}</td>
              <td>{solicitud.fechaInicio}</td>
              <td>{solicitud.fechaFin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};



export default ListaSolicitudes;
