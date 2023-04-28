package com.revature.ecommerce.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;
import com.revature.ecommerce.model.UserAccount;
import com.revature.ecommerce.repository.UserAccountRepository;
import com.revature.ecommerce.utility.EcommerceConstants;

@Service
public class UserService {
    UserAccountRepository userRepository;

    public UserService(UserAccountRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Verify that a user's session token is valid and that it has not expired yet.
    //Returns a user for future use if the token is valid, and throws an error which bubbles up to
    // the controller otherwise.
    protected UserAccount validateUser(String sessionToken) throws SessionTokenInvalidException {
        Optional<UserAccount> userOptional = userRepository.findBySessionToken(sessionToken);
        if(userOptional.isPresent()){
            UserAccount u = userOptional.get();
            //Checking that the token is not expired
            if(System.currentTimeMillis() > u.getSessionExpiry()){
                //If we are here, the token expired and we need the user to regenerate it.
                throw new SessionTokenInvalidException();
            }

            //If we do an operation on an unexpired token, push back the token's expiry time
            // (effectively keeping the token alive as long as the user remains active).
            u.setSessionExpiry(EcommerceConstants.generateSessionExpiry());
            userRepository.save(u);
            return u;
        } else {
            throw new SessionTokenInvalidException();
        }
    }

    public String refreshToken(String sessionToken) throws SessionTokenInvalidException {
        validateUser(sessionToken);
        return "\"Refreshed token successfully.\"";
    }

    //Register a user, checking if that user already exists in the database first
    public ResponseEntity<String> registerUser(String username, String password) {
        if(username.length() < 4) {
            return ResponseEntity.status(400).body("\"Usernames must be at least 4 characters long!\"");
        }
        if(password.length() < 8) {
            return ResponseEntity.status(400).body("\"Your password must be at least 8 characters long!\"");
        }

        if(userRepository.existsByUserName(username)){
            return ResponseEntity.status(409).body("\"There is already an account with that username!\"");
        } else {
            UserAccount nuser = new UserAccount();
            nuser.setUserName(username);
            nuser.setPassword(password);
            userRepository.save(nuser);
            return ResponseEntity.status(200).body("\"Successfully created an account\"");
        }
    }

    //Log in a user by generating and returning a session token
    //If the user cannot be logged in with the provided credentials, return a 403 error
    public ResponseEntity<String> loginUser(String username, String password) {
        Optional<UserAccount> userOptional = userRepository.findByUserNameAndPassword(username, password);
        if(userOptional.isPresent()){
            //Generate a session token
            String token = EcommerceConstants.generateSessionToken();
            UserAccount user = userOptional.get();
            user.setSessionToken(token);
            user.setSessionExpiry(EcommerceConstants.generateSessionExpiry());
            userRepository.save(user);
            return ResponseEntity.status(200).body(token);
        } else {
            return ResponseEntity.status(403).body("\"Username or password was incorrect\"");
        }
    }

}
