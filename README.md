# Brigada Educativa Bitcoin

Sitio de una sola página para la **Brigada Educativa Bitcoin** en Zacatlán de las
Manzanas, Sierra Norte de Puebla — del **24 de agosto al 20 de septiembre de 2026**.

**Paleta:** naranja Bitcoin (`#F7931A`) y dorado (`#E8B45A` / `#FFD98E`) sobre negro
cálido (`#0A0806`) y blanco. Los tokens viven en `:root` dentro de `src/index.css`.

La estructura y el espaciado del hero vienen del spec "Apogee" que sirvió de
referencia; el color y los fondos son de la Brigada.

## Stack

Vite 5 · React 18.3 · TypeScript 5.5 · Tailwind 3.4 · lucide-react 0.446

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
npm run preview
npm run typecheck
```

## Estructura

```
index.html                     título, meta OG y la webfont Suisse Intl
src/index.css                  el CSS del spec, tal cual + extensiones del sitio
src/App.tsx                    orden de las secciones
src/data/content.ts            TODO el texto del deck en un solo archivo
src/components/
  Hero.tsx                     hero "Apogee": BAR_HEIGHTS, Animate, RevenueCard, Hero, Nav
  Reveal.tsx                   reveal por IntersectionObserver + <CountUp>
  Marquee.tsx                  ticker infinito
  Proyecto.tsx                 misión / objetivo / visión + 7 valores + moneda con parallax
  Brigada.tsx                  banda naranja: cómo trabaja la brigada + moneda 3D girando
  VideoFondo.tsx               video de fondo que se pausa fuera del viewport
  Ruta.tsx                     plan operativo interactivo de 4 semanas
  Metas.tsx                    contadores animados, equipo, recursos y presupuesto
  Prensa.tsx                   impacto mediático + nota de Crypto India Magazine
  Aliados.tsx                  logos de aliados
  Contacto.tsx                 cuenta regresiva en vivo + patrocinio + contacto
  Footer.tsx
public/img/                    assets extraídos del PDF del deck
public/video/                  fondos en loop
```

### Editar el contenido

Casi todo vive en `src/data/content.ts`: misión, objetivo, visión, valores, las
cuatro semanas con sus bloques y metas, equipo, recursos, prensa, aliados y contacto.
Cambiar ahí se refleja en toda la página.

Las fechas salen de `PROYECTO.inicioISO` / `PROYECTO.finISO`; la cuenta regresiva
del CTA se calcula sola desde `inicioISO`.

## Notas técnicas

**Hero — apego al spec.** Verificado contra la tabla §5 midiendo el DOM renderizado:
padding de 82px, CTAs de 51px con 27px horizontales, radio 12px, pill de auth con
sus 3px de padding y botones internos de 46px/24px, tarjeta con 33px de radio y
padding asimétrico (32px arriba/lados, 24px abajo), 32 barras con las 4 últimas en
`rgba(255,255,255,0.1)`, delays de 1100ms a 2030ms, 5 gridlines en 20/40/60/80/100%.

**Desviaciones deliberadas respecto al spec de referencia:**

0. **Paleta y video.** El spec pedía fondo azulado `#080A19`, botón claro `#E9E9E9`
   y un clip de nebulosa. Se cambió a naranja/dorado/negro/blanco con videos propios,
   por dirección del proyecto.

1. **`min-h-screen` en vez de `h-screen`** en el `<section>` del hero. Es idéntico
   en toda pantalla donde el contenido cabe. Donde no cabe (iPhone SE 375×667, o
   una laptop de 1024×800), `h-screen` + `overflow-hidden` recortaba la tarjeta:
   ahora la sección crece en vez de cortar.

2. **El video del hero se sirve local** (`/video/hero.mp4`). La URL de CloudFront
   del prompt original sigue anotada en `Hero.tsx` como `HERO_VIDEO_REMOTE`, pero
   además de no encajar con la paleta tenía el átomo `moov` al final del archivo:
   el navegador debía bajar los 6.3 MB completos antes de pintar el primer frame.

**Animaciones.** El hero usa sólo keyframes CSS con `animationDelay` (sin
IntersectionObserver, sin librerías), como pide el spec. De `Marquee` para abajo,
el reveal al hacer scroll sí usa IntersectionObserver (`src/components/Reveal.tsx`).
Todo respeta `prefers-reduced-motion`.

## Assets

Extraídos del PDF `Deck Brigada Educativa Bitcoin US26.pdf`:
logos de Escuela Bitcoin México, Investor House, Unlock Summit y Unlock Agency;
las ilustraciones 3D de Bitcoin; la nota de prensa; la foto y el QR de contacto.

### Videos

**`hero.mp4` — metraje real de Zacatlán.** Viene de `ZacatlanVideo.mov` (CapCut, HEVC
1920×1080, 30 fps, 25.4 s). Tres cosas obligaban a reprocesarlo:

- **HEVC no se reproduce en Chrome ni Firefox** — sólo Safari. Va transcodificado a H.264.
- El átomo `moov` estaba al final del archivo, así que el navegador tenía que bajarlo
  completo antes del primer cuadro. Reempaquetado con `+faststart`.
- Traía pista de audio, que un fondo no necesita.

Del máster se usan **sólo los tramos limpios: 0–2.24 s y 3.27–18.24 s**. El resto
(2.24–3.27 s y todo lo posterior a 18.24 s) tiene **interfaz de YouTube quemada en
imagen** — barra de progreso, botones de like y compartir, cursor — y la marca «Notas».
Si se re-exporta sin esos cortes, se puede aprovechar el metraje completo.

Corrección de color aplicada: `eq` lo oscurece levemente y sube contraste y saturación,
`colorbalance` lo calienta hacia el naranja de la paleta, y una viñeta suave cierra las
esquinas. Resultado: 1280×720, 24 fps, 17.2 s, **1.5 MB**, sin audio.

**`glow-orange.mp4` y `glow-gold.mp4`** siguen siendo generados con ffmpeg, en
**palíndromo** (la segunda mitad es la primera en reversa) para que el loop empate sin
salto. El color no viene de mezclar capas —eso salía magenta— sino de generar un campo
de **luminancia en gris** y mapearlo a una rampa naranja→dorada con `colorchannelmixer`
+ `curves`.

Los cuatro fondos se pausan al salir del viewport (`VideoFondo.tsx`) y respetan
`prefers-reduced-motion`.

### Legibilidad sobre metraje real

El fondo abstracto anterior era uniformemente oscuro; el metraje del pueblo llega a
YAVG 86. Por eso el hero lleva dos velos en degradado (fuerte a la izquierda donde va
el titular, transparente a la derecha para que se siga viendo Zacatlán) y la tarjeta de
estadística subió de `rgba(17,16,15,0.35)` a `rgba(10,8,6,0.62)` con blur de 24px.
Verificado contra el cuadro más brillante del clip.

### Moneda 3D

`Brigada.tsx` monta una moneda con transformaciones CSS 3D reales: dos caras
(`.moneda3d` + `.cara-reverso`, la de atrás espejeada) con `preserve-3d` girando
sobre el eje Y. Al pasar el mouse acelera de 14s a 4s por vuelta.
