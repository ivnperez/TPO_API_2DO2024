package com.tpo.ad_destapaciones.repository;

import com.tpo.ad_destapaciones.entity.Venta;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
    @Query(value = "SELECT v FROM Venta v WHERE v.user = ?1")
    List<Venta> findByIdUser(Long user);
}