package com.revature.ecommerce.controller;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;

@SpringBootTest
public class ProductControllerTest {
    @Autowired
    private ProductController productController;

    @Test
    void addItemThrowsExceptionWithBadToken(){
        assertThrows(SessionTokenInvalidException.class, () -> {productController.newProduct("badtoken", "banana bandana", "a bandana depicting several bananas", new BigDecimal(22.47), "");}, "The ProductController accepted a bad token");
    }
}
