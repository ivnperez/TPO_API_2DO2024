import Navbar from "./component/Navbar.jsx";
import Catalogo from "./component/Catalogo.jsx";
import Carrito from "./component/Carrito.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home.jsx";
import Abm from "./component/Abm.jsx";
import Registro from "./component/Registro.jsx";
import DetalleServicio from "./component/DetalleServicio.jsx";
import Login from "./component/Login.jsx";
import AdminPanel from "./component/AdminPanel.jsx";
import ListaSolicitudes from "./component/ListaSolicitudes.jsx";

function App() {
  return (
    <>
      <Carrito>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Catalogo/:id" element={<DetalleServicio />} />
          <Route path="/Abm" element={<Abm />} />
          <Route path="/solicitudes" element={<ListaSolicitudes />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Carrito>
    </>
  );
}

export default App;

