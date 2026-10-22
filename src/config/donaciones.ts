/**
 * Destino de las donaciones de la brigada.
 *
 * `DIRECCION_DONAR` es el destino Lightning. Su QR vive, pequeño, en Bull Bitcoin.
 * El QR grande de la sección de donar es el depósito BTC de Bitget
 * (`DIRECCION_BITGET` y `public/img/qr-bitget-btc.png`). Copiar y el botón
 * usan esa misma dirección.
 *
 * Para cambiar de red basta con tocar `RED_DONAR` y `DIRECCION_DONAR`.
 */
export type RedDonar = 'liquid' | 'lightning' | 'onchain';

/**
 * Red del destino. Manda sobre el esquema del URI y sobre la etiqueta que ve
 * el donante, para que la página no prometa una red y cobre en otra.
 *
 * - `liquid`    → dirección confidential `lq1…`
 * - `lightning` → dirección Lightning (`nombre@dominio`) o LNURL-pay (`lnurl1…`).
 *                 Un invoice BOLT11 no sirve aquí: expira y sólo cobra una vez.
 * - `onchain`   → dirección Bitcoin `bc1…`
 */
export const RED_DONAR: RedDonar = 'liquid';

/** Dirección Lightning que recibe. Debe corresponder a la red de `RED_DONAR`. */
export const DIRECCION_DONAR =
  'lq1qqtfv3ly55ftaw03j6fgd8d0gt3mnswkzrv5sujzgn4wpfgncvf23r4qk509fj6mn0vf5vl9k68r4cvxz6rnt2vssaggalm8da';

/** Depósito on chain en Bitget. El QR de la sección de donar sale de esta dirección. */
export const DIRECCION_BITGET = '1JmYC8hZ1jr9o9GZZpTGgWYmJu21r7cpu5';

/** Se muestra bajo el QR. Puramente informativo. */
export const NOMBRE_DESTINO = 'Brigada Educativa Bitcoin';

/** Esquema de URI que hace que el sistema operativo ofrezca abrir una wallet. */
const ESQUEMA: Record<RedDonar, string> = {
  liquid: 'liquidnetwork:',
  lightning: 'lightning:',
  onchain: 'bitcoin:',
};

/**
 * URI que abre la wallet y que además se codifica en el QR.
 *
 * Sin parámetros extra a propósito: un `?pj=`, un `?amount=` o un invoice
 * dentro de un QR estático caducan, y entonces las wallets que los respetan
 * fallan en vez de caer al pago normal.
 */
export const uriDonar = () => `${ESQUEMA[RED_DONAR]}${DIRECCION_DONAR.trim()}`;

export const uriBitget = () => `bitcoin:${DIRECCION_BITGET.trim()}`;
