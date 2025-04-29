package com.sena.wilson.domain.valueObjects;

public class ProductDescription {
    private String description;

    public ProductDescription() {
    }

    public ProductDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
