package com.tpo.ad_destapaciones.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudServicioDTO {
    private Long id;
    private String direccion;
    private String telefono;
    private String comentario;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Long usuarioId;
    private String usuarioNombre;
    private Long servicioId;
    private String servicioNombre;

    public SolicitudServicioDTO(com.tpo.ad_destapaciones.entity.SolicitudServicio solicitud) {
        this.id = solicitud.getId();
        this.direccion = solicitud.getDireccion();
        this.telefono = solicitud.getTelefono();
        this.comentario = solicitud.getComentario();
        this.fechaInicio = solicitud.getFechaInicio();
        this.fechaFin = solicitud.getFechaFin();
        if (solicitud.getUsuario() != null) {
            this.usuarioId = solicitud.getUsuario().getId();
            this.usuarioNombre = solicitud.getUsuario().getNombre();
        }
        if (solicitud.getServicio() != null) {
            this.servicioId = solicitud.getServicio().getId();
            this.servicioNombre = solicitud.getServicio().getNombre();
        }
    }
}
