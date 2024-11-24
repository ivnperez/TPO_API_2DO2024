package com.tpo.ad_destapaciones.service;

import com.tpo.ad_destapaciones.entity.SolicitudServicio;
import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.User;
import com.tpo.ad_destapaciones.entity.dto.SolicitudServicioDTO;
import com.tpo.ad_destapaciones.repository.ServicioRepository;
import com.tpo.ad_destapaciones.repository.SolicitudRepository;
import com.tpo.ad_destapaciones.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private UserRepository userRepository;

    // Crear una nueva solicitud
    public SolicitudServicioDTO crearSolicitud(SolicitudServicioDTO solicitudDTO) throws Exception {
        SolicitudServicio solicitud = new SolicitudServicio();

        solicitud.setDireccion(solicitudDTO.getDireccion());
        solicitud.setTelefono(solicitudDTO.getTelefono());
        solicitud.setComentario(solicitudDTO.getComentario());
        solicitud.setFechaInicio(solicitudDTO.getFechaInicio());
        solicitud.setFechaFin(solicitudDTO.getFechaFin());

        // Obtener y asignar el servicio desde el repositorio
        Servicio servicio = servicioRepository.findById(solicitudDTO.getServicioId())
                .orElseThrow(() -> new Exception("Servicio con ID " + solicitudDTO.getServicioId() + " no encontrado"));
        solicitud.setServicio(servicio);

        // Obtener y asignar el usuario desde el repositorio
        User user = userRepository.findById(solicitudDTO.getUsuarioId())
                .orElseThrow(() -> new Exception("Usuario con ID " + solicitudDTO.getUsuarioId() + " no encontrado"));
        solicitud.setUsuario(user);

        SolicitudServicio solicitudGuardada = solicitudRepository.save(solicitud);

        return new SolicitudServicioDTO(solicitudGuardada);
    }

    // Obtener todas las solicitudes
    public List<SolicitudServicioDTO> obtenerTodasLasSolicitudes() {
        List<SolicitudServicio> solicitudes = solicitudRepository.findAll();
        return solicitudes.stream()
                .map(SolicitudServicioDTO::new)
                .collect(Collectors.toList());
    }

    // Obtener solicitudes por usuario
    public List<SolicitudServicioDTO> obtenerSolicitudesPorUsuario(Long idUsuario) {
        List<SolicitudServicio> solicitudes = solicitudRepository.findByUsuarioId(idUsuario);
        return solicitudes.stream()
                .map(SolicitudServicioDTO::new)
                .collect(Collectors.toList());
    }

    // Actualizar una solicitud desde un DTO
    public SolicitudServicioDTO actualizarSolicitud(Long id, SolicitudServicioDTO solicitudDTO) throws Exception {
        Optional<SolicitudServicio> solicitudExistente = solicitudRepository.findById(id);
        if (solicitudExistente.isPresent()) {
            SolicitudServicio solicitudActualizada = solicitudExistente.get();

            solicitudActualizada.setDireccion(solicitudDTO.getDireccion());
            solicitudActualizada.setTelefono(solicitudDTO.getTelefono());
            solicitudActualizada.setComentario(solicitudDTO.getComentario());
            solicitudActualizada.setFechaInicio(solicitudDTO.getFechaInicio());
            solicitudActualizada.setFechaFin(solicitudDTO.getFechaFin());

            // Obtener y asignar el servicio desde el repositorio
            Servicio servicio = servicioRepository.findById(solicitudDTO.getServicioId())
                    .orElseThrow(() -> new Exception("Servicio con ID " + solicitudDTO.getServicioId() + " no encontrado"));
            solicitudActualizada.setServicio(servicio);

            // Obtener y asignar el usuario desde el repositorio
            User user = userRepository.findById(solicitudDTO.getUsuarioId())
                    .orElseThrow(() -> new Exception("Usuario con ID " + solicitudDTO.getUsuarioId() + " no encontrado"));
            solicitudActualizada.setUsuario(user);

            SolicitudServicio solicitudGuardada = solicitudRepository.save(solicitudActualizada);
            return new SolicitudServicioDTO(solicitudGuardada);
        } else {
            throw new Exception("Solicitud con ID " + id + " no encontrada");
        }
    }

    // Eliminar una solicitud
    public void eliminarSolicitud(Long id) throws Exception {
        Optional<SolicitudServicio> solicitud = solicitudRepository.findById(id);
        if (solicitud.isPresent()) {
            solicitudRepository.deleteById(id);
        } else {
            throw new Exception("Solicitud con ID " + id + " no encontrada");
        }
    }
}
