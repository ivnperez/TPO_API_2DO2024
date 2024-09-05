package com.tpo.ad_destapaciones.service;

import org.springframework.dao.DataIntegrityViolationException;
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
                var user = User.builder()
                                .nombre(request.getNombre())
                                .telefono(request.getTelefono())
                                .email(request.getEmail())
                                .usuario(request.getUsuario()) //Vendria a ser el login
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole())
                                .build();
                                try {
                                        repository.save(user);
                                    } catch (DataIntegrityViolationException e) {
                                        throw new BadCredentialsException("El correo electrónico ya está registrado");
                                    }
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

                var user = repository.findBymail(request.getEmail())
                                .orElseThrow();
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
