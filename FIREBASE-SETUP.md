# 🔥 Guía de Configuración de Firebase Backend

Esta guía te llevará paso a paso para configurar Firebase y desplegar tu aplicación.

## 📋 Requisitos Previos

- Cuenta de Google
- Firebase CLI instalado (`npm install -g firebase-tools`)
- Proyecto local listo

## 🚀 Paso 1: Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en **"Agregar proyecto"**
3. Configura:
   - **Nombre**: `Mapa 16 de Julio`
   - **ID**: `mapa-16-julio` (o personalizado)
   - **Google Analytics**: Opcional (desactiva para ir más rápido)
4. Click en **"Crear proyecto"**
5. Espera a que se cree (30-60 segundos)

## 🗄️ Paso 2: Configurar Firestore Database

1. En el menú lateral, click en **"Firestore Database"**
2. Click en **"Crear base de datos"**
3. Selecciona:
   - **Modo**: Producción
   - **Ubicación**: `us-central` (o más cercana)
4. Click en **"Habilitar"**

## 🔐 Paso 3: Configurar Reglas de Seguridad

1. En Firestore, ve a la pestaña **"Reglas"**
2. Reemplaza el contenido con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /maps/{mapId} {
      allow read: if true;
      allow write: if request.auth != null ||
                      request.resource.data.source == 'creator';
    }

    match /structures/{structureId} {
      allow read: if true;
      allow write: if request.auth != null ||
                      request.resource.data.source == 'creator';
    }
  }
}
```

3. Click en **"Publicar"**

## 🌐 Paso 4: Registrar App Web

1. En **Configuración del proyecto** (⚙️ arriba a la izquierda)
2. Baja hasta **"Tus apps"**
3. Click en el ícono **web** `</>`
4. Configura:
   - **Nombre**: `Mapa 16 de Julio Web`
   - ✅ **Marcar**: "Configurar también Firebase Hosting"
5. Click en **"Registrar app"**

## 🔑 Paso 5: Copiar Credenciales

Verás algo como esto:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "mapa-16-julio.firebaseapp.com",
  projectId: "mapa-16-julio",
  storageBucket: "mapa-16-julio.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};
```

**¡COPIA ESTOS VALORES!** Los necesitarás en el siguiente paso.

## 📝 Paso 6: Actualizar Código Local

1. Abre `firebase-bridge.js`
2. Reemplaza los valores de `firebaseConfig` con los que copiaste:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI", // ← Pega aquí
  authDomain: "TU_AUTH_DOMAIN_AQUI", // ← Pega aquí
  projectId: "mapa-16-julio", // ← Pega aquí
  storageBucket: "TU_STORAGE_BUCKET", // ← Pega aquí
  messagingSenderId: "TU_SENDER_ID", // ← Pega aquí
  appId: "TU_APP_ID", // ← Pega aquí
};
```

3. Guarda el archivo

## 🚀 Paso 7: Desplegar a Firebase

Abre la terminal en la carpeta del proyecto:

```bash
# 1. Login a Firebase (si no lo has hecho)
firebase login

# 2. Inicializar Firebase (si es primera vez)
firebase init

# Cuando te pregunte:
# - ¿Qué servicios? → Firestore, Hosting
# - ¿Usar proyecto existente? → Sí
# - ¿Qué proyecto? → mapa-16-julio
# - ¿Archivo de reglas? → firestore.rules (ya existe)
# - ¿Directorio público? → . (punto)
# - ¿SPA? → No
# - ¿Sobrescribir archivos? → No

# 3. Desplegar todo
firebase deploy

# O desplegar solo hosting:
firebase deploy --only hosting

# O desplegar solo reglas:
firebase deploy --only firestore:rules
```

## ✅ Paso 8: Verificar Despliegue

1. Después del deploy, verás una URL como:

   ```
   Hosting URL: https://mapa-16-julio.web.app
   ```

2. Abre esa URL en tu navegador

3. Verifica que:
   - ✅ El visor carga correctamente
   - ✅ El creator requiere contraseña
   - ✅ Puedes guardar y cargar datos

## 🔍 Paso 9: Monitorear Firestore

1. Ve a **Firestore Database** en la consola
2. Deberías ver colecciones creándose cuando guardas datos:
   - `maps` - Datos del mapa
   - `structures` - Estructuras individuales

## 🛠️ Comandos Útiles

```bash
# Ver logs en tiempo real
firebase deploy --only hosting && firebase hosting:channel:deploy preview

# Servir localmente con emuladores
firebase emulators:start

# Ver uso de Firestore
firebase firestore:usage

# Eliminar deployment
firebase hosting:channel:delete CHANNEL_ID
```

## ⚠️ Troubleshooting

### Error: "Permission denied"

- Verifica que las reglas de Firestore estén publicadas
- Asegúrate de que `source: 'creator'` esté en los datos guardados

### Error: "Firebase not initialized"

- Verifica que `firebase-bridge.js` tenga las credenciales correctas
- Revisa la consola del navegador para errores específicos

### Error: "Quota exceeded"

- Firebase Spark (gratis) tiene límites:
  - 50K lecturas/día
  - 20K escrituras/día
  - 1GB almacenamiento
- Considera actualizar a Blaze (pago por uso)

## 📊 Límites del Plan Gratuito (Spark)

| Recurso        | Límite Diario |
| -------------- | ------------- |
| Lecturas       | 50,000        |
| Escrituras     | 20,000        |
| Eliminaciones  | 20,000        |
| Almacenamiento | 1 GB          |
| Transferencia  | 10 GB/mes     |

## 🎯 Próximos Pasos

1. **Configurar dominio personalizado** (opcional)
2. **Agregar autenticación** para el creator
3. **Configurar backups** de Firestore
4. **Monitorear uso** en Firebase Console

## 📞 Soporte

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
- [GitHub Issues](https://github.com/luphoeux/16dejulio/issues)

---

✅ **¡Listo!** Tu aplicación está en producción en Firebase.
