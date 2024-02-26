Feature: LeadForm Component: Set de pruebas para el feature Honeypot
  Honeypot es una funcionalidad pensada para detectar comportamientos de visitas de bots,
  a través de su interacción con elementos no visibles con los cuales un usuario real no podría interactuar.

  @leadForm @leadForm:Honeypot
  Scenario: Un bot ingresa al sitio web y completa los campos ocultos de un Lead Form que contiene el AOI hidden
    Given El usuario ingresa a la homepage y ve el formulario de contacto
    And  el usuario conoce sus datos para completar el Lead Form
    When el usuario completa su nombre
    Then el usuario ve su nombre en el campo firstName
    When el usuario completa su apellido
    Then el usuario ve su apellido en el campo lastName
    When el usuario completa su email
    Then el usuario ve su email aparece en el campo email
    When el usuario completa su telefono
    Then el usuario ve su telefono en el campo phoneRow
    When el bot completa el campo oculto first_name
    Then el valor existe en el campo oculto first_name
    When el bot completa el campo oculto last_name
    Then el valor existe en el campo oculto last_name
    When el bot completa el campo oculto user_email
    Then el valor existe en el campo oculto user_email
    When el usuario hace click el botón de envío del formulario
    Then el usuario es redirigido a una página de gracias sin escapes
    Then el lead existe en la base de datos
