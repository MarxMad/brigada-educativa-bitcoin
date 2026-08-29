/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Llave de CARTO para las teselas del mapa.
   *
   * Sin ella los tiles salen con la marca de agua «API KEY REQUIRED».
   * Es gratuita hasta 5 millones de teselas al mes y no hace falta cuenta:
   * se pide en https://carto.com/basemaps/apikey y llega por correo.
   */
  readonly VITE_CARTO_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
