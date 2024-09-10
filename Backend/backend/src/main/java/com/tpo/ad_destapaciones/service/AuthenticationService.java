package com.tpo.ad_destapaciones.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tpo.ad_destapaciones.auth.AuthenticationRequest;
import com.tpo.ad_destapaciones.auth.AuthenticationResponse;
import com.tpo.ad_destapaciones.auth.RegisterRequest;
import com.tpo.ad_destapaciones.config.JwtService;
import com.tpo.ad_destapaciones.entity.User;
import com.tpo.ad_destapaciones.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // Validar si el correo ya está registrado
        if (repository.existsByEmail(request.getEmail())) {
            throw new BadCredentialsException("El correo electrónico ya está registrado");
        }

        // Crear un nuevo usuario
        var user = User.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())  
                .movil(request.getMovil())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .usuario(request.getUsuario())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        // Guardar el usuario en la base de datos
        repository.save(user);

        // Generar el token JWT
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .id(user.getId())
                .email(user.getEmail())
                .usuario(user.getUsername())
                .nombre(user.getNombre())
                .rol(user.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .id(user.getId())
                .email(user.getEmail())
                .usuario(user.getUsuario())
                .nombre(user.getNombre())
                .rol(user.getRole())
                .build();
    }
}
