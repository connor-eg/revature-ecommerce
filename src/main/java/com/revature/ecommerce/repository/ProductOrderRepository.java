package com.revature.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.ecommerce.model.ProductOrder;
import com.revature.ecommerce.model.ProductOrderKey;

public interface ProductOrderRepository extends JpaRepository<ProductOrder, ProductOrderKey> {

}
