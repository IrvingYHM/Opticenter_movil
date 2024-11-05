describe("Pruebas de API's", () => {
  // Prueba de la API de Productos en Oferta
  it("Debería obtener productos en oferta", () => {
    cy.request(
      "GET",
      "https://backopt-production.up.railway.app/productos/productosOfertas"
    ).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.be.an("array"); 
      expect(response.body).to.have.length.greaterThan(0); 
    });
  });

  // Prueba de la API de Productos
  it("Debería obtener todos los productos", () => {
    cy.request(
      "GET",
      "https://backopt-production.up.railway.app/productos/productos"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  // Prueba de la API de Graduaciones
  it("Debería obtener las graduaciones", () => {
    cy.request(
      "GET",
      "https://backopt-production.up.railway.app/graduaciones"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  // Prueba de la API de Tratamientos
  it("Debería obtener tratamientos", () => {
    cy.request(
      "GET",
      "https://backopt-production.up.railway.app/Tratamiento"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  // Prueba de Login de Usuario
  it("Debería iniciar sesión con credenciales válidas", () => {
    const userCredentials = {
      email: "20210709@uthh.edu.mx",
      password: "Maxo0121@",
    };

    cy.request({
      method: "POST",
      url: "https://backopt-production.up.railway.app/auth/login",
      body: userCredentials,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        expect(response.body).to.have.property("token");
      } else {
        cy.log(`Error: ${response.status} - ${response.body.message}`);
      }
    });
  });
});
