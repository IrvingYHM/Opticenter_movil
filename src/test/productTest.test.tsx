import { render, screen, act } from '@testing-library/react';
import ProductosOfertas from '../components/Shared/productosOfertas';
import { vi } from 'vitest';
import React from 'react';

// Simulamos la función fetch global
global.fetch = vi.fn();

describe('ProductosOfertas', () => {
  afterEach(() => {
    // Reseteamos la función mock después de cada prueba
    vi.clearAllMocks();
  });

  test('Muestra productos correctamente al cargar', async () => {
    // Mock de los datos de la API
    const productosMock = [
      {
        IdProducto: 1,
        vchNombreProducto: 'Producto 1',
        vchNomImagen: 'imagen1.png',
        vchDescripcion: 'Descripción del producto 1',
        Existencias: 10,
        Precio: 100,
        IdCategoria: 1,
        IdMarca: 1,
        PrecioOriginal: 120,
        PrecioOferta: 90,
        categoria: { NombreCategoria: 'Categoría 1' },
        marca: { NombreMarca: 'Marca 1' },
      },
    ];

    // Configura el mock de fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => productosMock,
    });

    // Renderizamos el componente
    await act(async () => {
      render(<ProductosOfertas />);
    });

    // Verificamos que los productos se muestren
    expect(await screen.findByText('Producto 1')).toBeInTheDocument();
    expect(await screen.findByText('Descripción del producto 1')).toBeInTheDocument();
    expect(await screen.findByText('$90')).toBeInTheDocument(); // PrecioOferta
  });
});
