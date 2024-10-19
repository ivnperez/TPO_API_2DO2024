import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const urlServer2 = "http://localhost:3306/"; // Esta es el puerto del back

// Funciones para operaciones asíncronas utilizando Fetch
const getServicios = () => {
  return fetch(urlServer2 + 'catalogo')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los Servicios.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data getAll:", data);
      return data.content; 
    });
};

const agregarServicio = (servicio) => {
  const formData = new FormData();
  formData.append("nombre", servicio.nombre);
  formData.append("descripcion", servicio.descripcion);
  formData.append("imagen", servicio.imagen);
  formData.append("precio", servicio.precio);
  formData.append("descuento", servicio.descuento || 0);
  formData.append("tipo", servicio.tipo);
  formData.append("stock", servicio.stock);
  formData.append("flag_destacar", servicio.flag_destacar);

  const token = localStorage.getItem('accessToken'); // ELIMINAR LOCAL STORAGE
  console.log('Token:', token); // Log para verificar el token

  return fetch(`${urlServer2}abm`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`, // Incluir el token en los headers
    },
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || "Error al agregar el servicio.");
        });
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

const eliminarServicio = (id) => {
  const token = localStorage.getItem('accessToken'); // ELIMINAR LOCAL STORAGE TIENE QUE IR COMO EL CARRITO SLICE
  return fetch(`${urlServer2}abm/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  }).then(response => response.json());
};

const modificarServicio = (servicio) => {
  const token = localStorage.getItem('accessToken'); // ELIMINAR LOCAL STORAGE TIENE QUE IR COMO EL CARRITO SLICE

  return fetch(`${urlServer2}abm`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Incluir el token en los headers
    },
    body: JSON.stringify({
      id: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      descuento: servicio.descuento || 0, // Default value if descuento is null
      tipo: servicio.tipo,
      stock: servicio.stock,
      flag_destacar: servicio.flag_destacar
    })
  }).then(response => response.json());
};

// eliminar esto de thunk no debe ser asi
export const fetchServicios = createAsyncThunk('servicios/fetchServicios', async () => {
  const response = await getServicios();
  return response;
});

export const createServicio = createAsyncThunk('servicios/createservicio', async (nuevoServicio) => {
  const response = await agregarservicio(nuevoServicio);
  return response;
});

export const deleteServicio = createAsyncThunk('servicios/deleteServicio', async (id) => {
  await eliminarServicio(id);
  return id;
});

export const updateServicio = createAsyncThunk('servicios/updateServicio', async (servicio) => {
  const response = await modificarServicio(servicio);
  return response;
});

// Slice
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
        state.items[index] = action.payload;
      });
  },
});

export default abmSlice.reducer;

