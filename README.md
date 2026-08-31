# SosTucumán

Es una aplicación web interactiva que conecta las necesidades de los vecinos con la gestión urbana municipal. Permite a los ciudadanos identificar problemas en la vía pública, categorizarlos, consultar los pasos de resolución, visualizar reclamos activos de otros vecinos y votar sobre la urgencia de los mismos.

---

## Integrantes

- **Carrizo Lucas**
- **Geronimo Sol**

---

## Tecnologías utilizadas

- **HTML5:** Marcado semántico estructurado (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:** Estilos , diseño responsivo mediante **CSS Grid**, **Flexbox**, **Variables CSS (Custom Properties)** y **Media Queries**.

---

## ¿Dónde utilizaron Flexbox?

Flexbox fue implementado en componentes unidimensionales donde se requería alineación, distribución de espacio y centrado dinámico:

1. **Header / Barra de navegación (`header`, `.nav-links`):**
   - Distribución horizontal de elementos (`justify-content: space-between; align-items: center;`).
   - Separación entre enlaces con `gap: 1.5rem`.
2. **Sección Principal / Hero (`.hero`, `.hero-buttons`):**
   - Centrado total del contenido hero horizontal y verticalmente (`justify-content: center; align-items: center;`).
   - Contenedor de botones (`flex-wrap: wrap; gap: 1rem;`).
3. **Botones de interacción de votos (`.reporte-votos`):**
   - Alineación horizontal y separación precisa de los botones de interacción (`👍` / `👎`).
4. **Pie de página (`.footer`):**
   - Distribución a 3 columnas horizontales balanceadas (`justify-content: space-between; align-items: center;`) con `flex: 1` para repartir el ancho en partes iguales.

---

## ¿Dónde utilizaron Grid?

CSS Grid se utilizó para la disposición bidimensional de tarjetas y secciones modulares de la aplicación:

1. **Grilla de Categorías (`.categorias-grid`):**
   - Estructura adaptable mediante `repeat(auto-fit, minmax(220px, 1fr))` con separación homogénea (`gap: 1.5rem`).
2. **Grilla de Pasos "¿Cómo funciona?" (`.como-funciona-grid`):**
   - Distribución estricta de 4 columnas iguales en desktop (`grid-template-columns: repeat(4, 1fr);`) con `gap: 1.5rem` y ancho unificado con el resto del contenido.
3. **Grilla de Reportes Activos (`.reportes-grid`):**
   - Maquetación en 3 columnas iguales (`grid-template-columns: repeat(3, 1fr);`) para las tarjetas de incidencias reportadas.

---

## ¿Qué variables CSS crearon?

Se definieron Custom Properties en el selector `:root`

### Paleta de Colores

- `--color-principal: #1d4ed8;` (Azul para botones y llamadas de atención).
- `--color-principal-hover: #1e40af;` (Azul oscuro para efectos hover).
- `--color-secundario: #0284c7;` (Azul intermedio / cian para bordes interactivos).
- `--color-fondo: #f8fafc;` (Gris claro de fondo general).
- `--color-tarjeta: #ffffff;` (Blanco puro para las tarjetas y contenedores elevados).
- `--color-texto: #0f172a;` (Azul oscuro de alto contraste para lectura).
- `--color-texto-mutado: #64748b;` (Gris para subtítulos y texto secundario).
- `--color-borde: #e2e8f0;` (Gris suave para líneas divisorias y bordes).

### Tipografía y Espaciados

- `--fuente-principal: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;`
- `--espaciado-xs: 0.5rem;` | `--espaciado-sm: 1rem;` | `--espaciado-md: 2rem;` | `--espaciado-lg: 4rem;`

### Geometría y Elevación

- `--radio-borde: 12px;` (Bordes redondeados uniformes).
- `--sombra-suave:` Sombra base sutil para elevación de tarjetas y header.
- `--sombra-hover:` Sombra profunda para feedback táctil/visual en hover.

---

## ¿Cómo implementaron el Responsive Design?

El Responsive Design se construyó combinando **unidades relativas (`%`, `rem`, `fr`)**, **layouts elásticos** y **Media Queries (`@media`)** estratégicos para garantizar una experiencia óptima en celulares, tablets y computadoras:

1. **Configuración de viewport:** Se incluyó `<meta name="viewport" content="width=device-width, initial-scale=1.0">` en el `<head>`.
2. **Reorganización de Grillas (Breakpoints en 900px y 600px):**
   - Las grillas de **"¿Cómo funciona?"** y **"Reportes activos"** pasan de 4 y 3 columnas en desktop a **2 columnas en tablets (`max-width: 900px`)** y a **1 columna completa en smartphones (`max-width: 600px`)**.
   - La sección de **Categorías** aprovecha `auto-fit` y `minmax` para acomodarse fluidamente según el ancho de pantalla.
3. **Transformación de Navegación y Footer (`max-width: 768px`):**
   - En pantallas medianas y chicas, el `header` y el `footer` cambian su orientación de fila a columna (`flex-direction: column;`), centrando los textos y enlaces de navegación con `flex-wrap: wrap` para evitar desbordes horizontales.
4. **Imágenes y Contenedores Fluidos:**
   - Las imágenes de las tarjetas usan `width: 100%` con `object-fit: cover` para mantener la proporción sin deformarse.
   - Contenedores principales limitados con `max-width: 1200px` y `padding: ... 5%` para que nunca toquen el borde de la pantalla.

   ## 🚀 Estrategias SEO, Estructura Semántica y Accesibilidad

En **SosTucumán** aplicamos buenas prácticas de posicionamiento orgánico (SEO), optimización _Responsive_ y maquetación semántica para mejorar el rastreo en motores de búsqueda y ofrecer una mejor experiencia de usuario.

---

### 1. Metadatos y SEO On-Page

- **Título (`<title>`):** Conciso y representativo (`SosTucumán`).
- **Descripción (`<meta name="description">`):** Resume el objetivo del sitio orientándose a intenciones de búsqueda locales (_"Plataforma ciudadana para reportar baches, luminarias rotas y microbasurales en Tucumán."_).
- **Palabras Clave (`<meta name="keywords">`):** Términos relevantes de búsqueda geolocalizada (`SosTucumán`, `reclamos Tucumán`, `reporte de baches`, `luminarias rotas`, `bacheo San Miguel de Tucumán`, `gestión urbana`).
- **Social Media / Open Graph:** Metadatos preparados para la generación de tarjetas enriquecidas al compartir en redes sociales y mensajería (`og:title`, `og:description`, `og:image`, `og:url`).

---

### 2. Estructura Semántica de HTML5

El proyecto está estructurado utilizando etiquetas semánticas para permitir que los motores de búsqueda (como Google) entiendan el contexto de cada sección del sitio:

- `<header>`: Encabezado principal con el logotipo/nombre de la app y la barra de navegación.
- `<nav>`: Contenedor exclusivo para los enlaces de navegación del sitio.
- `<main>`: Bloque con el contenido principal de la página.
- `<section>`: Delimitador de las distintas áreas contextuales (`#inicio`, `#categorias`, `#como-funciona`, `#reportes`).
- `<article>`: Tarjetas individuales de categorías, pasos del proceso y reportes activos.

---

### 3. Jerarquía Escalada de Encabezados (H1, H2, H3, H4)

Respetamos una jerarquía estricta sin saltar niveles de encabezados para facilitar la lectura técnica y la accesibilidad:

- **`<h1>`**: Un único encabezado principal con el nombre del proyecto (`SosTucumán`).
- **`<h2>`**: Encabezados para las secciones estratégicas principales:
  - _"Mejoremos nuestra ciudad juntos"_ (Sección Hero / Inicio)
  - _"¿Cómo funciona?"_ (Sección paso a paso)
- **`<h3>`**: Subencabezados para organizar secciones secundarias y los pasos del sistema:
  - _"Tipos de categorías"_
  - _"Reportes activos"_
  - Pasos numerados (`1. Marcá la ubicación`, `2. Subí una foto`, etc.)
- **`<h4>`**: Títulos específicos dentro de las tarjetas de categorías (`💡 Alumbrado`, `🕳️ Baches y calles`, etc.).

---

### 4. Accesibilidad y SEO en Imágenes (`alt`)

- **Atributo `alt` descriptivo:** Todas las imágenes representativas contienen un texto alternativo que describe el contenido de la imagen (`alt="Bache en calle"`, `alt="Semoforo fuera de servicio"`, `alt="Microbasural"`). Esto permite que los lectores de pantalla interpreten la imagen y que Google Images indexe el contenido visual.
- **Etiquetas de accesibilidad (`aria-label`):** Implementadas en botones basados en íconos/emojis (como `👍` y `👎`) para garantizar su comprensión en lectores de pantalla.

---

### 5. Diseño Adaptativo (_Responsive Design_)

- **Meta Viewport:** Inclusión de `<meta name="viewport" content="width=device-width, initial-scale=1.0">` para garantizar una correcta escala inicial en pantallas de smartphones y tablets.
- **Disposición Fluida y CSS Grid:** Uso de `CSS Grid` con `repeat(auto-fit, minmax(...))` y puntos de interrupción con `@media` queries a `900px`, `768px` y `600px`.
- **Experiencia Mobile-First:** Las grillas de categorías, los pasos de _"¿Cómo funciona?"_ y las tarjetas de _"Reportes activos"_ pasan automáticamente de un maquetado multicolumna a una sola columna en pantallas móviles para facilitar la lectura y navegación con un solo pulgar.
