import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const urlServer2 = "http://localhost:4002/";

// Thunks para operaciones asíncronas
export const fetchServicios = createAsyncThunk(
  "servicios/fetchServicios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${urlServer2}catalogo`);
      if (!response.ok) {
        throw new Error("Error al obtener los servicios.");
      }
      const data = await response.json();
      return data.content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServicioByID = createAsyncThunk(
  "servicios/fetchServicioByID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${urlServer2}catalogo/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("El servicio no existe.");
        } else {
          throw new Error("Error al obtener el servicio.");
        }
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServiciosDestacados = createAsyncThunk(
  "servicios/fetchServiciosDestacados",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${urlServer2}catalogo`);
      if (!response.ok) {
        throw new Error("Error al obtener los servicios destacados.");
      }
      const data = await response.json();
      return data.content.filter((servicio) => servicio.flag_destacar === true);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para obtener los tipos de servicios (filtros)
export const fetchTipos = createAsyncThunk(
  "servicios/fetchTipos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${urlServer2}catalogo/tipo`);
      if (!response.ok) {
        throw new Error("Error al obtener los tipos.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para obtener servicios filtrados
export const fetchServiciosConFiltro = createAsyncThunk(
  "servicios/fetchServiciosConFiltro",
  async (filtros, { rejectWithValue }) => {
    const url = new URL(`${urlServer2}catalogo/filtro`);

    if (filtros.tipos.length > 0) {
      filtros.tipos.forEach((tipo) => url.searchParams.append("tipoId", tipo));
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los servicios filtrados.");
      }
      const data = await response.json();
      return data; // Servicios filtrados
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice para manejar el estado de los servicios
const servicioSlice = createSlice({
  name: "servicios",
  initialState: {
    items: [],
    tipos: [], // Lista de tipos para filtros
    filtrosSeleccionados: [], // Filtros activos
    filtrados: [], // Servicios filtrados
    servicioSeleccionado: null,
    destacados: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setFiltrosSeleccionados: (state, action) => {
      state.filtrosSeleccionados = action.payload;
    },
    limpiarFiltros: (state) => {
      state.filtrosSeleccionados = [];
      state.filtrados = state.items; // Restaurar todos los servicios
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filtrados = action.payload; // Inicializar servicios filtrados
      })
      .addCase(fetchServicios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchServicioByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicioByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.servicioSeleccionado = action.payload;
      })
      .addCase(fetchServicioByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchServiciosDestacados.fulfilled, (state, action) => {
        state.destacados = action.payload;
      })
      .addCase(fetchTipos.fulfilled, (state, action) => {
        state.tipos = action.payload; // Guardar los tipos en el estado
      })
      .addCase(fetchServiciosConFiltro.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiciosConFiltro.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filtrados = action.payload; // Actualizar servicios filtrados
      })
      .addCase(fetchServiciosConFiltro.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFiltrosSeleccionados, limpiarFiltros } = servicioSlice.actions;
export default servicioSlice.reducer;
