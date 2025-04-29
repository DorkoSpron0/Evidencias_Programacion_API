package com.sena.wilson;

import com.sena.wilson.domain.entity.Product;
import com.sena.wilson.domain.valueObjects.ProductDescription;
import com.sena.wilson.domain.valueObjects.ProductName;
import com.sena.wilson.infrastructure.drivenAdapters.memory.adapters.ProductUseCasesAdapter;

import java.util.Objects;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        ProductUseCasesAdapter adapter = new ProductUseCasesAdapter();

        Scanner sc = new Scanner(System.in);

        String option = "99";
        System.out.println("BIENVENIDO A MI SISTEMA DE GESTIÓN DE INVENTARIO DE SALCHIPAPAS :D");
        while (!Objects.equals(option, "0")){
            System.out.println("DIGITE LA OPCIÓN QUE QUIERE REALIZAR");
            System.out.println(
                    "1) Ver todos los productos.\n" +
                    "2) Añadir nuevo producto.\n" +
                    "3) Eliminar un producto.\n" +
                    "4) Actualizar un producto\n" +
                    "5) Buscar según el identificador\n"+
                    "6) Buscar según el nombre\n"+
                    "0) Salir"
            );
            option = sc.next();


            sc.nextLine();
            try{
                switch (option){
                    case "1":
                        adapter.findAllProducts().forEach(System.out::println);
                        break;
                    case "2":
                        System.out.println("Digite el identificador (Recuerda que debe único)");
                        Long id = sc.nextLong();

                        System.out.println("Digite el nombre");
                        String name = sc.next();

                        System.out.println("Digite la descripción");
                        String description = sc.next();

                        System.out.println("Digite el precio (Recuerda que no puede ser negativo)");
                        double price = sc.nextDouble();

                        System.out.println("Digite la cantid disponible (Recuerda que no puede ser negativo)");
                        int quantity = sc.nextInt();

                        Product newProduct = new Product(id, new ProductName(name), new ProductDescription(description), price, quantity);

                        System.out.println(adapter.addProduct(newProduct));
                        break;
                    case "3":
                        System.out.println("Digite el identificador (Recuerda que debe único)");
                        Long productId = sc.nextLong();

                        System.out.println(adapter.removeProduct(productId));
                        break;
                    case "4":
                        System.out.println("Digite el identificador");
                        Long product_id = sc.nextLong();

                        System.out.println("Digite el nuevo nombre");
                        String newName = sc.next();

                        System.out.println("Digite la nueva descripción");
                        String newDescription = sc.next();

                        System.out.println("Digite el nuevo precio (Recuerda que no puede ser negativo)");
                        double newPrice = sc.nextDouble();

                        System.out.println("Digite la nueva cantidad disponible (Recuerda que no puede ser negativo)");
                        int newQuantity = sc.nextInt();

                        Product updatedProduct = new Product(product_id, new ProductName(newName), new ProductDescription(newDescription), newPrice, newQuantity);
                        System.out.println(adapter.updateProduct(updatedProduct, product_id));
                        break;
                    case "5":
                        System.out.println("Digite el identificador");
                        Long prId = sc.nextLong();

                        System.out.println(adapter.findById(prId));
                        break;
                    case "6":
                        System.out.println("Digite el nombre");
                        String searchedName = sc.nextLine();
                        System.out.println(adapter.findByName(searchedName));
                        break;
                }
            }catch (IllegalArgumentException ex){
                System.out.println("ERROR!!!!! ❌❌ " + ex.getMessage() + " no se completó la operación");
            }
        }

        System.out.println("HASTA LUEGO 🤚");
    }
}