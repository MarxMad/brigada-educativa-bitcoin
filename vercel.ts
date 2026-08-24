import type { VercelConfig } from '@vercel/config/v1';

/**
 * Vercel sirve todo con `max-age=0, must-revalidate` por defecto, así que el
 * navegador revalida cada archivo en cada visita — incluido el video de 1.5 MB.
 *
 * Los nombres bajo /assets ya traen hash de contenido (Vite), así que se pueden
 * cachear para siempre. El video y las imágenes cambian poco y se versionan
 * renombrando el archivo, así que llevan un año con revalidación en segundo plano.
 */
export const config: VercelConfig = {
  framework: 'vite',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  headers: [
    {
      source: '/assets/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/video/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, stale-while-revalidate=86400' },
      ],
    },
    {
      source: '/img/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, stale-while-revalidate=86400' },
      ],
    },
    {
      // El HTML sí debe revalidarse: es lo que apunta a los assets con hash.
      source: '/',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};

export default config;
