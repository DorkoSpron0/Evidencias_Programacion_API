package com.sena.wilson.infrastructure.drivenAdapters.memory.adapters;

import com.sena.wilson.domain.entity.Product;
import com.sena.wilson.domain.usecases.ProductUseCases;
import com.sena.wilson.domain.valueObjects.ProductDescription;
import com.sena.wilson.domain.valueObjects.ProductName;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public class ProductUseCasesAdapter implements ProductUseCases {

    List<Product> products = new ArrayList<>(List.of(
            new Product(1L, new ProductName("Salchi pollo"), new ProductDescription("Salchipapas con pollo"), 11_000.00, 10),
            new Product(2L, new ProductName("SSalchi ranchera"), new ProductDescription("Salchipapas con ranchera"), 9_000.00, 3),
            new Product(3L, new ProductName("Salchi Yumbo"), new ProductDescription("Salchipapas con tamaño extra gigante"), 21_000.00, 6),
            new Product(4L, new ProductName("Salchi Buti"), new ProductDescription("Salchipapas con butifarras"), 15_000.00, 2),
            new Product(5L, new ProductName("Salchi longaniza"), new ProductDescription("Salchipapas con longaniza"), 12_000.00, 8)
    ));

    @Override
    public List<Product> findAllProducts() {
        Comparator<Product> comparatorById = Comparator.comparing(Product::getId);
        return products.stream().sorted(comparatorById).toList();
    }

    @Override
    public Product addProduct(Product product) {

        List<Product> productFounded = products.stream().filter(prd -> Objects.equals(prd.getId(), product.getId())).toList();
        if (!productFounded.isEmpty()){
            throw new IllegalArgumentException("El identificador debe ser único");
        }

        if (product.getName().getName().isEmpty() || product.getName().getName() == null) throw new IllegalArgumentException("El nombre no puede estar vacío");
        if (product.getPrice() < 0) throw new IllegalArgumentException("El precio no puede ser negativo");
        if (product.getQuantityAvailable() < 0) throw new IllegalArgumentException("La cantidad no puede ser negativa");

        products.add(product);

        return product;
    }

    @Override
    public String removeProduct(Long productId) {
        Product productFounded = findById(productId);
        products.remove(productFounded);
        return "Producto con id " + productId + " ha sido eliminado exitosamente!";
    }

    @Override
    public Product updateProduct(Product product, Long productId) {
        Product productFounded = findById(productId);
        Product productUpdated = new Product(productFounded.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getQuantityAvailable());

        if (product.getName().getName().isEmpty() || product.getName().getName() == null) throw new IllegalArgumentException("El nombre no puede estar vacío");
        if (product.getPrice() < 0) throw new IllegalArgumentException("El precio no puede ser negativo");
        if (product.getQuantityAvailable() < 0) throw new IllegalArgumentException("La cantidad no puede ser negativa");

        products.remove(productFounded);
        products.add(productUpdated);
        return product;
    }

    @Override
    public Product findById(Long productId){
        return products.stream().filter(prd -> prd.getId().equals(productId)).findFirst().orElseThrow(() -> new IllegalArgumentException("El producto con id " + productId + " no existe"));
    }

    @Override
    public Product findByName(String name){
        return products.stream().filter(prd -> prd.getName().getName().equals(name)).findFirst().orElseThrow(() -> new IllegalArgumentException("El producto con nombre " + name + " no existe"));
    }
}
