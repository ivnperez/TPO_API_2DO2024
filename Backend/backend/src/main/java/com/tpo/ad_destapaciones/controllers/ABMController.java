package com.tpo.ad_destapaciones.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Blob;
import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.Tipo;
import com.tpo.ad_destapaciones.entity.dto.ServicioDTO;
import com.tpo.ad_destapaciones.exception.ServicioDuplicadoException;
import com.tpo.ad_destapaciones.interfaces.ServicioInterface;
import com.tpo.ad_destapaciones.repository.TipoRepository;

@RestController
public class ABMController {
    @Autowired
    private ServicioInterface servicioService;

    @Autowired
    private TipoRepository tipoRepository;

    @PostMapping(value = "/ABM", consumes = "multipart/form-data")
    public ResponseEntity<Object> createProducto(@ModelAttribute ServicioDTO serviciodto) {
        System.out.println("Datos recibidos: " + serviciodto);
        try {
            Servicio result = servicioService.createServicio(
                serviciodto.getNombre(),
                serviciodto.getDescripcion(),
                serviciodto.getImagen(),
                serviciodto.getPrecio(),
                serviciodto.getDescuento(),
                serviciodto.getTipo(),
                serviciodto.getStock(),
                serviciodto.getFlag_destacar()
            );
            return ResponseEntity.created(URI.create("/catalogo/" + result.getId())).body(result);
        } catch (ServicioDuplicadoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\":\"Servicio duplicado\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"Error interno del servidor\"}");
        }
    }
    
    
    @DeleteMapping("/ABM/{servicioId}")
    public ResponseEntity<Servicio> deleteServicio(@PathVariable Long servicioId){
        Optional<Servicio>result=servicioService.getServicioById(servicioId);
        if(result.isPresent()){
            servicioService.eliminarServicio(servicioId);
            return ResponseEntity.ok(result.get());
        }
        else{
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping(value = "/ABM/{servicioId}", consumes = "multipart/form-data")
    public ResponseEntity<Servicio> modificarServicio(@PathVariable Long servicioId, @ModelAttribute ServicioDTO modificacion) {
        Optional<Servicio> result = servicioService.getServicioById(servicioId);
        if (result.isPresent()) {
            Optional<Tipo> consulta = tipoRepository.findById(modificacion.getTipo());
            if (consulta.isPresent()) {
                Tipo tipo = consulta.get();
                Servicio servicioExistente = result.get();
                servicioExistente.setNombre(modificacion.getNombre());
                servicioExistente.setDescripcion(modificacion.getDescripcion());
                servicioExistente.setPrecio(modificacion.getPrecio());
                servicioExistente.setDescuento(modificacion.getDescuento());
                servicioExistente.setTipo(tipo);
                servicioExistente.setStock(modificacion.getStock());
                servicioExistente.setFlag_destacar(modificacion.getFlag_destacar());
    
                // Solo actualizar la imagen si se proporciona una nueva
                Blob nuevaImagen = modificacion.getImagen();
                if (nuevaImagen != null) {
                    servicioExistente.setImagen(nuevaImagen);
                }
    
                Servicio servicioActualizado = servicioService.modificarServicio(servicioExistente);
                return ResponseEntity.ok(servicioActualizado);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
