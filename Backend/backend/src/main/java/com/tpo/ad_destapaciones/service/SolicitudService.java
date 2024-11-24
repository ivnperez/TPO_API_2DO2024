package com.tpo.ad_destapaciones.service;

import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.SolicitudServicio;
import com.tpo.ad_destapaciones.repository.ServicioRepository;
import com.tpo.ad_destapaciones.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    public SolicitudServicio crearSolicitud(SolicitudServicio solicitud) {
        // Busca el servicio por ID
        Servicio servicio = servicioRepository.findById(solicitud.getServicio().getId())
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado con ID: " + solicitud.getServicio().getId()));

        // Asigna la entidad Servicio a la solicitud
        solicitud.setServicio(servicio);

        // Guarda la solicitud en la base de datos
        return solicitudRepository.save(solicitud);
    }
    public List<SolicitudServicio> obtenerTodasLasSolicitudes() {
        return solicitudRepository.findAll();
    }

    public List<SolicitudServicio> obtenerSolicitudesPorUsuario(Long idUsuario) {
        return solicitudRepository.findByUsuarioId(idUsuario);
    }

    public SolicitudServicio actualizarSolicitud(Long id, SolicitudServicio solicitudActualizada) {
        Optional<SolicitudServicio> solicitudExistente = solicitudRepository.findById(id);
        if (solicitudExistente.isPresent()) {
            SolicitudServicio solicitud = solicitudExistente.get();
            solicitud.setDireccion(solicitudActualizada.getDireccion());
            solicitud.setTelefono(solicitudActualizada.getTelefono());
            solicitud.setComentario(solicitudActualizada.getComentario());
            solicitud.setFechaInicio(solicitudActualizada.getFechaInicio());
            solicitud.setFechaFin(solicitudActualizada.getFechaFin());
            return solicitudRepository.save(solicitud);
        }
        throw new RuntimeException("Solicitud no encontrada");
    }

    public void eliminarSolicitud(Long id) {
        solicitudRepository.deleteById(id);
    }
}

