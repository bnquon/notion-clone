package com.bquon.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.bquon.backend.model.User;
import com.bquon.backend.respository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
