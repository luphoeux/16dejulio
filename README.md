# 🗺️ Feria 16 de Julio - Mapa 3D Interactivo

Proyecto de mapa 3D interactivo de la Feria 16 de Julio con estilo cartoon inspirado en Overcooked.

## 📁 Estructura del Proyecto

```
16 de Julio - Mapa/
├── index.html          # Landing page principal (pública)
├── map.html            # Visor 3D interactivo (público)
├── creator.html        # Panel de creador (protegido)
├── styles.css          # Sistema de diseño
├── creator-backup.html # Backup del editor original
└── README.md           # Este archivo
```

## 🎯 Páginas

### 1. Landing Page (`index.html`)
- **Propósito**: Página principal pública
- **Características**:
  - Diseño vibrante estilo cartoon
  - Hero section con animaciones
  - Sección de características
  - Call-to-action
  - Totalmente responsive

### 2. Visor 3D (`map.html`)
- **Propósito**: Exploración pública del mapa
- **Características**:
  - Visualización 3D interactiva
  - Controles intuitivos (arrastrar, zoom)
  - Panel de estadísticas
  - Animaciones sutiles
  - Pantalla de carga y bienvenida

### 3. Panel de Creador (`creator.html`)
- **Propósito**: Herramienta de edición (solo para ti)
- **Características**:
  - Autenticación con contraseña
  - Modo construcción y borrado
  - Exportación de datos JSON
  - Interfaz mejorada con estilo cartoon
  - Indicador visual de modo activo

## 🔐 Acceso al Creator

**Contraseña por defecto**: `feria16dejulio2026`

Para cambiar la contraseña:
1. Abre `creator.html`
2. Busca la línea: `const CREATOR_PASSWORD = "feria16dejulio2026";`
3. Cambia el valor entre comillas
4. Guarda el archivo

## 🎮 Controles

### Visor Público (map.html)
- **Arrastrar**: Mover la cámara
- **Rueda del mouse**: Zoom in/out
- **Clic**: Seleccionar puesto (muestra animación)

### Panel de Creador (creator.html)
- **Arrastrar**: Mover la cámara
- **Rueda del mouse**: Zoom in/out
- **Clic**: Colocar puesto (modo construcción)
- **Clic**: Eliminar puesto (modo borrado)
- **Alt + Clic**: Eliminar puesto (en cualquier modo)

## 📐 Sistema de Grilla

**IMPORTANTE**: Todos los assets respetan una grilla exacta de 1x1 unidades.

### Tipos de Assets Disponibles:

| Asset | Tamaño en Grilla | Dimensiones 3D | Icono |
|-------|------------------|----------------|-------|
| Puesto 1x1 | 1x1 celdas | 1m x 0.8m x 1m | 🏪 |
| Puesto 2x1 | 2x1 celdas | 2m x 1.2m x 1m | 🏬 |
| Puesto 2x2 | 2x2 celdas | 2m x 1.5m x 2m | 🏢 |
| Restaurante 3x2 | 3x2 celdas | 3m x 1.0m x 2m | 🍽️ |
| Tienda 2x2 | 2x2 celdas | 2m x 1.3m x 2m | 👕 |
| Mercado 3x3 | 3x3 celdas | 3m x 1.4m x 3m | 🛒 |
| Kiosko 1x1 | 1x1 celdas | 1m x 0.6m x 1m | 🎪 |
| Comida 4x2 | 4x2 celdas | 4m x 0.8m x 2m | 🌮 |

### Características del Sistema de Grilla:

- ✅ **Alineación perfecta**: Todos los assets se alinean exactamente con la grilla
- ✅ **Sin solapamientos**: El sistema previene colocar assets que se solapen
- ✅ **Indicador visual**: El cursor fantasma cambia de color:
  - 🟢 Verde: Se puede colocar
  - 🔴 Rojo: Hay solapamiento
- ✅ **Múltiples tamaños**: Assets desde 1x1 hasta 4x2 celdas
- ✅ **Posicionamiento inteligente**: Los assets multi-celda se centran correctamente

## 🎨 Paleta de Colores

El proyecto usa una paleta vibrante inspirada en Overcooked:

- **Naranja Principal**: `#FF6B35`
- **Amarillo**: `#FFD23F`
- **Rojo**: `#EE4266`
- **Azul/Verde**: `#3BCEAC`
- **Púrpura**: `#9B59B6`
- **Fondo Crema**: `#FFF8E7`

## 🚀 Cómo Usar

### Desarrollo Local

1. Abre cualquier archivo HTML en tu navegador
2. Para el creator, usa la contraseña configurada
3. Los cambios se guardan en la sesión del navegador

### Exportar Datos

1. Accede a `creator.html`
2. Crea tu mapa colocando puestos
3. Haz clic en "💾 Exportar JSON"
4. Los datos se copian automáticamente al portapapeles
5. Pega los datos donde necesites

### Importar Datos al Visor

Para cargar datos reales en `map.html`:

1. Abre `map.html`
2. Busca la sección `// --- Sample Data (Demo) ---`
3. Reemplaza el array `demoStalls` con tus datos exportados
4. Guarda y recarga la página

## 📦 Tecnologías

- **Three.js**: Renderizado 3D
- **HTML5/CSS3**: Estructura y estilos
- **JavaScript ES6+**: Lógica e interactividad
- **Google Fonts**: Tipografía (Fredoka, Poppins)

## 🎯 Próximas Mejoras Sugeridas

- [ ] Sistema de guardado persistente (localStorage o backend)
- [ ] Diferentes tipos de puestos (comida, ropa, etc.)
- [ ] Búsqueda de puestos
- [ ] Información detallada de cada puesto
- [ ] Modo nocturno
- [ ] Exportar/importar datos desde archivo
- [ ] Miniaturas de productos en cada puesto
- [ ] Rutas y navegación entre puestos

## 📝 Notas

- El proyecto está diseñado para ser 100% frontend
- No requiere servidor para funcionar
- Los datos se pueden exportar/importar manualmente
- La autenticación es básica (solo frontend)

## 🤝 Soporte

Para cambios o mejoras, edita los archivos directamente:
- Estilos globales: `styles.css`
- Landing: `index.html`
- Visor: `map.html`
- Creator: `creator.html`

---

**Hecho con ❤️ para la Feria 16 de Julio**
