import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const urlServer2 = "http://localhost:4002/";

// Thunks para operaciones asíncronas utilizando Fetch
export const fetchServicios = createAsyncThunk(
  "servicios/fetchServicios",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      console.error('Token no disponible. Por favor, inicia sesión.');
      return rejectWithValue('Token no disponible. Por favor, inicia sesión.');
    }

    try {
      const response = await fetch(`${urlServer2}catalogo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los Servicios.");
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
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      console.error('Token no disponible. Por favor, inicia sesión.');
      return rejectWithValue('Token no disponible. Por favor, inicia sesión.');
    }

    try {
      const response = await fetch(`${urlServer2}catalogo/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("El Servicio no existe.");
        } else {
          throw new Error("Error al obtener el Servicio.");
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
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      console.error('Token no disponible. Por favor, inicia sesión.');
      return rejectWithValue('Token no disponible. Por favor, inicia sesión.');
    }

    try {
      const response = await fetch(`${urlServer2}catalogo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los Servicios.");
      }
      const data = await response.json();
      return data.content.filter((Servicio) => Servicio.flag_destacar === true);
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
    servicioSeleccionado: null,
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
        state.error = action.payload;
      })
      .addCase(fetchServicioByID.fulfilled, (state, action) => {
        state.servicioSeleccionado = action.payload;
      })
      .addCase(fetchServiciosDestacados.fulfilled, (state, action) => {
        state.destacados = action.payload;
      });
  },
});

export default servicioSlice.reducer;

