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

    // Crea una nueva solicitud
    public SolicitudServicioDTO crearSolicitud(SolicitudServicioDTO solicitudDTO) throws Exception {
        // Busca usuario por ID
        User usuario = userRepository.findById(solicitudDTO.getUsuarioId())
                .orElseThrow(() -> new Exception("Usuario no encontrado"));
    
        // Busca servicio por ID
        Servicio servicio = servicioRepository.findById(solicitudDTO.getServicioId())
                .orElseThrow(() -> new Exception("Servicio no encontrado"));
    
        // Crea la entidad SolicitudServicio a partir del DTO
        SolicitudServicio solicitud = SolicitudServicio.builder()
                .usuario(usuario)
                .servicio(servicio)
                .direccion(solicitudDTO.getDireccion())
                .telefono(solicitudDTO.getTelefono())
                .comentario(solicitudDTO.getComentario())
                .fechaInicio(solicitudDTO.getFechaInicio())
                .fechaFin(solicitudDTO.getFechaFin())
                .build();
    
        // Guarda la solicitud en la base de datos
        SolicitudServicio solicitudGuardada = solicitudRepository.save(solicitud);
    
        // Retorna como DTO
        return new SolicitudServicioDTO(solicitudGuardada);
    }
    

    // Obtiene todas las solicitudes
    public List<SolicitudServicioDTO> obtenerTodasLasSolicitudes() {
        List<SolicitudServicio> solicitudes = solicitudRepository.findAll();
        return solicitudes.stream()
                .map(SolicitudServicioDTO::new)
                .collect(Collectors.toList());
    }

    // Obtiene solicitudes por usuario
    public List<SolicitudServicioDTO> obtenerSolicitudesPorUsuario(Long idUsuario) {
        List<SolicitudServicio> solicitudes = solicitudRepository.findByUsuarioId(idUsuario);
        return solicitudes.stream()
                .map(SolicitudServicioDTO::new)
                .collect(Collectors.toList());
    }

    // Actualiza una solicitud desde un DTO
    public SolicitudServicioDTO actualizarSolicitud(Long id, SolicitudServicioDTO solicitudDTO) throws Exception {
        Optional<SolicitudServicio> solicitudExistente = solicitudRepository.findById(id);
        if (solicitudExistente.isPresent()) {
            SolicitudServicio solicitudActualizada = solicitudExistente.get();

            solicitudActualizada.setDireccion(solicitudDTO.getDireccion());
            solicitudActualizada.setTelefono(solicitudDTO.getTelefono());
            solicitudActualizada.setComentario(solicitudDTO.getComentario());
            solicitudActualizada.setFechaInicio(solicitudDTO.getFechaInicio());
            solicitudActualizada.setFechaFin(solicitudDTO.getFechaFin());

            // Obtiene y asigna el servicio desde el repositorio
            Servicio servicio = servicioRepository.findById(solicitudDTO.getServicioId())
                    .orElseThrow(() -> new Exception("Servicio con ID " + solicitudDTO.getServicioId() + " no encontrado"));
            solicitudActualizada.setServicio(servicio);

            // Obtiene y asigna el usuario desde el repositorio
            User user = userRepository.findById(solicitudDTO.getUsuarioId())
                    .orElseThrow(() -> new Exception("Usuario con ID " + solicitudDTO.getUsuarioId() + " no encontrado"));
            solicitudActualizada.setUsuario(user);

            SolicitudServicio solicitudGuardada = solicitudRepository.save(solicitudActualizada);
            return new SolicitudServicioDTO(solicitudGuardada);
        } else {
            throw new Exception("Solicitud con ID " + id + " no encontrada");
        }
    }

    // Elimina una solicitud
    public void eliminarSolicitud(Long id) throws Exception {
        Optional<SolicitudServicio> solicitud = solicitudRepository.findById(id);
        if (solicitud.isPresent()) {
            solicitudRepository.deleteById(id);
        } else {
            throw new Exception("Solicitud con ID " + id + " no encontrada");
        }
    }
}
