package com.tpo.ad_destapaciones.interfaces;

import java.sql.Blob;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.tpo.ad_destapaciones.entity.Servicio;
import com.tpo.ad_destapaciones.entity.Tipo;
import com.tpo.ad_destapaciones.exception.ServicioDuplicadoException;

public interface ServicioInterface {
    public Page<Servicio> getServicios(PageRequest pageRequest);
    public List<Servicio> getServicioByNombre(String servicioName);
    public Optional<Servicio> getServicioById(Long servicioId);
    public Servicio createServicio(String nombre,String descripcion,Blob imagen,Double precio,Float descuento,Long id_tipo,Integer stock, Boolean flag_destacar) throws ServicioDuplicadoException;
    public void eliminarServicio(Long id);
    public Servicio modificarServicio(Servicio modificacion);
    public List<Servicio> getServiciosDestacados();
    void modificarStock(Long idServicio, int cantidad);
    public List<Tipo> getTipo();
    public Optional<Tipo> getTipoByID(Long tipoID);
    List<Servicio> getServiciosByTipo(Long tipoId);
}
