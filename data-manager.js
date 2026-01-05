// Data Manager - Sistema de guardado compartido entre creator y map
const DataManager = {
  STORAGE_KEY: "feria16dejulio_map_data",
  COLLECTION: "map_instances",

  // Guardar datos (Local)
  save(mapData) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mapData));
      console.log("✅ Datos guardados localmente:", mapData.length, "elementos");
      return true;
    } catch (error) {
      console.error("❌ Error al guardar localmente:", error);
      return false;
    }
  },

  // Cargar datos (Local)
  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        console.log("✅ Datos cargados localmente:", parsed.length, "elementos");
        return parsed;
      }
      return [];
    } catch (error) {
      console.error("❌ Error al cargar localmente:", error);
      return [];
    }
  },

  // === FIRESTORE INTEGRATION ===
  
  async saveToCloud(mapData, db) {
    try {
      const { doc, setDoc, collection, writeBatch } = window.FirebaseFirestore;
      const batch = writeBatch(db);
      
      mapData.forEach(item => {
        // Garantizar ID único
        if (!item.id) item.id = crypto.randomUUID();
        const docRef = doc(db, this.COLLECTION, item.id);
        batch.set(docRef, item);
      });

      await batch.commit();
      console.log("☁️ Datos sincronizados con Firestore");
      return true;
    } catch (error) {
      console.error("❌ Error al guardar en Cloud:", error);
      return false;
    }
  },

  async loadFromCloud(db) {
    try {
      const { getDocs, collection } = window.FirebaseFirestore;
      const querySnapshot = await getDocs(collection(db, this.COLLECTION));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log("☁️ Datos cargados desde Firestore:", data.length);
      return data;
    } catch (error) {
      console.error("❌ Error al cargar de Cloud:", error);
      return null; // Retornar null para indicar fallo y usar fallback
    }
  },

  // Limpiar datos
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log("🗑️ Datos eliminados");
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
      console.error("❌ Error al importar:", error);
      return false;
    }
  },
};

