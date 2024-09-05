package com.tpo.ad_destapaciones.entity;

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
public class Edificio {  

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String direccion;

    @Column
    private int cuit;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "administrador", referencedColumnName = "id", nullable = false)
    private Administrador administrador;

    @Column
    @JsonIgnore
    @Lob
    private Blob imagen;

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
}