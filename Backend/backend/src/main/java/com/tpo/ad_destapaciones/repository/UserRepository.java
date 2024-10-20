package com.tpo.ad_destapaciones.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tpo.ad_destapaciones.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);   
    boolean existsByEmail(String email);
    boolean existsByUsuario(String usuario); 
}
