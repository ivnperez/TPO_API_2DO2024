import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const urlServer2 = "http://localhost:3306/"; // URL del backend

// Thunks para operaciones asíncronas utilizando Fetch

export const fetchServicios = createAsyncThunk(
  "servicios/fetchServicios",
  async () => {
    const response = await fetch(urlServer2 + "catalogo");
    if (!response.ok) {
      throw new Error("Error al obtener los Servicios.");
    }
    const data = await response.json();
    return data.content; // Asegurándome de que se accede correctamente a la lista de Servicios
  }
);

export const fetchServicioByID = createAsyncThunk(
  "servicios/fetchServicioByID",
  async (id) => {
    const response = await fetch(`${urlServer2}catalogo/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("El Servicio no existe.");
      } else {
        throw new Error("Error al obtener el Servicio.");
      }
    }
    return await response.json();
  }
);

export const fetchServiciosDestacados = createAsyncThunk(
  "servicios/fetchServiciosDestacados",
  async () => {
    const response = await fetch(urlServer2 + "catalogo");
    if (!response.ok) {
      throw new Error("Error al obtener los Servicios.");
    }
    const data = await response.json();
    return data.content.filter((Servicio) => Servicio.flag_destacar === true);
  }
);


const Servicioslice = createSlice({
  name: "servicios",
  initialState: {
    items: [],
    servicioseleccionado: null,
    destacados: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchServicios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchServicioByID.fulfilled, (state, action) => {
        state.Servicioseleccionado = action.payload;
      })
      .addCase(fetchServiciosDestacados.fulfilled, (state, action) => {
        state.destacados = action.payload;
      });
  },
});

export default servicioSlice.reducer;
