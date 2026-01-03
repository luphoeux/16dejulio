# 🗺️ Cómo Conectar Google Maps

## ¿Por qué Google Maps?

Google Maps ofrece:
- ✅ **Mejor calidad** de imágenes satelitales
- ✅ **Más actualizado** que OpenStreetMap
- ✅ **Vista híbrida** (satélite + nombres de calles)
- ✅ **Mapas más grandes** (hasta 640x640 píxeles)

## 📋 Pasos para Obtener tu API Key

### Paso 1: Crear Cuenta de Google Cloud

1. Ve a: https://console.cloud.google.com
2. Inicia sesión con tu cuenta de Google
3. Acepta los términos de servicio

### Paso 2: Crear un Proyecto

1. Haz clic en el selector de proyectos (arriba a la izquierda)
2. Clic en "Nuevo Proyecto"
3. Nombre del proyecto: `Mapa Feria 16 de Julio`
4. Clic en "Crear"
5. Espera unos segundos a que se cree

### Paso 3: Habilitar Maps Static API

1. En el menú lateral, ve a: **APIs y servicios** → **Biblioteca**
2. Busca: `Maps Static API`
3. Haz clic en el resultado
4. Clic en el botón **"HABILITAR"**
5. Espera a que se habilite (unos segundos)

### Paso 4: Crear una API Key

1. En el menú lateral, ve a: **APIs y servicios** → **Credenciales**
2. Clic en **"+ CREAR CREDENCIALES"** (arriba)
3. Selecciona **"Clave de API"**
4. Se creará tu API key
5. **¡COPIA LA KEY!** (se ve algo así: `AIzaSyD...`)

### Paso 5: Configurar Restricciones (Opcional pero Recomendado)

Para mayor seguridad:

1. En la pantalla de la API key, clic en **"Editar clave de API"**
2. En "Restricciones de aplicación":
   - Selecciona **"Referentes HTTP (sitios web)"**
   - Agrega: `file://*` (para desarrollo local)
3. En "Restricciones de API":
   - Selecciona **"Restringir clave"**
   - Marca solo: **Maps Static API**
4. Clic en **"GUARDAR"**

### Paso 6: Configurar en el Proyecto

1. Abre el archivo `map-config.js`
2. Encuentra la línea:
   ```javascript
   googleMapsApiKey: '', // ← Pega tu API key aquí
   ```
3. Pega tu API key entre las comillas:
   ```javascript
   googleMapsApiKey: 'AIzaSyD...TU_KEY_AQUI...', 
   ```
4. Cambia a Google Maps:
   ```javascript
   useOpenStreetMap: false, // ← Cambia a false
   ```
5. **Guarda el archivo**

### Paso 7: Ajustar Coordenadas Exactas

Para obtener las coordenadas exactas de la Feria 16 de Julio:

1. Ve a: https://www.google.com/maps
2. Busca: `Feria 16 de Julio, El Alto, Bolivia`
3. Haz clic derecho en el **centro exacto** del área que quieres mapear
4. Selecciona **"¿Qué hay aquí?"**
5. Verás las coordenadas abajo (ejemplo: `-16.5000, -68.1500`)
6. Copia esas coordenadas
7. En `map-config.js`, actualiza:
   ```javascript
   center: {
       lat: -16.5000,  // ← Tu latitud
       lng: -68.1500   // ← Tu longitud
   }
   ```

## 🎯 Configuración Recomendada para Área Grande

```javascript
const MapConfig = {
    center: {
        lat: -16.5000,  // Coordenadas exactas
        lng: -68.1500
    },
    zoom: 18,           // 18 = Edificios visibles, 19 = Máximo detalle
    opacity: 0.5,       // 50% transparente para ver la grilla
    mapType: 'satellite', // Vista satelital
    googleMapsApiKey: 'TU_API_KEY_AQUI',
    useOpenStreetMap: false,
    mapSize: {
        width: 640,     // Máximo permitido por Google
        height: 640
    }
};
```

## 💰 Costos

Google Maps tiene una capa gratuita:

- **$200 USD de crédito gratis** cada mes
- Maps Static API: **$2 por cada 1000 cargas**
- Con $200 gratis = **100,000 cargas gratis al mes**
- Para desarrollo local, casi nunca pagarás

**Importante**: 
- Configura un límite de gasto en Google Cloud Console
- Para este proyecto de desarrollo, no deberías gastar nada

## 🔧 Solución de Problemas

### "This API project is not authorized to use this API"

**Solución**: 
1. Verifica que **Maps Static API** esté habilitada
2. Espera 1-2 minutos después de habilitar
3. Recarga la página

### "API key not valid"

**Solución**:
1. Verifica que copiaste la key completa
2. Verifica que no haya espacios antes/después
3. Si agregaste restricciones, verifica que `file://*` esté permitido

### El mapa no se carga

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica tu conexión a internet
4. Verifica que `useOpenStreetMap: false`

### "RefererNotAllowedMapError"

**Solución**:
1. Ve a Credenciales en Google Cloud
2. Edita tu API key
3. En "Restricciones de aplicación" → "Referentes HTTP"
4. Agrega: `file://*`
5. Guarda

## 📸 Tipos de Mapa Disponibles

Puedes cambiar el tipo de mapa en `map-config.js`:

```javascript
mapType: 'satellite',  // ← Cambia esto
```

Opciones:
- `'satellite'` - Vista satelital (recomendado para mapear)
- `'roadmap'` - Mapa de calles estándar
- `'hybrid'` - Satelital + nombres de calles
- `'terrain'` - Mapa de terreno

## ✅ Verificar que Funciona

Después de configurar:

1. Abre `creator.html`
2. Ingresa la contraseña
3. Espera unos segundos
4. En la consola (F12) deberías ver:
   ```
   ✅ Mapa de fondo cargado
   📍 Ubicación: -16.5, -68.15
   ```
5. Haz clic en el botón **"🖼️ Fondo"** para ver/ocultar el mapa

## 🎨 Ajustar Visibilidad

Si el mapa tapa mucho la grilla:

```javascript
opacity: 0.3,  // Más transparente (30%)
opacity: 0.5,  // Balance (50%)
opacity: 0.7,  // Más visible (70%)
```

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que la API key esté correcta
3. Asegúrate de que Maps Static API esté habilitada
4. Espera 1-2 minutos después de crear la key

---

**¡Listo!** Ahora tendrás un mapa de Google Maps de alta calidad como fondo de referencia para dibujar tu mapa de la Feria 16 de Julio.
