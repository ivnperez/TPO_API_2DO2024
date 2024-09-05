package com.tpo.ad_destapaciones.interfaces;

import com.tpo.ad_destapaciones.entity.Venta;
import com.tpo.ad_destapaciones.entity.dto.VentaDTO;

import java.util.List;
import java.util.Optional;

public interface VentaInterface {
    public List<Venta> findAll();

    public Optional<Venta> findById(Long id);

    public List<Venta> findByIdUser(Long clienteId);
    
    public Venta save(VentaDTO venta) throws Exception;
}
