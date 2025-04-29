package com.sena.wilson.domain.valueObjects;

public class ProductName {
    private String name;

    public ProductName() {
    }

    public ProductName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
