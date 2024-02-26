Feature: LeadForm Outline

  Scenario Outline:
    Given El usuario ingresa a la homepage y ve el formulario de contacto
    When el usuario completa su firstName con <name>
    Then el valor <name> aparece en el campo firstName
    Examples:
      | name   |
      | Pablo  |
      | Aldana |
      | Andrés |



