/**
 * Donaciones por Liquid Network (Elements).
 *
 * Dirección confidential `lq1…` de la brigada. El QR está en
 * `public/img/qr-donar.png` — es el código que nos pasaron, no uno generado.
 */
export const DIRECCION_LIQUID =
  'lq1qqtfv3ly55ftaw03j6fgd8d0gt3mnswkzrv5sujzgn4wpfgncvf23r4qk509fj6mn0vf5vl9k68r4cvxz6rnt2vssaggalm8da';

/** QR estático de esa misma dirección. */
export const IMAGEN_QR_DONAR = '/img/qr-donar.png';

/** Se muestra bajo el QR. Puramente informativo. */
export const NOMBRE_DESTINO = 'Brigada Educativa Bitcoin';

/** ¿Está lista para recibir? */
export const donacionesActivas = () => DIRECCION_LIQUID.trim().length > 0;

/**
 * URI que abre wallets que entienden Liquid (p. ej. Blockstream Green).
 * El esquema BIP21 de Liquid es `liquidnetwork:<address>`.
 */
export const uriLiquid = () =>
  donacionesActivas() ? `liquidnetwork:${DIRECCION_LIQUID.trim()}` : '';
