package com.tpo.ad_destapaciones.auth;

import com.tpo.ad_destapaciones.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String nombre;
    private String apellido;
    private String movil;
    private String telefono;
    private String email;
    private String usuario;
    private String password;
    private Role role;
}