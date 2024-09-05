package com.tpo.ad_destapaciones.entity.dto;

public class VentaDetalleDTO {
    private Long id_servicio;
    private int cantidad;

    public Long getId_servicio() {
        return id_servicio;
    }

    public void setId_servicio(Long id_servicio) {
        this.id_servicio = id_servicio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
