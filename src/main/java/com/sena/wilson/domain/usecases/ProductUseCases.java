package com.sena.wilson.domain.usecases;

import com.sena.wilson.domain.entity.Product;

import java.util.List;

public interface ProductUseCases {
    List<Product> findAllProducts();
    Product addProduct(Product product);
    String removeProduct(Long productId);
    Product updateProduct(Product new_product, Long productId);
    Product findById(Long id);
    Product findByName(String name);
}
