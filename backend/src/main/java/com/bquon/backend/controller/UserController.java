package com.bquon.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bquon.backend.model.User;
import com.bquon.backend.service.UserService;
import com.bquon.backend.utils.PasswordUtil;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        PasswordUtil bcypter = new PasswordUtil();
        user.setPassword(bcypter.encryptPassword(user.getPassword()));
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        PasswordUtil bcypter = new PasswordUtil();
        User selectedUser = userService.getUserByUsername(user.getUsername());
        if (bcypter.checkPasswordValidity(user.getPassword(), selectedUser.getPassword())) {
            return selectedUser;
        } else {
            return null;
        }
    }
}
