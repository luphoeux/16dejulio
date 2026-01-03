// Data Manager - Sistema de guardado compartido entre creator y map
const DataManager = {
    STORAGE_KEY: 'feria16dejulio_map_data',

    // Guardar datos
    save(mapData) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mapData));
            console.log('✅ Datos guardados:', mapData.length, 'elementos');
            return true;
        } catch (error) {
            console.error('❌ Error al guardar:', error);
            return false;
        }
    },

    // Cargar datos
    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                console.log('✅ Datos cargados:', parsed.length, 'elementos');
                return parsed;
            }
            console.log('ℹ️ No hay datos guardados, usando array vacío');
            return [];
        } catch (error) {
            console.error('❌ Error al cargar:', error);
            return [];
        }
    },

    // Limpiar datos
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('🗑️ Datos eliminados');
    },

    // Exportar como JSON
    export() {
        const data = this.load();
        return JSON.stringify(data, null, 2);
    },

    // Importar desde JSON
    import(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.save(data);
            return true;
        } catch (error) {
            console.error('❌ Error al importar:', error);
            return false;
        }
    }
};

// Tipos de assets disponibles - TODOS MÚLTIPLOS EXACTOS DE 1 UNIDAD DE GRILLA
const AssetTypes = {
    // === ESTRUCTURAS ===
    PUESTO_PEQUENO: {
        id: 'puesto_pequeno',
        name: '🏪 Puesto 1x1',
        color: 0xFF6B35,
        size: { width: 1, height: 0.8, depth: 1 },
        gridSize: { width: 1, depth: 1 },
        category: 'estructura',
        icon: '🏪'
    },
    PUESTO_MEDIANO: {
        id: 'puesto_mediano',
        name: '🏬 Puesto 2x1',
        color: 0x3BCEAC,
        size: { width: 2, height: 1.2, depth: 1 },
        gridSize: { width: 2, depth: 1 },
        category: 'estructura',
        icon: '🏬'
    },
    PUESTO_GRANDE: {
        id: 'puesto_grande',
        name: '🏢 Puesto 2x2',
        color: 0xFFD23F,
        size: { width: 2, height: 1.5, depth: 2 },
        gridSize: { width: 2, depth: 2 },
        category: 'estructura',
        icon: '🏢'
    },
    RESTAURANTE: {
        id: 'restaurante',
        name: '🍽️ Restaurante 3x2',
        color: 0xE74C3C,
        size: { width: 3, height: 1.0, depth: 2 },
        gridSize: { width: 3, depth: 2 },
        category: 'estructura',
        icon: '🍽️'
    },
    TIENDA_ROPA: {
        id: 'tienda_ropa',
        name: '👕 Tienda 2x2',
        color: 0x9B59B6,
        size: { width: 2, height: 1.3, depth: 2 },
        gridSize: { width: 2, depth: 2 },
        category: 'estructura',
        icon: '👕'
    },
    MERCADO: {
        id: 'mercado',
        name: '🛒 Mercado 3x3',
        color: 0x2ECC71,
        size: { width: 3, height: 1.4, depth: 3 },
        gridSize: { width: 3, depth: 3 },
        category: 'estructura',
        icon: '🛒'
    },
    KIOSKO: {
        id: 'kiosko',
        name: '🎪 Kiosko 1x1',
        color: 0xF39C12,
        size: { width: 1, height: 0.6, depth: 1 },
        gridSize: { width: 1, depth: 1 },
        category: 'estructura',
        icon: '🎪'
    },
    ZONA_COMIDA: {
        id: 'zona_comida',
        name: '🌮 Comida 4x2',
        color: 0xE67E22,
        size: { width: 4, height: 0.8, depth: 2 },
        gridSize: { width: 4, depth: 2 },
        category: 'estructura',
        icon: '🌮'
    },

    // === TERRENOS ===
    PASTO: {
        id: 'pasto',
        name: '🌱 Pasto 1x1',
        color: 0x4CAF50,
        size: { width: 1, height: 0.05, depth: 1 },
        gridSize: { width: 1, depth: 1 },
        category: 'terreno',
        icon: '🌱'
    },
    PASTO_2X2: {
        id: 'pasto_2x2',
        name: '🌿 Pasto 2x2',
        color: 0x66BB6A,
        size: { width: 2, height: 0.05, depth: 2 },
        gridSize: { width: 2, depth: 2 },
        category: 'terreno',
        icon: '🌿'
    },
    CEMENTO: {
        id: 'cemento',
        name: '⬜ Cemento 1x1',
        color: 0x9E9E9E,
        size: { width: 1, height: 0.05, depth: 1 },
        gridSize: { width: 1, depth: 1 },
        category: 'terreno',
        icon: '⬜'
    },
    CEMENTO_2X2: {
        id: 'cemento_2x2',
        name: '⬛ Cemento 2x2',
        color: 0xBDBDBD,
        size: { width: 2, height: 0.05, depth: 2 },
        gridSize: { width: 2, depth: 2 },
        category: 'terreno',
        icon: '⬛'
    },
    TIERRA: {
        id: 'tierra',
        name: '🟫 Tierra 1x1',
        color: 0x8D6E63,
        size: { width: 1, height: 0.05, depth: 1 },
        gridSize: { width: 1, depth: 1 },
        category: 'terreno',
        icon: '🟫'
    },
    TIERRA_2X2: {
        id: 'tierra_2x2',
        name: '🟤 Tierra 2x2',
        color: 0xA1887F,
        size: { width: 2, height: 0.05, depth: 2 },
        gridSize: { width: 2, depth: 2 },
        category: 'terreno',
        icon: '🟤'
    },
    AGUA: {
        id: 'agua',
        name: '💧 Agua 1x1',
        color: 0x2196F3,
        size: { width: 1, height: 0.05, depth: 1 },
        gridSize: { width: 1, depth: 1 },
        category: 'terreno',
        icon: '💧'
    },
    AGUA_2X2: {
        id: 'agua_2x2',
        name: '💦 Agua 2x2',
        color: 0x42A5F5,
        size: { width: 2, height: 0.05, depth: 2 },
        gridSize: { width: 2, depth: 2 },
        category: 'terreno',
        icon: '💦'
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.DataManager = DataManager;
    window.AssetTypes = AssetTypes;
}
