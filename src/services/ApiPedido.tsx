// api/pedidoService.js
import axios from 'axios';

// URL de tu API
const API_URL = 'https://backopt-production.up.railway.app'; // Ajusta la URL de la API si es necesario

// Función para crear un pedido
export const createPedido = async (pedidoData: { IdCliente: string; TotalPe: string; IdMetodoPago: string; IdEstado_Pedido: number; IdEstado_Envio: number; IdDireccion: string; IdPaqueteria: string; IdEmpleado: string; }) => {
  try {
    const response = await axios.post(`${API_URL}/pedido`, pedidoData);
    return response.data; // Devolver los datos del pedido creado
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    throw error;
  }
};

// Función para obtener todos los pedidos de un cliente
export const getPedidosByCliente = async (IdCliente: any) => {
  try {
    const response = await axios.get(`${API_URL}/pedido`, { params: { IdCliente } });
    return response.data; // Devolver los pedidos
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    throw error;
  }
};
