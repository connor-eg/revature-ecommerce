package com.revature.ecommerce.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.revature.ecommerce.exceptions.SessionTokenInvalidException;
import com.revature.ecommerce.model.Product;
import com.revature.ecommerce.model.ProductOrder;
import com.revature.ecommerce.model.ProductOrderKey;
import com.revature.ecommerce.model.UserAccount;
import com.revature.ecommerce.repository.ProductOrderRepository;
import com.revature.ecommerce.repository.ProductRepository;
import com.revature.ecommerce.repository.UserAccountRepository;

@Service
public class ProductOrderService {
    ProductOrderRepository productOrderRepository;
    UserAccountRepository userAccountRepository;
    ProductRepository productRepository;
    UserService userService;

    public ProductOrderService(ProductOrderRepository productOrderRepository,
            UserAccountRepository userAccountRepository, ProductRepository productRepository, UserService userService) {
        this.productOrderRepository = productOrderRepository;
        this.userAccountRepository = userAccountRepository;
        this.productRepository = productRepository;
        this.userService = userService;
    }

    //Get a cart from a user.
    //Requires a valid session token.
    public Set<ProductOrder> getUserCart(String token) throws SessionTokenInvalidException {
        return userService.validateUser(token).getShoppingCart();
    }

    //Create a new order and add it to a user's cart.
    public ResponseEntity<String> newCartItem(String token, long itemId, int quantity) throws SessionTokenInvalidException {
        if(quantity <= 0) return ResponseEntity.status(400).body("The number of items you want to buy must be above 0!");
        UserAccount u = userService.validateUser(token); //Validate the user and refresh their token
        Optional<Product> productOptional = productRepository.findById(itemId); //Check the database for the item the user wishes to add

        if(productOptional.isPresent()){
            Product p = productOptional.get();

            //Create the composite key for the item order that is being stored
            ProductOrderKey compositeKey = new ProductOrderKey();
            compositeKey.setUserId(u.getId());
            compositeKey.setProductId(p.getId());

            //Create the new product order that will be saved to the user's cart.
            ProductOrder pOrder = new ProductOrder();
            pOrder.setId(compositeKey);
            pOrder.setUser(u);
            pOrder.setProduct(p);
            pOrder.setQuantity(quantity);
            productOrderRepository.save(pOrder);

            return ResponseEntity.status(200).body("Item added to cart.");
        } else {
            return ResponseEntity.status(404).body("Item not found");
        }
    }

    //Clear a user's cart
    public ResponseEntity<String> checkout(String token) throws SessionTokenInvalidException {
        UserAccount u = userService.validateUser(token);
        Set<ProductOrder> userProducts = u.getShoppingCart();
        if(userProducts.isEmpty()){
            return ResponseEntity.status(400).body("There are no items in your cart!");
        } else {
            productOrderRepository.deleteAll(userProducts);
            return ResponseEntity.status(200).body("Checked out your items.");
        }
    }

}
