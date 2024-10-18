import React from "react";

function FiltrosCatalogo({
  filtros,
  handleTipoChange,
  aplicarFiltro,
  limpiarFiltros
}) {
  return (
    <div className="filtros-container">
      <div className="filtros-group">
        <h4>Géneros:</h4>
        {filtros.generos.map((genero, index) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={genero.id}
              id={`genero-${index}`}
              onChange={handleGeneroChange}
            />
            <label className="form-check-label" htmlFor={`genero-${index}`}>
              {genero.nombre}
            </label>
          </div>
        ))}
      </div>
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
      <div className="filtros-group">
        <h4>Plataformas:</h4>
        {filtros.plataformas.map((plataforma, index) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={plataforma.id}
              id={`plataforma-${index}`}
              onChange={handlePlataformaChange}
            />
            <label className="form-check-label" htmlFor={`plataforma-${index}`}>
              {plataforma.nombre}
            </label>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={aplicarFiltro}>
        Aplicar Filtro
      </button>
      <button className="btn btn-secondary mt-3" onClick={limpiarFiltros}>
        Eliminar Filtros
      </button>
    </div>
  );
}

export default FiltrosCatalogo;