import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  solicitudes: [], // Listado de solicitudes
  status: "idle", // Estado de carga
  error: null, // Manejo de errores
};

const urlSolicitudes = "http://localhost:4002/solicitudes";

// **Thunk para obtener todas las solicitudes**
export const fetchSolicitudes = createAsyncThunk(
  "solicitudes/fetchSolicitudes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(urlSolicitudes);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error al obtener las solicitudes.");
      }
      const data = await response.json();
      return data; // Devolver las solicitudes obtenidas
    } catch (error) {
      return rejectWithValue(error.message); // Manejo de errores
    }
  }
);

// **Thunk para crear una nueva solicitud**
export const createSolicitud = createAsyncThunk(
  "solicitudes/createSolicitud",
  async (solicitudData, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token; // Token para autorización

      const response = await fetch(urlSolicitudes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // Agregar token si está disponible
        },
        body: JSON.stringify(solicitudData), // Datos de la nueva solicitud
      });

      if (!response.ok) {
        throw new Error("Error al crear la solicitud.");
      }

      const data = await response.json();

      // **Despachar `fetchSolicitudes` para actualizar el listado**
      dispatch(fetchSolicitudes());

      return data; // Devolver la nueva solicitud creada
    } catch (error) {
      return rejectWithValue(error.message); // Manejo de errores
    }
  }
);

// **Slice para manejar el estado de las solicitudes**
const solicitudesSlice = createSlice({
  name: "solicitudes",
  initialState,
  reducers: {}, // No hay reducers síncronos en este slice
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolicitudes.pending, (state) => {
        state.status = "loading"; // Estado de carga
      })
      .addCase(fetchSolicitudes.fulfilled, (state, action) => {
        state.status = "succeeded"; // Estado exitoso
        state.solicitudes = action.payload; // Actualizar el listado de solicitudes
      })
      .addCase(fetchSolicitudes.rejected, (state, action) => {
        state.status = "failed"; // Estado de error
        state.error = action.payload || "Error al cargar las solicitudes."; // Mensaje de error
      })
      .addCase(createSolicitud.pending, (state) => {
        state.status = "loading"; // Estado de carga al crear solicitud
      })
      .addCase(createSolicitud.fulfilled, (state) => {
        state.status = "succeeded"; // Estado exitoso después de crear solicitud
      })
      .addCase(createSolicitud.rejected, (state, action) => {
        state.status = "failed"; // Estado de error al crear solicitud
        state.error = action.payload || "Error al crear la solicitud."; // Mensaje de error
      });
  },
});

// Exportar el reducer
export default solicitudesSlice.reducer;
