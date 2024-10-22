import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asincrónica para el login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
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

    // Verifica que el ID y el email estén presentes en la respuesta
    if (!data.id || !data.email) {
      throw new Error('No se recibió el ID o el email en la respuesta');
    }

    return {
      id: data.id,
      email: data.email,
      usuario: data.usuario,
      nombre: data.nombre,
      rol: data.rol,
      access_token: data.access_token,
    };
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
      console.log('Registro exitoso:', data);

      return {
        id: data.id,
        email: data.email,
        usuario: data.usuario,
        nombre: data.nombre,
        rol: data.rol,
        access_token: data.access_token,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          usuario: action.payload.usuario,
          nombre: action.payload.nombre,
          rol: action.payload.rol,
        };
        state.token = action.payload.access_token;
        console.log('Usuario guardado:', state.user);
        console.log('Token guardado:', state.token);
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
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          usuario: action.payload.usuario,
          nombre: action.payload.nombre,
          rol: action.payload.rol,
        };
        state.token = action.payload.access_token;
        console.log('Registro completado. Usuario guardado:', state.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
