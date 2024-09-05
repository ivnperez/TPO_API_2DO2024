package com.tpo.ad_destapaciones.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.tpo.ad_destapaciones.entity.Role ;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;
    private Long id;
    private String email;
    private String usuario;
    private String nombre;
    private Role rol;
}

