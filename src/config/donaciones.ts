/**
 * Configuración de donaciones por Lightning.
 *
 * IMPORTANTE: `DIRECCION_LIGHTNING` está vacía a propósito. No hay LNURL ni
 * Lightning Address en git, transcripciones ni archivos. No inventar una:
 * una dirección equivocada manda el dinero a un desconocido y no se deshace.
 *
 * Pon aquí la Lightning Address o LNURL de la brigada (p. ej. `foo@getalby.com`
 * o `LNURL1…`). En cuanto tenga valor, la tarjeta muestra QR, copiar y el
 * enlace `lightning:`. Mientras esté vacía, el sitio público invita a escribir
 * por Telegram — nunca un aviso de configuración ni una ruta de archivo.
 */
export const DIRECCION_LIGHTNING = '';

/** Se muestra bajo el QR. Puramente informativo. */
export const NOMBRE_DESTINO = 'Brigada Educativa Bitcoin';

/** ¿Está lista para recibir? */
export const donacionesActivas = () => DIRECCION_LIGHTNING.trim().length > 0;

/**
 * URI que abre la wallet del visitante.
 * Para una Lightning Address el esquema estándar es `lightning:usuario@dominio`.
 */
export const uriLightning = () =>
  donacionesActivas() ? `lightning:${DIRECCION_LIGHTNING.trim()}` : '';
