Feature: Set de pruebas para el componente LeadForm

  @leadForm
  Scenario: El usuario completa el formulario en la homepage
    Given El usuario ingresa a la homepage desde mx y ve el formulario de contacto
    And  el usuario de mx conoce sus datos para completar el Lead Form
    When el usuario completa su nombre
    Then el usuario ve su nombre en el campo firstName
    When el usuario completa su apellido
    Then el usuario ve su apellido en el campo lastName
    When el usuario completa su email
    Then el usuario ve su email aparece en el campo email
    When el usuario completa su telefono
    Then el usuario ve su telefono en el campo phoneRow
    When el usuario selecciona un Area de interes
    Then el usuario ve el area de interes en el campo area_of_interest
    When el usuario acepta recibir mensajes via WhatsApp
    Then el usuario ve aceptado el campo WhatsAppOptIn
    When el usuario hace click el botón de envío del formulario
    Then el usuario es redirigido a una página de gracias
    Then el lead existe en la base de datos
    When el lead es procesado automáticamente
    Then el lead es creado exitosamente en Salesforce

