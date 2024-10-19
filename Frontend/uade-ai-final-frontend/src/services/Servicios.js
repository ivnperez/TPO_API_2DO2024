
const urlServer2 = "http://localhost:3306/"; //Esta  es la URL del back


//GETs

  export const getServicios = () => { // se usa
    return fetch(urlServer2 + `catalogo`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los Servicios.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data getAll:", data);
        return data.content; // Asegurándome de que se accede correctamente a la lista de Servicios
      });
  };

export const getServicioByID = (id) => { // se usa
  return fetch(urlServer + `Servicios/${id}`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("El Servicio no existe.");
        } else {
          throw new Error("Error al obtener el Servicio.");
        }
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getServiciosDestacados = () => { // se usa
  return fetch(urlServer + `servicios/`)
    .then((response) => {
      console.log("Response getServiciosDestacados:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data getServiciosDestacados:", data);
      const items = data.filter((Servicio) => servicio.destacar === true);
      return items;
    })
    .catch((error) => {
      console.error("Error en getServiciosDestacados:", error);
      return [];
    });
};
