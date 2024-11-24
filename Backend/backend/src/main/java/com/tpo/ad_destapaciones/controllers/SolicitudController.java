package com.tpo.ad_destapaciones.controllers;

import com.tpo.ad_destapaciones.entity.SolicitudServicio;
import com.tpo.ad_destapaciones.service.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/solicitudes")
@CrossOrigin // Permitir solicitudes desde el frontend
public class SolicitudController {

    private static final Logger logger = LoggerFactory.getLogger(SolicitudController.class);

    @Autowired
    private SolicitudService solicitudService;

    // Crear una nueva solicitud
@PostMapping
public ResponseEntity<?> crearSolicitud(@RequestBody SolicitudServicio solicitud) {
    try {
        SolicitudServicio nuevaSolicitud = solicitudService.crearSolicitud(solicitud);

        // Crear un DTO con solo los datos necesarios para evitar serialización del usuario completo
        Map<String, Object> response = new HashMap<>();
        response.put("id", nuevaSolicitud.getId());
        response.put("direccion", nuevaSolicitud.getDireccion());
        response.put("telefono", nuevaSolicitud.getTelefono());
        response.put("comentario", nuevaSolicitud.getComentario());
        response.put("fechaInicio", nuevaSolicitud.getFechaInicio());
        response.put("fechaFin", nuevaSolicitud.getFechaFin());
        response.put("servicioId", nuevaSolicitud.getServicio().getId());
        response.put("usuarioId", nuevaSolicitud.getUsuario().getId());

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno: " + e.getMessage());
    }
}


    // Obtener todas las solicitudes
    @GetMapping
    public ResponseEntity<List<SolicitudServicio>> obtenerTodasLasSolicitudes() {
        logger.info("Solicitud para obtener todas las solicitudes");
        try {
            List<SolicitudServicio> solicitudes = solicitudService.obtenerTodasLasSolicitudes();
            logger.info("Se obtuvieron {} solicitudes", solicitudes.size());
            return ResponseEntity.ok(solicitudes);
        } catch (Exception e) {
            logger.error("Error al obtener todas las solicitudes: {}", e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }

    // Obtener solicitudes por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<SolicitudServicio>> obtenerSolicitudesPorUsuario(@PathVariable Long idUsuario) {
        logger.info("Solicitud para obtener solicitudes del usuario con ID: {}", idUsuario);
        try {
            List<SolicitudServicio> solicitudes = solicitudService.obtenerSolicitudesPorUsuario(idUsuario);
            logger.info("Se obtuvieron {} solicitudes para el usuario con ID: {}", solicitudes.size(), idUsuario);
            return ResponseEntity.ok(solicitudes);
        } catch (Exception e) {
            logger.error("Error al obtener solicitudes para el usuario con ID {}: {}", idUsuario, e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }

    // Actualizar una solicitud
    @PutMapping("/{id}")
    public ResponseEntity<SolicitudServicio> actualizarSolicitud(@PathVariable Long id, @RequestBody SolicitudServicio solicitud) {
        logger.info("Solicitud para actualizar la solicitud con ID: {}", id);
        try {
            SolicitudServicio solicitudActualizada = solicitudService.actualizarSolicitud(id, solicitud);
            logger.info("Solicitud con ID: {} actualizada exitosamente", id);
            return ResponseEntity.ok(solicitudActualizada);
        } catch (Exception e) {
            logger.error("Error al actualizar la solicitud con ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }

    // Eliminar una solicitud
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSolicitud(@PathVariable Long id) {
        logger.info("Solicitud para eliminar la solicitud con ID: {}", id);
        try {
            solicitudService.eliminarSolicitud(id);
            logger.info("Solicitud con ID: {} eliminada exitosamente", id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error al eliminar la solicitud con ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }
}
