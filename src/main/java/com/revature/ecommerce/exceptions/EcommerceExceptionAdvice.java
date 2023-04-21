package com.revature.ecommerce.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class EcommerceExceptionAdvice extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler(value = {SessionTokenInvalidException.class})
    protected ResponseEntity<String> sessionTokenInvalid (){
        return ResponseEntity.status(403).body("Your session token is invalid! Try logging in again.");
    }

}
