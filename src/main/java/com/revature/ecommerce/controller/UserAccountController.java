package com.revature.ecommerce.controller;

import org.springframework.web.bind.annotation.RestController;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;
import com.revature.ecommerce.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

//This controller handles everything that has to do with users (except their shopping cart, which is handled in its own controller).
//This means registering/logging in users, as well as handling session tokens.
@RestController
@RequestMapping("/api/users")
public class UserAccountController {
    UserService userService;

    public UserAccountController(UserService userService) {
        this.userService = userService;
    }

    //Create an account
    // Returns HTTP 200 if the account can be created
    // Returns HTTP 409 if the username matches one that already exists
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestHeader String username, @RequestHeader String password) {
        return userService.registerUser(username, password);
    }

    //Log in a user
    // Returns HTTP 200 and a session token if the login was successful
    // Returns HTTP 403 if the password was incorrect (or does not match any user)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestHeader String username, @RequestHeader String password) {
        return userService.loginUser(username, password);
    }
    
    //Attempt to refresh a user's token
    @PostMapping("/refreshToken")
    public ResponseEntity<String> refreshToken(@RequestHeader String token) throws SessionTokenInvalidException {
        return ResponseEntity.status(200).body(userService.refreshToken(token));
    }
    
}
