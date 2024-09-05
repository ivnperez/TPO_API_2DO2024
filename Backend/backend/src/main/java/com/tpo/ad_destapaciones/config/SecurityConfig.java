package com.tpo.ad_destapaciones.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tpo.ad_destapaciones.entity.Role;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(req ->
                req
                    .requestMatchers("/api/v1/auth/**").permitAll()
                    .requestMatchers("/abm/**").hasAnyAuthority(Role.ADMIN.name())
                    .requestMatchers("/catalogo/**").permitAll()
                    .requestMatchers("/ventas/**").permitAll()
                    /* 
                    .requestMatchers("/error/**").permitAll()
                    // Requiere el rol USER para todas las solicitudes a /catalogo/**
                    .requestMatchers("/catalogo/**").hasAnyAuthority(Role.ADMIN.name(),Role.USER.name())
                    .requestMatchers("/abm/**").hasAnyAuthority(Role.ADMIN.name())
                    // Requiere el rol ADMIN para todas las solicitudes a /usuarios/**
                    .requestMatchers("/usuarios/**").hasAnyAuthority(Role.ADMIN.name())
                    .requestMatchers("/newUsuarios/**").hasAnyAuthority(Role.ADMIN.name(),Role.USER.name())
                    // Requiere el rol ADMIN para todas las solicitudes a /ventas/**
                    .requestMatchers("/ventas/**").hasAnyAuthority(Role.ADMIN.name(),Role.USER.name())
                    // Todas las demás solicitudes requieren autenticación
                    */
                    //.anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
