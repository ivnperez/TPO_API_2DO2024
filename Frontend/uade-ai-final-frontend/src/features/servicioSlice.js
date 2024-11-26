import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSolicitudes } from "./solicitudesSlice"; // Importamos fetchSolicitudes

const urlServer2 = "http://localhost:4002/";

// Thunks para operaciones asíncronas utilizando Fetch
export const fetchServicios = createAsyncThunk(
  "servicios/fetchServicios",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {}; // Solo agrega el token si está disponible

      const response = await fetch(`${urlServer2}catalogo`, { headers });

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
    try {
      const state = getState();
      const token = state.auth.token;

      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {}; // Solo agrega el token si está disponible

      const response = await fetch(`${urlServer2}catalogo/${id}`, { headers });

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${urlServer2}catalogo`); // Asume que el endpoint no requiere token
      if (!response.ok) {
        throw new Error("Error al obtener los Servicios.");
      }
      const data = await response.json();
      // Filtra los servicios destacados en el frontend
      return data.content.filter((servicio) => servicio.flag_destacar === true);
    } catch (error) {
      console.error("Error fetching destacados:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para crear una nueva solicitud de servicio
export const crearSolicitud = createAsyncThunk(
  "servicios/crearSolicitud",
  async (solicitudData, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await fetch(`${urlServer2}solicitudes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(solicitudData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la solicitud.");
      }

      const nuevaSolicitud = await response.json();

      // Después de crear la solicitud, actualiza las solicitudes
      dispatch(fetchSolicitudes());

      return nuevaSolicitud;
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
    solicitudModalOpen: false, // Nuevo estado para el modal
    solicitudStatus: "idle",
    solicitudError: null,
  },
  reducers: {
    toggleSolicitudModal: (state) => {
      state.solicitudModalOpen = !state.solicitudModalOpen;
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
      })
      .addCase(crearSolicitud.pending, (state) => {
        state.solicitudStatus = "loading";
      })
      .addCase(crearSolicitud.fulfilled, (state) => {
        state.solicitudStatus = "succeeded";
      })
      .addCase(crearSolicitud.rejected, (state, action) => {
        state.solicitudStatus = "failed";
        state.solicitudError = action.payload;
      });
  },
});

export const { toggleSolicitudModal } = servicioSlice.actions;
export default servicioSlice.reducer;
