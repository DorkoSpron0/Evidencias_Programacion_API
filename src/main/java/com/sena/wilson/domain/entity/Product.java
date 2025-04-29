package com.sena.wilson.domain.entity;

import com.sena.wilson.domain.valueObjects.ProductDescription;
import com.sena.wilson.domain.valueObjects.ProductName;

public class Product {

    private Long id;
    private ProductName name;
    private ProductDescription description;
    private double price;
    private Integer quantityAvailable;

    public Product() {
    }

    public Product(Long id, ProductName name, ProductDescription description, double price, Integer quantityAvailable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantityAvailable = quantityAvailable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductName getName() {
        return name;
    }

    public void setName(ProductName name) {
        this.name = name;
    }

    public ProductDescription getDescription() {
        return description;
    }

    public void setDescription(ProductDescription description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(Integer quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name=" + name +
                ", description=" + description +
                ", price=" + price +
                ", quantityAvailable=" + quantityAvailable +
                '}';
    }
}
