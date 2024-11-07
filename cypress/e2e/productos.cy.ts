describe('Pruebas de E2E para ProductosVista', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://backopt-production.up.railway.app/productos/Productos').as('fetchProducts');
        cy.visit('/productos'); 
      });
      
      it('Carga los productos correctamente', () => {
        cy.wait('@fetchProducts').its('response.statusCode').should('eq', 200);
        cy.get('ion-card').should('have.length.greaterThan', 0);
      });

  });
  