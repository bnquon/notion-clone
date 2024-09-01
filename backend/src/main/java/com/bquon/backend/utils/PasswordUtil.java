package com.bquon.backend.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class PasswordUtil {
    
    public String encryptPassword(String unencryptedPassword) {
        return BCrypt.hashpw(unencryptedPassword, BCrypt.gensalt(10));
    }

    public Boolean checkPasswordValidity(String unencryptedPassword, String encryptedPassword) {
        return BCrypt.checkpw(unencryptedPassword, encryptedPassword);
    }
}
