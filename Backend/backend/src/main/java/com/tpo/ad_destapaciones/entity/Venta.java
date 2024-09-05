package com.tpo.ad_destapaciones.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "Venta")
public class Venta {
    public Venta(){
        this.fecha_pedido = LocalDate.now();
        this.detalle = new ArrayList<>();
        this.subTotal = 0.00;
        this.total = 0.00;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @Column
    private LocalDate fecha_pedido;

    @Column
    private Double subTotal;

    @Column
    private Double total;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<VentaDetalle> detalle;


    public void addSubTotal(Double subTotal){
        this.subTotal += subTotal;
    }

    public void addTotal(Double total){
        this.total += total;
    }

}
