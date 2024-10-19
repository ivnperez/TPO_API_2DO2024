const urlServer2 = "http://localhost:3306/"; // URL del backend

export const getTipos = () => {
    return fetch(urlServer2 + `catalogo/tipo`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.error('Error en getTipos:', error);
            return [];
        });
};

export const getFiltros = async () => {
    try {
        const tipos = await getTipos();
        return {
            tipos
        };
    } catch (error) {
        console.error('Error en getFiltros:', error);
        throw error;
    }
};

export const getServiciosFiltros = (filtroServicios) => {
    let url = urlServer2 + `catalogo/filtro`;
    if (filtroServicios.tipos.length > 0) {
        url += `?tipoId=${filtroServicios.tipos[0]}`;
    }

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Servicios filtrados obtenidos:", data);
            return data;
        })
        .catch((error) => {
            console.error('Error en getServiciosFiltros:', error);
            return [];
        });
};