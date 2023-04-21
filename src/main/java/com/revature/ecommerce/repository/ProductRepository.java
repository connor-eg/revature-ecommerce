package com.revature.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.ecommerce.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
