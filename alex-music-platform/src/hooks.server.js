// src/hooks.server.js
import { error } from '@sveltejs/kit';

// Almacenamiento en memoria temporal para rastrear las IPs (limpieza simple en caliente)
const IP_REQUEST_COUNTER = new Map();
const LIMIT_WINDOW_MS = 60000; // Ventana de 1 minuto
const MAX_REQUESTS_PER_WINDOW = 60; // Máximo 60 peticiones por minuto por IP

export async function handle({ event, resolve }) {
  const clientIp = event.getClientAddress() || 'unknown';
  const currentTime = Date.now();

  // Obtener o inicializar el registro de la IP actual
  if (!IP_REQUEST_COUNTER.has(clientIp)) {
    IP_REQUEST_COUNTER.set(clientIp, []);
  }

  let requestTimes = IP_REQUEST_COUNTER.get(clientIp);

  // Filtrar y desechar las peticiones que ya salieron de la ventana de tiempo
  requestTimes = requestTimes.filter(timestamp => currentTime - timestamp < LIMIT_WINDOW_MS);

  // Verificar si se excedió el umbral máximo permitido
  if (requestTimes.length >= MAX_REQUESTS_PER_WINDOW) {
    throw error(429, {
      message: 'Demasiadas solicitudes. Compresión de tráfico activada, intenta de nuevo en un minuto.'
    });
  }

  // Registrar la petición actual
  requestTimes.push(currentTime);
  IP_REQUEST_COUNTER.set(clientIp, requestTimes);

  // Si todo está en orden, la señal de audio/datos sigue su curso habitual
  return await resolve(event);
}