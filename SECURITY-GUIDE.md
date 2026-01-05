# 🔐 Guía de Seguridad de Firebase

## ⚠️ Problema: API Key Expuesta

GitHub detectó que tu Firebase API Key está expuesta públicamente. Aunque Firebase está diseñado para que las API Keys sean públicas, hay medidas de seguridad importantes que debes tomar.

## 🛡️ Soluciones de Seguridad

### 1. **Restricciones de API Key** (CRÍTICO)

#### En Google Cloud Console:

1. Ve a: https://console.cloud.google.com/apis/credentials?project=dejulio3d
2. Encuentra tu API Key (la que comienza con `AIzaSy...`)
3. Click en **Editar**
4. Configura:

**Restricciones de aplicación:**

- Selecciona: **Referentes HTTP (sitios web)**
- Agrega dominios autorizados:
  ```
  https://dejulio3d.web.app/*
  https://dejulio3d.firebaseapp.com/*
  http://localhost:5000/*
  http://localhost:5001/*
  http://127.0.0.1:5000/*
  ```

**Restricciones de API:**

- Selecciona: **Restringir clave**
- Marca solo las APIs que uses:
  - ✅ Cloud Firestore API
  - ✅ Firebase Hosting API
  - ❌ (Desmarca todo lo demás)

### 2. **Reglas de Seguridad de Firestore** (CRÍTICO)

Las reglas de Firestore son tu **primera línea de defensa**. Ya actualicé `firestore.rules` con:

- ✅ Validación de origen
- ✅ Rate limiting básico
- ✅ Lectura pública, escritura controlada
- ✅ Denegación por defecto

**Desplegar reglas:**

```bash
firebase deploy --only firestore:rules
```

### 3. **App Check** (RECOMENDADO para Producción)

Firebase App Check verifica que las solicitudes provienen de tu app:

#### Habilitar en Firebase Console:

1. Ve a: https://console.firebase.google.com/project/dejulio3d/appcheck
2. Click en **Comenzar**
3. Selecciona **reCAPTCHA v3** para web
4. Registra tu sitio en: https://www.google.com/recaptcha/admin
5. Copia las claves

#### Implementar en tu código:

```javascript
// En firebase-bridge.js, después de initializeApp
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("TU_RECAPTCHA_SITE_KEY"),
  isTokenAutoRefreshEnabled: true,
});
```

### 4. **Autenticación de Usuarios** (Para el Creator)

En lugar de una contraseña simple, usa Firebase Authentication:

```bash
# Habilitar en Firebase Console
# Authentication → Sign-in method → Email/Password
```

```javascript
// Implementar login real
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ Usuario autenticado:", userCredential.user);
    return true;
  } catch (error) {
    console.error("❌ Error de autenticación:", error);
    return false;
  }
}
```

### 5. **Monitoreo y Alertas**

#### Configurar alertas de uso:

1. Ve a: https://console.firebase.google.com/project/dejulio3d/usage
2. Configura alertas para:
   - Lecturas de Firestore > 40,000/día
   - Escrituras de Firestore > 15,000/día
   - Transferencia de datos > 8GB/mes

#### Revisar logs regularmente:

```bash
# Ver logs de Firestore
firebase firestore:usage

# Ver logs de seguridad
# En Firebase Console → Firestore → Reglas → Pestaña "Solicitudes"
```

## 🔄 Pasos Inmediatos a Seguir

### Paso 1: Rotar la API Key (URGENTE)

```bash
# Opción A: Regenerar API Key en Google Cloud Console
# 1. Ve a: https://console.cloud.google.com/apis/credentials?project=dejulio3d
# 2. Elimina la key actual
# 3. Crea una nueva con restricciones

# Opción B: Crear nueva app en Firebase
# 1. Firebase Console → Configuración → Agregar app
# 2. Obtén nuevas credenciales
# 3. Actualiza firebase-bridge.js
```

### Paso 2: Actualizar Código Local

```bash
# 1. Actualiza firebase-bridge.js con la NUEVA API Key
# 2. NO hagas commit de la nueva key directamente

# 3. Agrega firebase-bridge.js al .gitignore
echo "firebase-bridge.js" >> .gitignore

# 4. Crea un template sin credenciales
cp firebase-bridge.js firebase-bridge.example.js
# Edita firebase-bridge.example.js y reemplaza las credenciales con placeholders
```

### Paso 3: Desplegar Reglas de Seguridad

```bash
# Desplegar las nuevas reglas de Firestore
firebase deploy --only firestore:rules

# Verificar que se aplicaron correctamente
# Firebase Console → Firestore → Reglas
```

### Paso 4: Limpiar Historial de Git (Opcional pero Recomendado)

```bash
# ADVERTENCIA: Esto reescribe el historial de Git
# Solo hazlo si estás seguro

# Opción A: Usar BFG Repo-Cleaner
# https://rtyley.github.io/bfg-repo-cleaner/

# Opción B: Usar git filter-branch
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch firebase-bridge.js" \
  --prune-empty --tag-name-filter cat -- --all

# Forzar push (CUIDADO)
git push origin --force --all
```

## 📊 Niveles de Seguridad

### Nivel 1: Básico (Mínimo Requerido)

- ✅ Restricciones de API Key por dominio
- ✅ Reglas de Firestore configuradas
- ✅ API Key no en repositorio público

### Nivel 2: Intermedio (Recomendado)

- ✅ Todo lo de Nivel 1
- ✅ Firebase App Check habilitado
- ✅ Monitoreo y alertas configuradas
- ✅ Rate limiting en reglas

### Nivel 3: Avanzado (Producción)

- ✅ Todo lo de Nivel 2
- ✅ Firebase Authentication para usuarios
- ✅ Cloud Functions para lógica sensible
- ✅ Auditoría regular de logs
- ✅ Backup automático de Firestore

## 🚫 Lo que NO debes hacer

- ❌ Dejar la API Key en código público sin restricciones
- ❌ Usar reglas de Firestore permisivas (`allow read, write: if true`)
- ❌ Ignorar alertas de GitHub Security
- ❌ No monitorear el uso de Firebase
- ❌ Compartir credenciales en mensajes/emails

## ✅ Checklist de Seguridad

- [ ] API Key rotada/regenerada
- [ ] Restricciones de dominio configuradas
- [ ] Restricciones de API configuradas
- [ ] Reglas de Firestore desplegadas
- [ ] `firebase-bridge.js` en `.gitignore`
- [ ] Template sin credenciales creado
- [ ] App Check habilitado (opcional)
- [ ] Alertas de uso configuradas
- [ ] Historial de Git limpiado (opcional)

## 📞 Recursos

- [Firebase Security Checklist](https://firebase.google.com/support/guides/security-checklist)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [App Check Documentation](https://firebase.google.com/docs/app-check)
- [API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)

---

**IMPORTANTE**: La seguridad es un proceso continuo. Revisa y actualiza estas configuraciones regularmente.
