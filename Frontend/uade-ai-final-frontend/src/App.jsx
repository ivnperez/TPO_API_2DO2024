import Navbar from "./component/Navbar.jsx";
import Catalogo from "./component/Catalogo.jsx";
import CarritoCompras from "./component/Carrito.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home.jsx";
import Abm from "./component/Abm.jsx";
import Registro from "./component/Registro.jsx";
import DetalleProducto from "./component/DetalleServicio.jsx";
import Login from "./component/Login.jsx";

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
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Carrito>
    </>
  );
}
export default App;
