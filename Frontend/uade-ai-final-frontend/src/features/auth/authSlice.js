import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asincrónica para el login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => { //Sacar el AsyncThunk, el modelo a seguir es el carrito de compras
  try {
    const response = await fetch('http://localhost:4002/api/v1/auth/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Could not authenticate');
    }

    const data = await response.json();
    console.log('Response data:', data); 
    console.log('Token:', data.access_token);
    localStorage.setItem('accessToken', data.access_token); // QUITAR ESTO DE LOCAL STORAGE NO  VA
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});




// Acción asincrónica para registrar usuario
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4002/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token); // QUITAR LOCAL STORE NO APROVECHA REDUX
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('accessToken'); //ELIMINAR PASO DE LOCAL STORAGE ESTO ESTA MAL NO SE HACE ASI
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;