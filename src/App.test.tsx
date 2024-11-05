import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './pages/Home';

test('se renderiza el carrusel de imágenes', () => {
  render(<Home />); 
  const images = screen.getAllByRole('img'); 
  expect(images.length).toBeGreaterThan(0); 
});


// Prueba para verificar que se renderiza el enlace "Ingresar a mi cuenta"
test('se renderiza el enlace "Ingresar a mi cuenta"', () => {
  render(
    <MemoryRouter>  // Usa MemoryRouter para simular la navegación
      <Home />
    </MemoryRouter>
  );
  const loginLink = screen.getByText(/Ingresar a mi cuenta/i); 
  expect(loginLink).toBeInTheDocument();
});

// Prueba para verificar que se renderiza la sección de ayuda
test('se renderiza la sección de ayuda', () => {
  render(<Home />); 
  const helpSection = screen.getByText(/¿Necesitas ayuda?/i); 
  expect(helpSection).toBeInTheDocument(); 
  
  const termsLink = screen.getByText(/Terminos y condiciones/i); 
  expect(termsLink).toBeInTheDocument(); 
  const moreInfoLink = screen.getByText(/Conocer más/i); 
  expect(moreInfoLink).toBeInTheDocument(); 
});
