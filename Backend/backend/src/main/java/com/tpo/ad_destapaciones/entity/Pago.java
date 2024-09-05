package com.tpo.ad_destapaciones.entity;

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
public class Pago {  

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String mes; // Buscar formato dd/mm/yyyy

    @Column
    private int numero;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "edificio", referencedColumnName = "id", nullable = false)
    private Edificio edificio;

    @Column
    private int importe_total; // Buscar formato peso arg

    @Column
    private String recibo; // Buscar formato dd/mm/yyyy

    @Column
    private boolean pago; // 0 no pago,1 si pago 
}