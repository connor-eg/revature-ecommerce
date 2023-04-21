package com.revature.ecommerce.controller;

import org.springframework.web.bind.annotation.RestController;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;
import com.revature.ecommerce.model.ProductOrder;
import com.revature.ecommerce.service.ProductOrderService;
import com.revature.ecommerce.service.ProductService;
import com.revature.ecommerce.service.UserService;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;



//This controller handles everything that has to do with a user's cart.
//Because a cart is connected to a user account and products, this requires access to multiple service classes.
@RestController
@RequestMapping("/api/cart")
public class CartController {
    UserService userService;
    ProductService productService;
    ProductOrderService productOrderService;

    public CartController(UserService userService, ProductService productService,
            ProductOrderService productOrderService) {
        this.userService = userService;
        this.productService = productService;
        this.productOrderService = productOrderService;
    }

    //Get a user's cart.
    //Requires a valid token.
    @GetMapping("/")
    public ResponseEntity<Set<ProductOrder>> getUserCart(@RequestHeader String token) throws SessionTokenInvalidException {
        return ResponseEntity.status(200).body(productOrderService.getUserCart(token));
    }
    
    //Add a new item to the cart.
    //Requires a valid token, the item you wish to add, and the quantity of that item.
    @PostMapping("/")
    public ResponseEntity<String> putItemInCart(@RequestHeader String token, @RequestHeader long itemId, @RequestHeader int quantity) throws SessionTokenInvalidException{
        return productOrderService.newCartItem(token, itemId, quantity);
    }

    //Allows a user to "place their order" which clears their cart.
    //Requires a valid token.
    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestHeader String token) throws SessionTokenInvalidException {
        return productOrderService.checkout(token);
    }
    
}
