package com.tpo.ad_destapaciones.service;

import java.sql.Blob;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.Tipo;
import com.tpo.ad_destapaciones.exception.ServicioDuplicadoException;
import com.tpo.ad_destapaciones.interfaces.ServicioInterface;
import com.tpo.ad_destapaciones.repository.ServicioRepository;
import com.tpo.ad_destapaciones.repository.TipoRepository;

@Service
public class ServicioService implements ServicioInterface {
    
    @Autowired
    private ServicioRepository servicioRepository;
    @Autowired
    private TipoRepository tipoRepository;

    public Page<Servicio> getServicios(PageRequest pageRequest){
        return servicioRepository.findAll(pageRequest);
    }
    public List<Servicio> getServicioByNombre(String servicioName){
        return servicioRepository.findLikeName(servicioName);
    }
    public Optional<Servicio> getServicioById(Long servicioId){
        return servicioRepository.findById(servicioId);
    }
    //Evite los datos que dependen de las relaciones Genero,Tipo
    public Servicio createServicio(String nombre,String descripcion,Blob imagen,Double precio,Float descuento,Long id_tipo,Integer stock, Boolean flag_destacar) throws ServicioDuplicadoException{
        List<Servicio> servicios = servicioRepository.findByName(nombre);
        Optional<Tipo> consulta = tipoRepository.findById(id_tipo);
        if (servicios.isEmpty() && consulta.isPresent()){
            Tipo tipo = consulta.get();
            return servicioRepository.save(new Servicio(nombre,descripcion,imagen,precio,descuento,tipo,stock, flag_destacar));
        }
        throw new ServicioDuplicadoException();
    }

    public void eliminarServicio(Long id){
        servicioRepository.deleteById(id);
    }

    public Servicio modificarServicio(Servicio modificacion){
        return servicioRepository.save(modificacion);
    }

    public List<Servicio> getServiciosDestacados(){
        return servicioRepository.findDestacados();
    }

    public void modificarStock(Long idServicio, int cantidad) {
        servicioRepository.modificarStock(idServicio, cantidad);
    }

    public List<Tipo> getTipo() {
        return tipoRepository.findAll();
    }

    public Optional<Tipo> getTipoByID(Long tipoID) {
        return tipoRepository.findById(tipoID);
    }
    
    public List<Servicio> getServiciosByTipo(Long tipoId) {
        return servicioRepository.findByTipoId(tipoId);
    }
    
}
