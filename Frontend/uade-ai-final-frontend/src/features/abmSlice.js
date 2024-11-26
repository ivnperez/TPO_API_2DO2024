import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const urlServer2 = "http://localhost:4002/";

// Funciones para operaciones asíncronas
export const fetchServicios = createAsyncThunk('servicios/fetchServicios', async () => {
  const response = await fetch(urlServer2 + 'catalogo');
  if (!response.ok) {
    throw new Error("Error al obtener los Servicios.");
  }
  const data = await response.json();
  return data.content;
});

export const createServicio = createAsyncThunk(
  'servicios/createServicio',
  async (nuevoServicio, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue('Token no disponible. Por favor, inicia sesión.');
    }

    const formData = new FormData();
    formData.append("nombre", nuevoServicio.nombre);
    formData.append("descripcion", nuevoServicio.descripcion);
    formData.append("imagen", nuevoServicio.imagen);
    formData.append("precio", nuevoServicio.precio);
    formData.append("descuento", nuevoServicio.descuento || 0);
    formData.append("tipo", nuevoServicio.tipo);
    formData.append("stock", nuevoServicio.stock);
    formData.append("flag_destacar", nuevoServicio.flag_destacar);

    try {
      const response = await fetch(`${urlServer2}ABM`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error al agregar el servicio. Respuesta del servidor:', errorMessage);
        throw new Error(errorMessage || "Error al agregar el servicio.");
      }

      return await response.json();
    } catch (error) {
      console.error('Error al realizar la solicitud para crear el servicio:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateServicio = createAsyncThunk(
  "servicios/updateServicio",
  async (servicio, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue("Token no disponible. Por favor, inicia sesión.");
    }

    const formData = new FormData();
    formData.append("nombre", servicio.nombre || "");
    formData.append("descripcion", servicio.descripcion || "");
    formData.append("precio", servicio.precio || "");
    formData.append("descuento", servicio.descuento || 0);
    formData.append("tipo", servicio.tipo || "");
    formData.append("stock", servicio.stock || 0);
    formData.append("flag_destacar", servicio.flag_destacar || false);

    // Si existe una imagen nueva, usarla; de lo contrario, usar la imagen existente
    if (servicio.imagen instanceof File || servicio.imagen instanceof Blob) {
      formData.append("imagen", servicio.imagen);
    } else if (servicio.imagenUrl) {
      formData.append("imagenUrl", servicio.imagenUrl); // Agregar URL como referencia
    }

    try {
      const response = await fetch(`${urlServer2}ABM/${servicio.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error al actualizar el servicio. Respuesta del servidor:",
          errorMessage
        );
        throw new Error(errorMessage || "Error al modificar el servicio.");
      }

      return await response.json();
    } catch (error) {
      console.error(
        "Error al realizar la solicitud para actualizar el servicio:",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);


export const deleteServicio = createAsyncThunk(
  'servicios/deleteServicio',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue('Token no disponible. Por favor, inicia sesión.');
    }

    try {
      const response = await fetch(`${urlServer2}ABM/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error al eliminar el servicio. Respuesta del servidor:', errorMessage);
        throw new Error("Error al eliminar el servicio.");
      }

      return id;
    } catch (error) {
      console.error('Error al realizar la solicitud para eliminar el servicio:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Slice para manejar el estado
const abmSlice = createSlice({
  name: 'servicios',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicios.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServicios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchServicios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createServicio.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteServicio.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateServicio.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

// Exportar el slice y las acciones necesarias
export default abmSlice.reducer;

