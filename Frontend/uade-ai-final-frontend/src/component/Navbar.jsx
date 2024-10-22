import React from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../images/main-logo.png";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../css/style.css";
import "../css/Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Estilos para la barra de navegación
  const navbarStyle = {
    backgroundColor: "#2e3b4e",
    color: "#ffffff",
    borderBottom: "2px solid #0d6efd",
    fontWeight: "bold",
    height: "130px", // Altura ajustada
    padding: "0.2px 0", // Reducir el padding
  };

  return (
    <header
      id="header"
      className="site-header position-relative"
      style={navbarStyle} // Aplicando los estilos en línea
    >
      <nav id="header-nav" className="navbar navbar-expand-lg px-3 mb-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={imgLogo} className="logo" alt="Logo" />
          </Link>
          <button
            className="navbar-toggler d-flex d-lg-none order-3 p-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#bdNavbar"
            aria-controls="bdNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} className="navbar-icon text-white" />
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="bdNavbar"
            aria-labelledby="bdNavbarOffcanvasLabel"
          >
            <div className="offcanvas-header px-4 pb-0">
              <Link to="/" className="navbar-brand">
                <img src={imgLogo} className="logo" alt="Logo" />
              </Link>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul
                id="navbar"
                className="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3"
              >
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white me-4">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Catalogo" className="nav-link text-white me-4">
                    Catalogo
                  </Link>
                </li>
                {user && user.rol === "ADMIN" && (
                  <li className="nav-item">
                    <Link to="/Abm" className="nav-link text-white me-4">
                      Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <div className="user-items ps-5">
                    <ul className="d-flex justify-content-end align-items-center list-unstyled">
                      <li className="pe-3">
                        {token ? (
                          <button onClick={handleLogout} className="btn">
                            <FontAwesomeIcon
                              icon={faSignOutAlt}
                              className="text-white"
                            />
                          </button>
                        ) : (
                          <Link to="/login">
                            <FontAwesomeIcon icon={faUser} className="text-white" />
                          </Link>
                        )}
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#carritoModal"
                        >
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className="text-white"
                          />
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
