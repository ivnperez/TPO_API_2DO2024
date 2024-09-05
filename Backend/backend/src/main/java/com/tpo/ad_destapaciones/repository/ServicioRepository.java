package com.tpo.ad_destapaciones.repository;

import com.tpo.ad_destapaciones.entity.Servicio;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    @Query("select s from Servicio s where s.nombre = :nombre")
    List<Servicio> findByName(String nombre);

    @Query("SELECT s FROM Servicio s WHERE s.nombre LIKE %:nombre%")
    List<Servicio> findLikeName(String nombre);

    @Query("SELECT s FROM Servicio s WHERE s.flag_destacar = true")
    List<Servicio> findDestacados();

    @Query("SELECT s FROM Servicio s WHERE s.tipo.id = :tipoId")
    List<Servicio> findByTipoId(@Param("tipoId") Long tipoId);

    
    @Modifying
    @Transactional
    @Query("UPDATE Servicio s SET s.stock = s.stock - :cantidad WHERE s.id = :idServicio")
    int modificarStock(@Param("idServicio") Long idServicio, @Param("cantidad") int cantidad);

}