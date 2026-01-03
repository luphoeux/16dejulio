// Configuración del Mapa de Fondo
// Edita estos valores para ajustar el mapa de referencia

const MapConfig = {
    // Coordenadas exactas de la Feria 16 de Julio, El Alto, Bolivia
    // Basadas en las imágenes proporcionadas
    center: {
        lat: -16.5000,  // Latitud (zona 16 de Julio)
        lng: -68.1500   // Longitud (El Alto)
    },

    // Nivel de zoom (15-20 recomendado para detalles)
    // 17 = Vista de calles, 18 = Vista de edificios, 19 = Máximo detalle
    zoom: 18,

    // Opacidad del mapa de fondo (0.0 = invisible, 1.0 = opaco)
    opacity: 0.5,

    // Tipo de mapa (solo para Google Maps)
    mapType: 'satellite', // 'roadmap', 'satellite', 'hybrid', 'terrain'

    // Google Maps API Key
    // IMPORTANTE: Para usar Google Maps, necesitas una API key
    // Obtén tu key en: https://console.cloud.google.com/google/maps-apis
    // 1. Crea un proyecto
    // 2. Habilita "Maps Static API"
    // 3. Crea una API Key
    // 4. Pégala aquí:
    googleMapsApiKey: '', // ← Pega tu API key aquí

    // Usar OpenStreetMap como alternativa gratuita
    // true = OpenStreetMap (gratis, sin API key)
    // false = Google Maps (requiere API key, mejor calidad)
    useOpenStreetMap: true,

    // Tamaño del área del mapa (en tiles)
    // Para mapas grandes, puedes cargar múltiples tiles
    mapSize: {
        width: 640,  // Ancho en píxeles
        height: 640  // Alto en píxeles
    }
};

// Función para obtener la URL del mapa
function getMapURL() {
    if (MapConfig.googleMapsApiKey && !MapConfig.useOpenStreetMap) {
        // === OPCIÓN 1: Google Maps Static API ===
        const { lat, lng } = MapConfig.center;
        const zoom = MapConfig.zoom;
        const { width, height } = MapConfig.mapSize;
        const apiKey = MapConfig.googleMapsApiKey;
        const mapType = MapConfig.mapType;

        // URL de Google Maps Static API
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=${mapType}&key=${apiKey}`;
    } else {
        // === OPCIÓN 2: OpenStreetMap (Gratuito) ===
        const { lat, lng } = MapConfig.center;
        const osmZoom = MapConfig.zoom;
        const scale = Math.pow(2, osmZoom);
        const worldCoordX = ((lng + 180) / 360) * scale;
        const worldCoordY = ((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2) * scale;
        const tileX = Math.floor(worldCoordX);
        const tileY = Math.floor(worldCoordY);

        // URL de OpenStreetMap Tile Server
        // Nota: Para áreas grandes, necesitarás cargar múltiples tiles
        return `https://tile.openstreetmap.org/${osmZoom}/${tileX}/${tileY}.png`;
    }
}

// Exportar para uso en otros archivos
if (typeof window !== 'undefined') {
    window.MapConfig = MapConfig;
    window.getMapURL = getMapURL;
}
