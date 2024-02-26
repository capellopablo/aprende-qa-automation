Feature: Suma de precios en el carrito de compras

  Scenario: Usuario suma precios de dos productos en el carrito
    Given el usuario ha ingresado a la tienda online
    When el usuario agrega productos al carrito
      | producto         | precio |
      | Camiseta básica  | 20     |
      | Jeans clásicos   | 50     |
    Then el total a pagar debería ser 70
