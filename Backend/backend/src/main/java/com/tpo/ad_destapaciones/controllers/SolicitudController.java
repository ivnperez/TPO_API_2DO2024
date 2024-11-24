package com.tpo.ad_destapaciones.controllers;

import com.tpo.ad_destapaciones.entity.dto.SolicitudServicioDTO;
import com.tpo.ad_destapaciones.service.SolicitudService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<SolicitudServicioDTO> crearSolicitud(@RequestBody SolicitudServicioDTO solicitudDTO) {
        try {
            SolicitudServicioDTO nuevaSolicitudDTO = solicitudService.crearSolicitud(solicitudDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaSolicitudDTO);
        } catch (Exception e) {
            logger.error("Error al crear solicitud: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Obtener todas las solicitudes
    @GetMapping
    public ResponseEntity<List<SolicitudServicioDTO>> obtenerTodasLasSolicitudes() {
        logger.info("Solicitud para obtener todas las solicitudes");
        try {
            List<SolicitudServicioDTO> solicitudesDTO = solicitudService.obtenerTodasLasSolicitudes();
            logger.info("Se obtuvieron {} solicitudes", solicitudesDTO.size());
            return ResponseEntity.ok(solicitudesDTO);
        } catch (Exception e) {
            logger.error("Error al obtener todas las solicitudes: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Obtener solicitudes por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<SolicitudServicioDTO>> obtenerSolicitudesPorUsuario(@PathVariable Long idUsuario) {
        logger.info("Solicitud para obtener solicitudes del usuario con ID: {}", idUsuario);
        try {
            List<SolicitudServicioDTO> solicitudes = solicitudService.obtenerSolicitudesPorUsuario(idUsuario);
            logger.info("Se obtuvieron {} solicitudes para el usuario con ID: {}", solicitudes.size(), idUsuario);
            return ResponseEntity.ok(solicitudes);
        } catch (Exception e) {
            logger.error("Error al obtener solicitudes para el usuario con ID {}: {}", idUsuario, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Actualizar una solicitud
    @PutMapping("/{id}")
    public ResponseEntity<SolicitudServicioDTO> actualizarSolicitud(@PathVariable Long id, @RequestBody SolicitudServicioDTO solicitudDTO) {
        logger.info("Solicitud para actualizar la solicitud con ID: {}", id);
        try {
            SolicitudServicioDTO solicitudActualizadaDTO = solicitudService.actualizarSolicitud(id, solicitudDTO);
            logger.info("Solicitud con ID: {} actualizada exitosamente", id);
            return ResponseEntity.ok(solicitudActualizadaDTO);
        } catch (Exception e) {
            logger.error("Error al actualizar la solicitud con ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
