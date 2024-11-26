package com.tpo.ad_destapaciones.auth;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tpo.ad_destapaciones.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (BadCredentialsException e) {
            // Manejo específico para el caso de usuario o correo duplicado
            System.out.println("Error de registro: " + e.getMessage()); 
            return ResponseEntity.badRequest().body(
                AuthenticationResponse.builder()
                    .message(e.getMessage())
                    .build()
            );
        } catch (DataIntegrityViolationException e) {
            System.out.println("Error de integridad de datos: " + e.getMessage());
            throw new BadCredentialsException("El registro ha fallado por una violación de integridad de datos", e);
        } catch (Exception e) {
            System.out.println("Error inesperado en el registro: " + e.getMessage());
            return ResponseEntity.status(500).body(
                AuthenticationResponse.builder()
                    .message("Error inesperado en el servidor")
                    .build()
            );
        }
    }
    

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    
    // Método para manejar las excepciones de BadCredentialsException globalmente
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials(BadCredentialsException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
