# 🗺️ Configuración del Mapa de Fondo

Este documento explica cómo configurar el mapa de fondo de referencia para el Creator Panel.

## 📍 Ubicación Actual

Por defecto, el mapa está configurado para la **Feria 16 de Julio** en El Alto, Bolivia:
- **Latitud**: -16.5000
- **Longitud**: -68.1500
- **Zoom**: 17

## 🔧 Cómo Cambiar la Ubicación

### Opción 1: Editar `map-config.js` (Recomendado)

1. Abre el archivo `map-config.js`
2. Modifica las coordenadas en el objeto `MapConfig`:

```javascript
const MapConfig = {
    center: {
        lat: -16.5000,  // ← Cambia esta latitud
        lng: -68.1500   // ← Cambia esta longitud
    },
    zoom: 17,           // ← Ajusta el nivel de zoom (15-20)
    opacity: 0.4,       // ← Opacidad del mapa (0.0-1.0)
    // ...
};
```

### Opción 2: Usar Google Maps API (Mejor Calidad)

Si quieres usar Google Maps en lugar de OpenStreetMap:

1. Obtén una API Key de Google Maps:
   - Ve a: https://console.cloud.google.com/google/maps-apis
   - Crea un proyecto
   - Habilita "Maps Static API"
   - Crea una API Key

2. Edita `map-config.js`:

```javascript
const MapConfig = {
    // ... otras configuraciones
    googleMapsApiKey: 'TU_API_KEY_AQUI',  // ← Pega tu API key
    useOpenStreetMap: false,              // ← Cambia a false
    mapType: 'satellite'                  // ← Tipo de mapa
};
```

### Tipos de Mapa Disponibles (Google Maps)

- `'roadmap'` - Mapa de calles estándar
- `'satellite'` - Vista satelital
- `'hybrid'` - Satelital con nombres de calles
- `'terrain'` - Mapa de terreno

## 🎯 Cómo Encontrar Coordenadas

### Método 1: Google Maps

1. Ve a [Google Maps](https://maps.google.com)
2. Busca la ubicación deseada
3. Haz clic derecho en el punto exacto
4. Selecciona "¿Qué hay aquí?"
5. Las coordenadas aparecerán abajo (formato: latitud, longitud)

### Método 2: OpenStreetMap

1. Ve a [OpenStreetMap](https://www.openstreetmap.org)
2. Busca la ubicación
3. Haz clic derecho → "Mostrar dirección"
4. Las coordenadas aparecen en la URL

## ⚙️ Configuraciones Adicionales

### Ajustar Opacidad

```javascript
opacity: 0.4,  // 0.0 = invisible, 1.0 = completamente opaco
```

Valores recomendados:
- `0.3` - Muy transparente (para ver bien la grilla)
- `0.4` - Balance (por defecto)
- `0.5` - Más visible

### Ajustar Zoom

```javascript
zoom: 17,  // Nivel de detalle
```

Valores recomendados:
- `15` - Vista amplia del área
- `17` - Balance (por defecto)
- `19` - Máximo detalle

## 🔄 Aplicar Cambios

Después de editar `map-config.js`:

1. Guarda el archivo
2. Recarga el `creator.html` (F5)
3. El nuevo mapa se cargará automáticamente

## 🐛 Solución de Problemas

### El mapa no se carga

**Posibles causas:**

1. **Sin conexión a internet**
   - Verifica tu conexión
   - El mapa se descarga desde servidores externos

2. **Coordenadas incorrectas**
   - Verifica que la latitud esté entre -90 y 90
   - Verifica que la longitud esté entre -180 y 180

3. **API Key inválida** (si usas Google Maps)
   - Verifica que la key esté correcta
   - Verifica que "Maps Static API" esté habilitada

### El mapa se ve borroso

- Aumenta el valor de `zoom` (prueba con 18 o 19)
- Si usas OpenStreetMap, considera cambiar a Google Maps

### El mapa está muy oscuro/claro

- Ajusta el valor de `opacity` en `map-config.js`

## 📝 Ejemplo Completo

```javascript
// Configuración para la Feria 16 de Julio
const MapConfig = {
    center: {
        lat: -16.5000,
        lng: -68.1500
    },
    zoom: 18,
    opacity: 0.35,
    mapType: 'satellite',
    googleMapsApiKey: '',
    useOpenStreetMap: true
};
```

## 💡 Tips

- **Usa OpenStreetMap** para desarrollo (gratis, sin límites)
- **Usa Google Maps** para producción (mejor calidad, requiere API key)
- **Ajusta la opacidad** según tus necesidades de visibilidad
- **Guarda diferentes configuraciones** comentadas para cambiar rápidamente

---

¿Necesitas ayuda? Revisa la consola del navegador (F12) para ver mensajes de debug sobre la carga del mapa.
