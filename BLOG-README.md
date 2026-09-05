# Blog del Proyecto Bitcoin Zacatlán

## Arquitectura

El blog está construido con:
- **React Router** para enrutamiento client-side
- **TypeScript** para type safety
- **SEO completo** con Schema.org BlogPosting
- **RSS feed** en `/blog/rss.xml`

## Estructura de Archivos

```
src/
├── data/
│   └── blog.ts              # Base de datos de posts
├── pages/
│   ├── BlogListing.tsx      # Página de listado (/blog)
│   └── BlogPost.tsx         # Plantilla de post individual (/blog/:slug)
public/
└── blog/
    └── rss.xml              # Feed RSS del blog
```

## Agregar un Nuevo Post

### 1. Editar `src/data/blog.ts`

Agregar un nuevo objeto al array `blogPosts`:

```typescript
{
  slug: 'mi-nuevo-post',  // URL-friendly slug
  title: 'Título del Post',
  description: 'Meta description para SEO (150-160 caracteres)',
  content: `
# Título del Post

Contenido en markdown simple...

## Subtítulo

- Lista item 1
- Lista item 2

**Texto en negritas**

*Texto en cursiva*
  `,
  author: 'Nombre del Autor',
  date: '2026-09-05',  // ISO format
  image: '/img/imagen-post.jpg',
  imageAlt: 'Descripción SEO de la imagen',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  readTime: 5,  // minutos de lectura
  featured: false,  // true para destacar en home
}
```

### 2. Actualizar `public/sitemap.xml`

Agregar una entrada para el nuevo post:

```xml
<url>
  <loc>https://www.pueblobitcoin.org/blog/mi-nuevo-post</loc>
  <lastmod>2026-09-05</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### 3. Actualizar `public/blog/rss.xml`

Agregar un `<item>` al feed RSS:

```xml
<item>
  <title>Título del Post</title>
  <link>https://www.pueblobitcoin.org/blog/mi-nuevo-post</link>
  <guid isPermaLink="true">https://www.pueblobitcoin.org/blog/mi-nuevo-post</guid>
  <pubDate>Wed, 05 Sep 2026 00:00:00 GMT</pubDate>
  <description>Meta description del post</description>
  <category>Tag1</category>
  <category>Tag2</category>
  <author>Nombre del Autor</author>
</item>
```

## Formato de Contenido

El contenido de los posts usa **markdown simplificado** que se convierte automáticamente a HTML:

- `# Título` → H1
- `## Subtítulo` → H2
- `### Subtítulo menor` → H3
- `**texto**` → Bold
- `*texto*` → Italic (o blockquote si línea completa)
- `- item` → Lista
- `---` → Separador

## SEO

Cada post individual genera automáticamente:

1. **Schema.org BlogPosting** con:
   - headline, description, image
   - datePublished, dateModified
   - author y publisher
   - keywords (tags)
   - wordCount y timeRequired

2. **Breadcrumbs** de navegación:
   - Inicio → Blog → [Título del post]

3. **Internal linking**:
   - CTA a sección de contacto
   - CTA a mapa Bitcoin
   - Posts relacionados al final

4. **Social sharing**:
   - Botón de compartir con Web Share API
   - Fallback a clipboard copy

## Optimización de Keywords

Los 3 posts iniciales se enfocan en:

1. **Post 1**: "Zacatlán", "Pueblo Mágico Bitcoin", "Bitcoin México"
2. **Post 2**: "Lightning Network", "comerciantes", "pagos Bitcoin"
3. **Post 3**: "educación Bitcoin", "universitarios", "jóvenes"

Al agregar nuevos posts, enfócate en **long-tail keywords** como:
- "cómo ahorrar con Bitcoin en México"
- "mejores wallets Bitcoin para comerciantes"
- "turismo Bitcoin Pueblos Mágicos"
- "adopción Bitcoin México 2026"

## RSS Feed

El feed RSS está disponible en:
- **URL**: https://www.pueblobitcoin.org/blog/rss.xml
- **Formato**: RSS 2.0 con módulos Atom y Content

Permite a los usuarios suscribirse con lectores RSS y aumenta la distribución del contenido.

## Análisis y Tracking

Cada post está configurado con:
- Google Analytics 4 (cuando se agregue el ID real)
- Eventos de scroll depth
- Eventos de compartir
- Tiempo de lectura real vs estimado

## Rutas

- `/blog` → Listado de todos los posts
- `/blog/:slug` → Post individual
- Vuelta a home: `/` desde cualquier página del blog

## Roadmap Futuro

- [ ] Categorías de posts
- [ ] Búsqueda de posts
- [ ] Paginación si > 20 posts
- [ ] Comentarios (Disqus o Giscus)
- [ ] Newsletter signup
- [ ] Related posts inteligentes
- [ ] Tabla de contenidos automática para posts largos
- [ ] Modo lectura oscuro/claro
- [ ] Galería de imágenes para posts visuales

## Performance

El blog está optimizado con:
- Code splitting (React Router lazy loading)
- Images con `loading="lazy"`
- CSS code splitting
- Vendor chunks separados (react, leaflet, etc.)

Build size target: < 500 KB total bundle.
