import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTools } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleNavigateToABM = () => {
    navigate("/Abm");
  };

  const handleNavigateToSolicitudes = () => {
    navigate("/solicitudes");
  };

  return (
    <div className="admin-panel-container d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="mb-4 fw-bold text-primary">Panel de Administración</h1>

      <Row className="justify-content-center mt-5 w-75">
        <Col xs={12} md={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <FontAwesomeIcon
                icon={faTools}
                size="3x"
                className="text-primary mb-3"
              />
              <Card.Title className="fw-bold">Gestión ABM</Card.Title>
              <Card.Text className="text-muted">
                Agrega, modifica o elimina servicios de tu catálogo.
              </Card.Text>
              <Button
                variant="primary"
                onClick={handleNavigateToABM}
                className="w-100"
              >
                Ir a ABM
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <FontAwesomeIcon
                icon={faClipboardList}
                size="3x"
                className="text-success mb-3"
              />
              <Card.Title className="fw-bold">Solicitudes</Card.Title>
              <Card.Text className="text-muted">
                Consulta y gestiona las solicitudes de los clientes.
              </Card.Text>
              <Button
                variant="success"
                onClick={handleNavigateToSolicitudes}
                className="w-100"
              >
                Ver Solicitudes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanel;


