
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
    await act(async() => {

      render(<ProductosOfertas />);
    });



    
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

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => productosMock,
    });



  });
});
