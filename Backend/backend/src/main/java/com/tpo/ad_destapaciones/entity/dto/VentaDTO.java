package com.tpo.ad_destapaciones.entity.dto;

import java.util.List;


public class VentaDTO {
    private Long id_user;
    private List<VentaDetalleDTO> detalles;

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
    }

    public List<VentaDetalleDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<VentaDetalleDTO> detalles) {
        this.detalles = detalles;
    }
}