package com.revature.ecommerce.controller;

import org.springframework.web.bind.annotation.RestController;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;
import com.revature.ecommerce.model.Product;
import com.revature.ecommerce.service.ProductService;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

//This controller handles everything that has to do with an individual product. That means getting products and adding them to the DB.
@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {
    ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    //Retrieve a list of all products that exist.
    //Requires a valid session token.
    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllItems() throws SessionTokenInvalidException {
        return ResponseEntity.status(200).body(productService.getAllProducts());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getItem(
        @PathVariable long id
    ) throws SessionTokenInvalidException {
        return ResponseEntity.status(200).body(productService.getProduct(id));
    }
    
    //List a new product by adding it to the database.
    //Requires a valid session token as well as a product name, description, and price.
    @PostMapping("/")
    public ResponseEntity<String> newProduct(
        @RequestHeader String token,
        @RequestHeader String productName,
        @RequestHeader String description,
        @RequestHeader BigDecimal price,
        @RequestHeader(required = false) String imageUrl)
            throws SessionTokenInvalidException {
            
        Product p = new Product(productName, description, price);
        p.setImageUrl(imageUrl != null ? imageUrl : "");
        return productService.newProduct(token, p);
    }
    
}
