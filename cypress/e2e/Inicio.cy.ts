describe("Inicio del sitio web prueba", () => {

  beforeEach(() => {
    cy.visit("/home");
  });

  it("Verifica el enlace 'Ingresar a mi cuenta' redirige a la ruta correcta", () => {
    cy.contains('Ingresar a mi cuenta', { timeout: 10000 }).should('be.visible');
  });

  it("Verifica que el botón 'Ingresar a mi cuenta' redirige correctamente", () => {
    cy.contains('Ingresar a mi cuenta', { timeout: 10000 }).click(); 
    cy.url().should('include', '/IniciaSesion'); 
  });


  
  it("Verifica que la imagen cambia automáticamente", () => {
    cy.get('.carousel-image').then(($img) => {
      const initialSrc = $img.attr('src'); 
      cy.wait(3100);
      cy.get('.carousel-image').should(($img) => {
        const newSrc = $img.attr('src');
        expect(newSrc).to.not.equal(initialSrc); 
      });
    });
  });

});