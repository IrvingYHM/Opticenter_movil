import { render, screen } from '@testing-library/react';
import IniciaSesion from '../pages/IniciaSesión'; // Asegúrate de ajustar la ruta
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';

// Mocks de componentes
vi.mock('../components/UI/Header', () => ({
    default: () => <div>Header</div>,
}));
vi.mock('../components/Formulario', () => ({
    default: () => <div>Login</div>,
}));

describe('Pruebas del componente IniciaSesion', () => {
  test('renderiza Header y Login', () => {
    render(
      <Router>
        <IniciaSesion />
      </Router>
    );

    // Verifica que los componentes simulados estén presentes
    expect(screen.queryByText('Header')).toBeInTheDocument();
    expect(screen.queryByText('Login')).toBeInTheDocument();
  });
});
