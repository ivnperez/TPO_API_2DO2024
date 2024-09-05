package com.tpo.ad_destapaciones.interfaces;

import com.tpo.ad_destapaciones.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserInterface {
    public List<User> findAll();

    public Optional<User> findById(Long id);

    User save(User user);
    
    void deleteById(Long id);
}
