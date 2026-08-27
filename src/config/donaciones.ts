/**
 * Dirección de donación de la brigada.
 *
 * El string es una dirección confidential Liquid (`lq1…`). En pantalla se
 * presenta como «Donar por Lightning» porque esa es la etiqueta que pide el
 * proyecto; el URI de wallet usa `liquidnetwork:` para que las apps que
 * entienden esa red (p. ej. Blockstream Green) abran el pago de verdad.
 *
 * El QR estático está en `public/img/qr-donar.png` — es el código que nos
 * pasaron, no uno generado.
 */
export const DIRECCION_DONAR =
  'lq1qqtfv3ly55ftaw03j6fgd8d0gt3mnswkzrv5sujzgn4wpfgncvf23r4qk509fj6mn0vf5vl9k68r4cvxz6rnt2vssaggalm8da';

/** QR estático de esa misma dirección. */
export const IMAGEN_QR_DONAR = '/img/qr-donar.png';

/** Se muestra bajo el QR. Puramente informativo. */
export const NOMBRE_DESTINO = 'Brigada Educativa Bitcoin';

/**
 * URI que abre wallets que entienden Liquid.
 * El esquema BIP21 de Liquid es `liquidnetwork:<address>`.
 */
export const uriDonar = () => `liquidnetwork:${DIRECCION_DONAR.trim()}`;