// Tipos de assets disponibles - TODOS MÚLTIPLOS EXACTOS DE 1 UNIDAD DE GRILLA
const AssetTypes = {
  // === ESTRUCTURAS ===
  // === ESTRUCTURAS ===
  S_1X1: {
    id: "s_1x1",
    name: "🏢 Estructura 1x1",
    color: 0xff6b35,
    size: { width: 1, height: 1.0, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/1x1.glb"
  },
  S_2X2: {
    id: "s_2x2",
    name: "🏢 Estructura 2x2",
    color: 0x3bceac,
    size: { width: 2, height: 1.2, depth: 2 },
    gridSize: { width: 2, depth: 2 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/2x2.glb"
  },
  S_3X3: {
    id: "s_3x3",
    name: "🏢 Estructura 3x3",
    color: 0xffd23f,
    size: { width: 3, height: 1.5, depth: 3 },
    gridSize: { width: 3, depth: 3 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/3x3.glb"
  },
  S_2X4: {
    id: "s_2x4",
    name: "🏢 Estructura 2x4",
    color: 0xe74c3c,
    size: { width: 2, height: 1.2, depth: 4 },
    gridSize: { width: 2, depth: 4 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/2x4.glb"
  },
  S_6X3: {
    id: "s_6x3",
    name: "🏢 Estructura 6x3",
    color: 0x9b59b6,
    size: { width: 6, height: 1.5, depth: 3 },
    gridSize: { width: 6, depth: 3 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/6x3.glb"
  },
  S_5X4: {
    id: "s_5x4",
    name: "🏢 Estructura 5x4",
    color: 0x2ecc71,
    size: { width: 5, height: 1.5, depth: 4 },
    gridSize: { width: 5, depth: 4 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/5x4.glb"
  },
  S_4X4: {
    id: "s_4x4",
    name: "🏢 Estructura 4x4",
    color: 0xf39c12,
    size: { width: 4, height: 1.6, depth: 4 },
    gridSize: { width: 4, depth: 4 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/4x4.glb"
  },
  S_4X3: {
    id: "s_4x3",
    name: "🏢 Estructura 4x3",
    color: 0xe67e22,
    size: { width: 4, height: 1.4, depth: 3 },
    gridSize: { width: 4, depth: 3 },
    category: "estructura",
    icon: "🏢",
    modelPath: "assets/4x3.glb"
  },

  // === TERRENOS ===
  CALZADA: {
    id: "calzada",
    name: "🛣️ Calzada",
    color: 0x333333,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "🛣️",
  },
  ASFALTO: {
    id: "asfalto",
    name: "🌑 Asfalto Nuevo",
    color: 0x1a1a1a,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "🌑",
  },
  CEMENTO: {
    id: "cemento",
    name: "⬜ Cemento Oscuro",
    color: 0x4d4d4d,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "⬜",
  },
  PASTO: {
    id: "pasto",
    name: "🌱 Pasto Profundo",
    color: 0x2d5a27,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "🌱",
  },
  ARENA: {
    id: "arena",
    name: "⏳ Arena",
    color: 0xd2b48c,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "⏳",
  },
  TIERRA: {
    id: "tierra",
    name: "🟫 Tierra Seca",
    color: 0x5d4037,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "🟫",
  },
  AGUA: {
    id: "agua",
    name: "💧 Agua",
    color: 0x1565c0,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "💧",
  },
  LADRILLO_PISO: {
    id: "ladrillo_piso",
    name: "🧱 Ladrillo Piso",
    color: 0xbf360c,
    size: { width: 1, height: 0.05, depth: 1 },
    gridSize: { width: 1, depth: 1 },
    category: "terreno",
    icon: "🧱",
  },
};

// === FUNCIONES GLOBALES DE EXPORTACIÓN/IMPORTACIÓN ===

// Exportar mapa a archivo JSON
window.exportMapToFile = function() {
  try {
    const mapData = DataManager.load();
    if (!mapData || mapData.length === 0) {
      alert('⚠️ No hay datos para exportar');
      return;
    }

    const dataStr = JSON.stringify(mapData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mapa-16julio-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    console.log('📥 Mapa exportado:', mapData.length, 'elementos');
    if (window.showNotification) {
      window.showNotification(`✅ Exportado: ${mapData.length} elementos`);
    }
  } catch (error) {
    console.error('❌ Error al exportar:', error);
    alert('❌ Error al exportar el mapa');
  }
};

// Importar mapa desde archivo JSON
window.importMapFromFile = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const mapData = JSON.parse(e.target.result);
      
      if (!Array.isArray(mapData)) {
        throw new Error('Formato inválido');
      }

      const confirm = window.confirm(
        `¿Importar ${mapData.length} elementos?\n\n` +
        `⚠️ Esto reemplazará el mapa actual.`
      );

      if (confirm) {
        DataManager.save(mapData);
        console.log('📤 Mapa importado:', mapData.length, 'elementos');
        if (window.showNotification) {
          window.showNotification(`✅ Importado: ${mapData.length} elementos`);
        }
        
        // Recargar la página para aplicar cambios
        setTimeout(() => location.reload(), 1000);
      }
    } catch (error) {
      console.error('❌ Error al importar:', error);
      alert('❌ Error: Archivo JSON inválido');
    }
  };
  reader.readAsText(file);
  
  // Reset input para permitir reimportar el mismo archivo
  event.target.value = '';
};

// Subir datos locales a Firestore
window.syncToFirestore = async function() {
  try {
    const mapData = DataManager.load();
    if (!mapData || mapData.length === 0) {
      alert('⚠️ No hay datos locales para subir');
      return;
    }

    if (!window.db) {
      alert('❌ Firestore no está inicializado');
      return;
    }

    const confirm = window.confirm(
      `¿Subir ${mapData.length} elementos a Firestore?\n\n` +
      `☁️ Esto sincronizará tu mapa local con la nube.`
    );

    if (!confirm) return;

    if (window.showNotification) {
      window.showNotification('⏳ Subiendo a Firestore...');
    }

    const success = await DataManager.saveToCloud(mapData, window.db);
    
    if (success) {
      console.log('☁️ Sincronizado con Firestore:', mapData.length, 'elementos');
      if (window.showNotification) {
        window.showNotification(`✅ Subido a Firestore: ${mapData.length} elementos`);
      }
    } else {
      alert('❌ Error al subir a Firestore');
    }
  } catch (error) {
    console.error('❌ Error en syncToFirestore:', error);
    alert('❌ Error al sincronizar con Firestore');
  }
};

// Descargar datos de Firestore a local
window.downloadFromFirestore = async function() {
  try {
    if (!window.db) {
      alert('❌ Firestore no está inicializado');
      return;
    }

    const confirm = window.confirm(
      '¿Descargar mapa desde Firestore?\n\n' +
      '⚠️ Esto reemplazará tu mapa local actual.'
    );

    if (!confirm) return;

    if (window.showNotification) {
      window.showNotification('⏳ Descargando de Firestore...');
    }

    const cloudData = await DataManager.loadFromCloud(window.db);
    
    if (cloudData && cloudData.length > 0) {
      DataManager.save(cloudData);
      console.log('⬇️ Descargado de Firestore:', cloudData.length, 'elementos');
      if (window.showNotification) {
        window.showNotification(`✅ Descargado: ${cloudData.length} elementos`);
      }
      
      // Recargar para aplicar cambios
      setTimeout(() => location.reload(), 1000);
    } else {
      alert('⚠️ No hay datos en Firestore o error al descargar');
    }
  } catch (error) {
    console.error('❌ Error en downloadFromFirestore:', error);
    alert('❌ Error al descargar de Firestore');
  }
};

// Exportar para uso global
if (typeof window !== "undefined") {
  window.DataManager = DataManager;
  window.AssetTypes = AssetTypes;
}
