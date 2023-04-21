package com.revature.ecommerce.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;
import com.revature.ecommerce.model.Product;
import com.revature.ecommerce.repository.ProductRepository;

@Service
public class ProductService {
    ProductRepository productRepository;
    UserService userService;

    public ProductService(ProductRepository productRepository, UserService userService) {
        this.productRepository = productRepository;
        this.userService = userService;
    }

    //Push a new product to the database. Requires a valid user session token, plus required information for the new product
    public ResponseEntity<String> newProduct(String token, Product product) throws SessionTokenInvalidException {
        if(product.getPrice().compareTo(new BigDecimal(0)) <= 0){
            return ResponseEntity.status(400).body("The price of the product must be positive!");
        }

        //This line just says that if someone wants to add a product listing they must be logged in.
        userService.validateUser(token);

        productRepository.save(product);
        return ResponseEntity.status(200).body(product.getProductName() + " was listed successfully!");
    }

    //Returns a list of all products in the database, provided that the user has given a valid token.
    public List<Product> getAllProducts(String token) throws SessionTokenInvalidException {
        userService.validateUser(token);
        return productRepository.findAll();
    }
    
}
