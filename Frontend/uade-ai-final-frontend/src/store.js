import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import abmReducer from "./features/abmSlice";
import carritoReducer from "./features/carritoSlice";
import servicioReducer from "./features/servicioSlice";
import solicitudesReducer from "./features/solicitudesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    abm: abmReducer,
    carrito: carritoReducer,
    servicios: servicioReducer,
    solicitudes: solicitudesReducer, 
  },
});

export default store;
