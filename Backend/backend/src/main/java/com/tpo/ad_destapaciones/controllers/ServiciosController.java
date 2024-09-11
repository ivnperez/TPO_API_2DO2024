package com.tpo.ad_destapaciones.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.Tipo;
import com.tpo.ad_destapaciones.interfaces.ServicioInterface;
import com.tpo.ad_destapaciones.repository.TipoRepository;

@RestController
public class ServiciosController {
    @Autowired
    private ServicioInterface servicioService;

    @Autowired
    private TipoRepository tipoRepository;

    @GetMapping("/catalogo")
    public ResponseEntity<Page<Servicio>> getServicios(
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(servicioService.getServicios(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(servicioService.getServicios(PageRequest.of(page, size)));
    }

    @GetMapping("/catalogo/{servicioId}")
    public ResponseEntity<Servicio> getServicioById(@PathVariable Long servicioId) {
        Optional<Servicio> result = servicioService.getServicioById(servicioId);
        if (result.isPresent())
            return ResponseEntity.ok().body(result.get());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/catalogo/nombre/{servicioNombre}")
    public ResponseEntity<List<Servicio>> getServiciosByNombre(@PathVariable String servicioNombre) {
        List<Servicio> result = servicioService.getServicioByNombre(servicioNombre);
        if (result.size() > 0)
            return ResponseEntity.ok(result);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/catalogo/tipo")
    public ResponseEntity<List<Tipo>> getTipo() {
        List<Tipo> result =  servicioService.getTipo();
        if (result.size() > 0)
            return ResponseEntity.ok(result);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/catalogo/tipo/{tipoID}")
    public ResponseEntity<Tipo> getTipoByID(@PathVariable Long tipoID) {
        Optional<Tipo> result = tipoRepository.findById(tipoID);
        if (result.isPresent())
            return ResponseEntity.ok().body(result.get());
            
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/catalogo/filtro")
public ResponseEntity<List<Servicio>> getServiciosFiltrados(
    @RequestParam(required = false) Long tipoId) {

    List<Servicio> servicios;
    if (tipoId != null) {
        servicios = servicioService.getServiciosByTipo(tipoId);
    } else {
        servicios = servicioService.getServicios(PageRequest.of(0, Integer.MAX_VALUE)).getContent();
    }

    if (servicios.size() > 0)
        return ResponseEntity.ok(servicios);

    return ResponseEntity.noContent().build();
}

}
