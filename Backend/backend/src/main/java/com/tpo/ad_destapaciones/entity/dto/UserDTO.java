package com.tpo.ad_destapaciones.entity.dto;

import com.tpo.ad_destapaciones.entity.Role;
import lombok.Data;

@Data

public class UserDTO {
    private Long idUser;
    private String nombre;
    private String apellido;
    private String movil;
    private String telefono;
    private String email;
    private String usuario;
    private String password;
    private Role role;
}
