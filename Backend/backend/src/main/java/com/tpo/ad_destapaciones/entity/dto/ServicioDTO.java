package com.tpo.ad_destapaciones.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicioDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private MultipartFile imagen;
    private Double precio;
    private Float descuento;
    private Boolean flag_destacar;
    private Long tipo;
    private Integer stock;

    public Blob getImagen() {
        try {   
            byte[] bytes = imagen.getBytes();
            Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);
            return blob;
        } catch (IOException | SQLException e) {
            return null;
        }
    }
}