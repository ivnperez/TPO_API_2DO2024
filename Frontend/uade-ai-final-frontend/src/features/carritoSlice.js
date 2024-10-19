import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; //Ver de quitar el Async Thunk si no se usa

export const confirmarCompra = createAsyncThunk(
  'carrito/confirmarCompra',
  async (compraData, { getState, rejectWithValue }) => {
    const state = getState();
    const usuarioId = compraData.id_usuario;

    if (!usuarioId) {
      console.error('Error: usuarioId is undefined');
      return rejectWithValue('Usuario no autenticado');
    }

    const url = 'http://localhost:3306/ventas';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(compraData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo confirmar la compra');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al confirmar la compra:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  servicios: [],
  status: 'idle',
  error: null,
};

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    agregarServicio: (state, action) => {
      const servicioExistente = state.servicios.find(servicio => servicio.id === action.payload.id);
      if (servicioExistente) {
        servicioExistente.cantidad += action.payload.cantidad;
      } else {
        state.servicios.push({ ...action.payload, cantidad: 1 });
      }
    },
    eliminarServicio: (state, action) => {
      const servicioExistente = state.servicios.find(servicio => servicio.id === action.payload);
      if (servicioExistente) {
        if (servicioExistente.cantidad > 1) {
          servicioExistente.cantidad -= 1;
        } else {
          state.servicios = state.servicios.filter(servicio => servicio.id !== action.payload);
        }
      }
    },
    eliminarTodoServicio: (state, action) => {
      state.servicios = state.servicios.filter(servicio =>servicio.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.servicios = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmarCompra.fulfilled, (state) => {
        state.servicios = []; // Vaciar el carrito tras la compra
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(confirmarCompra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmarCompra.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { agregarServicio, eliminarServicio, eliminarTodoServicio, vaciarCarrito } = carritoSlice.actions;

export default carritoSlice.reducer;