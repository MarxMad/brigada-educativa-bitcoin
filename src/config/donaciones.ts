/**
 * Configuración de donaciones por Lightning.
 *
 * IMPORTANTE: `DIRECCION_LIGHTNING` está vacía a propósito. No la inventé
 * porque una dirección equivocada manda el dinero de la gente a la cartera de
 * un desconocido, y eso no se puede deshacer.
 *
 * Pon aquí tu Lightning Address — se ve como un correo, por ejemplo
 * `brigada@getalby.com` o `brigada@coinos.io`. La sacas gratis creando una
 * cuenta en Alby (getalby.com), Coinos (coinos.io) o Wallet of Satoshi.
 *
 * En cuanto tenga valor, la sección de donaciones se activa sola: aparece el
 * código QR, el botón de copiar y el enlace `lightning:`. Mientras esté vacía,
 * la sección muestra un aviso de pendiente en vez de datos falsos.
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
