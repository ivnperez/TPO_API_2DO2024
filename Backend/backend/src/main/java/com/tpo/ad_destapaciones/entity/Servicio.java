package com.tpo.ad_destapaciones.entity;

// ESTA CLASE VENDRIA A SER EL EQUIVALENTE A PRODUCTO //

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Servicio {  
    public Servicio(String nombre, String descripcion, Blob imagen, Double precio, Float descuento, Tipo tipo, Integer stock ,Boolean flag_destacar) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.descuento = descuento;
        this.tipo = tipo;
        this.stock = stock;
        this.flag_destacar = flag_destacar;
    }  

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;

    @Column
    private String descripcion;

    @Column
    @JsonIgnore
    @Lob
    private Blob imagen;

    @Column
    private Double precio;

    @Column
    private Float descuento;

    @Column
    private Boolean flag_destacar = false;

    @Column
    private int stock;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_tipo", referencedColumnName = "id", nullable = false)
    private Tipo tipo;

    @JsonProperty("imagen")
    public String getImagenBytes() {
        if (this.imagen != null) {
            try {
                int blobLength = (int) imagen.length();
                byte[] blobBytes = imagen.getBytes(1, blobLength);
                return "data:image/jpeg;base64,"+ Base64.getEncoder().encodeToString(blobBytes);
                //return Base64.getEncoder().encodeToString(blobBytes);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public Double getPrecioDescuento() {
        if (descuento == 0 || descuento == null) {
            return this.precio;
        } else {
            return this.precio - ((this.precio * this.descuento) / 100);
        }
    }
}