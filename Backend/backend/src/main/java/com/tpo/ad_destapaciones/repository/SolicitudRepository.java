package com.tpo.ad_destapaciones.repository;

import com.tpo.ad_destapaciones.entity.SolicitudServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<SolicitudServicio, Long> {
    List<SolicitudServicio> findByUsuarioId(Long idUsuario);
}
