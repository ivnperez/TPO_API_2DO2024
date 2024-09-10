package com.tpo.ad_destapaciones.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.User;
import com.tpo.ad_destapaciones.entity.Venta;
import com.tpo.ad_destapaciones.entity.VentaDetalle;
import com.tpo.ad_destapaciones.entity.dto.VentaDTO;
import com.tpo.ad_destapaciones.entity.dto.VentaDetalleDTO;
import com.tpo.ad_destapaciones.interfaces.VentaInterface;
import com.tpo.ad_destapaciones.repository.UserRepository;
import com.tpo.ad_destapaciones.repository.VentaRepository;

@Service
public class VentaService implements VentaInterface {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServicioService servicioService;

    public List<Venta> findAll() {
        return ventaRepository.findAll();
    }

    public Optional<Venta> findById(Long id) {
        return ventaRepository.findById(id);
    }

    public List<Venta> findByIdUser(Long idCliente) {
        Optional<User> user = userRepository.findById(idCliente);
        if (user.isPresent()) {
            return ventaRepository.findByUser(user.get());  // Aquí se pasa el objeto User en lugar del ID
        } else {
            throw new IllegalArgumentException("El usuario con el ID proporcionado no existe.");
        }
    }
    public Venta save(VentaDTO ventaDTO) throws Exception {
        Venta venta = null;
        boolean ventaOk = true;

        Optional<User> userOptional = userRepository.findById(ventaDTO.getId_user());
        if (userOptional.isPresent()) {
            venta = new Venta();
            venta.setUser(userOptional.get());
            double subTotal = 0;
            double total = 0;
            for (VentaDetalleDTO detalleDTO : ventaDTO.getDetalles()) {
                Optional<Servicio> servicioOptional = servicioService.getServicioById(detalleDTO.getId_servicio());
                if (servicioOptional.isPresent()) {
                    Servicio servicio = servicioOptional.get();
                    if (servicio.getStock() >= detalleDTO.getCantidad()) {
                        VentaDetalle detalle = new VentaDetalle(detalleDTO.getCantidad());
                        detalle.setDescuento(servicio.getDescuento());
                        detalle.setServicio(servicio);
                        detalle.setVenta(venta);
                        venta.getDetalle().add(detalle);

                        // Calcular subtotal y total para cada producto y multiplicar por la cantidad
                        double precioTotalServicio = servicio.getPrecio() * detalleDTO.getCantidad();
                        double precioTotalServicioDescuento = servicio.getPrecioDescuento() * detalleDTO.getCantidad();

                        subTotal += precioTotalServicio;
                        total += precioTotalServicioDescuento;
                        
                    } else {
                        throw new Exception("No hay disponibilidad para el servicio: " + servicio.getNombre());
                    }
                } else {
                    throw new Exception("Servicio no encontrado: " + detalleDTO.getId_servicio());
                }
            }

            if (ventaOk) {
                for (VentaDetalleDTO detalleDTO : ventaDTO.getDetalles()) {
                    servicioService.modificarStock(detalleDTO.getId_servicio(), detalleDTO.getCantidad());
                }
                venta.setSubTotal(subTotal);
                venta.setTotal(total);
                venta = ventaRepository.save(venta);
            }
        }
        return venta;
    }
}