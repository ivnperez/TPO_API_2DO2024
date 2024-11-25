import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  servicios: [],
  status: 'idle',
  error: null,
  stockError: null, // Nuevo estado para manejar errores relacionados con el stock
};

// Thunks para confirmar la compra
export const confirmarCompra = createAsyncThunk(
  'carrito/confirmarCompra',
  async (compraData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      console.error('Error: Usuario no autenticado.');
      return rejectWithValue('Usuario no autenticado.');
    }

    console.log('Token utilizado para confirmar la compra:', token);

    const url = 'http://localhost:4002/ventas';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(compraData),
      });

      const text = await response.text();
      console.log('Respuesta completa del servidor:', text);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          throw new Error('Error inesperado en el servidor');
        }
        throw new Error(errorData.message || 'No se pudo confirmar la compra');
      }

      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error('Error al confirmar la compra:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice para manejar el estado del carrito
const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    agregarServicio: (state, action) => {
      const servicio = action.payload;
      const servicioExistente = state.servicios.find(s => s.id === servicio.id);

      // Validación de stock
      if (servicioExistente) {
        if (servicioExistente.cantidad + 1 > servicio.stock) {
          state.stockError = `No hay stock suficiente para agregar más unidades del servicio "${servicio.nombre}".`;
          return;
        }
        servicioExistente.cantidad += 1;
      } else {
        if (servicio.stock <= 0) {
          state.stockError = `El servicio "${servicio.nombre}" no tiene stock disponible.`;
          return;
        }
        state.servicios.push({ ...servicio, cantidad: 1 });
      }
      state.stockError = null; // Limpiar cualquier error previo de stock
    },
    eliminarServicio: (state, action) => {
      const servicioExistente = state.servicios.find(s => s.id === action.payload);
      if (servicioExistente) {
        if (servicioExistente.cantidad > 1) {
          servicioExistente.cantidad -= 1;
        } else {
          state.servicios = state.servicios.filter(s => s.id !== action.payload);
        }
      }
    },
    eliminarTodoServicio: (state, action) => {
      state.servicios = state.servicios.filter(s => s.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.servicios = [];
    },
    limpiarStockError: (state) => {
      state.stockError = null; // Limpiar el error de stock
    },
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

// Exportar las acciones
export const {
  agregarServicio,
  eliminarServicio,
  eliminarTodoServicio,
  vaciarCarrito,
  limpiarStockError,
} = carritoSlice.actions;

// Exportar el reducer del slice
export default carritoSlice.reducer;
