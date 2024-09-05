package com.tpo.ad_destapaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tpo.ad_destapaciones.entity.Tipo;

@Repository
public interface TipoRepository extends JpaRepository<Tipo,Long>{

}
