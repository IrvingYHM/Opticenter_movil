/* describe('Pruebas del formulario de inicio de sesión', () => {

    beforeEach(() => {
      cy.visit('/IniciaSesion'); 
      cy.wait(2000); 
    });
  
    it('Verifica que el formulario de inicio de sesión se renderiza correctamente', () => {
        cy.get('ion-input#email input').should('be.visible');
        cy.get('ion-input#password input').should('be.visible'); 
        cy.get('ion-button[type="submit"]').should('contain', 'Inciar Sesion'); 
      });

      it('Simula el ingreso de datos válidos en el formulario', () => {
        cy.wait(1000); 
      
        cy.get('ion-input#email input').should('be.visible').type('usuario@valido.com');
        cy.get('ion-input#email input').should('have.value', 'usuario@valido.com');
        cy.get('ion-input#password input').should('be.visible').type('contraseñaValida');
        cy.get('ion-input#password input').should('have.value', 'contraseñaValida');
      });
      
      
  });
   */