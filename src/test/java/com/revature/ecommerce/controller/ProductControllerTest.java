package com.revature.ecommerce.controller;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;

@SpringBootTest
public class ProductControllerTest {
    @Autowired
    private ProductController productController;

    @Test
    void getItemsThrowsExceptionWithBadToken(){
        assertThrows(SessionTokenInvalidException.class, () -> {productController.getAllItems("badtoken");}, "The ProductController accepted a bad token");
    }
}
