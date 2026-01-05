# 📦 Guía de Exportación/Importación de Mapas

## 🎯 Workflow Recomendado: Local → Producción

### 1️⃣ **Desarrollo Local**

Trabaja en tu mapa localmente sin afectar producción:

```bash
# Inicia el emulador local
firebase emulators:start --only hosting

# Abre el creator
http://localhost:5000/creator.html
```

- ✅ Todos los cambios se guardan en **LocalStorage**
- ✅ No afecta la base de datos de producción
- ✅ Puedes experimentar libremente

### 2️⃣ **Guardar Progreso**

Mientras trabajas:

1. **Guardar Local** (💾): Guarda en LocalStorage del navegador
2. **Exportar JSON** (📥): Descarga un archivo `.json` como backup

**Recomendación**: Exporta JSON frecuentemente como respaldo

### 3️⃣ **Exportar Mapa Terminado**

Cuando termines de editar:

1. Click en **"📥 Exportar JSON"**
2. Se descarga: `mapa-16julio-2026-01-05.json`
3. Guarda este archivo en un lugar seguro

### 4️⃣ **Subir a Producción**

Dos opciones:

#### Opción A: Subir Directamente desde Local

1. Click en **"☁️ Subir a Firestore"**
2. Confirma la acción
3. ✅ Tu mapa local se sube a producción

#### Opción B: Importar JSON y Luego Subir

1. Click en **"📤 Importar JSON"**
2. Selecciona tu archivo `.json`
3. Confirma la importación
4. Click en **"☁️ Subir a Firestore"**

### 5️⃣ **Verificar en Producción**

1. Abre: https://dejulio3d.web.app/map.html
2. Verifica que el mapa se vea correctamente
3. Revisa Firestore Console para ver los datos

## 🔄 Casos de Uso

### Backup del Mapa Actual

```
1. Exportar JSON (📥)
2. Guardar archivo en carpeta de backups
```

### Restaurar desde Backup

```
1. Importar JSON (📤)
2. Seleccionar archivo de backup
3. Confirmar
```

### Sincronizar Local ↔️ Producción

```
Subir:    Local → Firestore (☁️ Subir a Firestore)
Bajar:    Firestore → Local (⬇️ Bajar de Firestore)
```

### Migrar Entre Ambientes

```
1. En ambiente A: Exportar JSON
2. En ambiente B: Importar JSON
3. Subir a Firestore de B
```

## ⚠️ Advertencias Importantes

### Al Importar JSON

- ⚠️ **Reemplaza** todo el mapa local actual
- 💡 Exporta primero si quieres conservar el actual

### Al Subir a Firestore

- ☁️ Sincroniza con producción
- 👥 Afecta a todos los usuarios del visor
- 💡 Verifica primero en local antes de subir

### Al Bajar de Firestore

- ⬇️ **Reemplaza** tu mapa local
- 💡 Exporta tu trabajo local primero si quieres conservarlo

## 📊 Estructura del JSON

El archivo exportado tiene esta estructura:

```json
[
  {
    "id": "uuid-único",
    "x": 5,
    "z": 10,
    "assetType": "s_2x2",
    "rotation": 0,
    "layer": 1,
    "category": "estructura"
  },
  {
    "x": 3,
    "z": 4,
    "assetType": "pasto",
    "rotation": 0,
    "layer": 0,
    "category": "terreno"
  }
]
```

## 🛠️ Comandos de Firebase

### Ver Datos en Firestore Console

```
https://console.firebase.google.com/project/dejulio3d/firestore
```

### Exportar Backup desde Firebase CLI

```bash
firebase firestore:export gs://dejulio3d.appspot.com/backups/$(date +%Y%m%d)
```

### Importar Backup desde Firebase CLI

```bash
firebase firestore:import gs://dejulio3d.appspot.com/backups/20260105
```

## 📝 Mejores Prácticas

1. **Exporta frecuentemente** durante el desarrollo
2. **Nombra tus backups** con fechas descriptivas
3. **Prueba en local** antes de subir a producción
4. **Mantén backups** de versiones importantes
5. **Documenta cambios** significativos

## 🔍 Troubleshooting

### "No hay datos para exportar"

- Asegúrate de haber guardado algo primero (💾 Guardar Local)

### "Firestore no está inicializado"

- Verifica que `firebase-bridge.js` tenga las credenciales correctas
- Revisa la consola del navegador para errores

### "Error al subir a Firestore"

- Verifica las reglas de seguridad en Firestore
- Asegúrate de tener conexión a internet
- Revisa los límites de cuota de Firebase

### El mapa no se ve en producción

- Espera unos segundos para la sincronización
- Recarga la página del visor
- Verifica en Firestore Console que los datos estén ahí

## 📞 Soporte

Si tienes problemas:

1. Revisa la consola del navegador (F12)
2. Verifica Firestore Console
3. Abre un issue en GitHub

---

✅ **Recuerda**: Siempre exporta JSON antes de hacer cambios importantes
