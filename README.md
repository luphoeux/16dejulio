# 🗺️ Mapa Interactivo 3D - Feria 16 de Julio

Aplicación web interactiva para visualizar y editar mapas 3D de la Feria 16 de Julio en El Alto, Bolivia. Construida con Three.js y diseñada con una interfaz inspirada en Google Maps.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-green)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange)

## ✨ Características

### 🎮 Visor de Mapa (`map.html`)

- **Interfaz estilo Google Maps**: Controles flotantes familiares y fáciles de usar
- **Menú hamburguesa**: Navegación y selección de capas integrada
- **Sidebar de información**: Panel lateral con detalles de cada puesto
- **Controles de zoom**: Botones flotantes (+/-) y atajos de teclado
- **Brújula interactiva**: Orientación visual con reset de cámara
- **Múltiples vistas**: Cambio entre vista isométrica y cenital
- **Renderizado 3D optimizado**: Usando Universal Instancing para alto rendimiento

### 🎨 Editor de Mapa (`creator.html`)

- **Sistema de login**: Protección con contraseña (`admin123`)
- **Herramientas de construcción**: Colocación y eliminación de estructuras
- **Múltiples categorías**: Terreno y estructuras
- **Sistema de capas**: Organización visual por tipo de elemento
- **Rotación de objetos**: Control preciso de orientación
- **Guardado automático**: Persistencia en LocalStorage con fallback a Firestore
- **Universal Instancing**: Optimización para miles de objetos (3 draw calls)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v14 o superior)
- Firebase CLI instalado globalmente

```bash
npm install -g firebase-tools
```

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/luphoeux/16dejulio.git
cd 16dejulio
```

2. **Iniciar el servidor de desarrollo**

```bash
firebase emulators:start --only hosting
```

3. **Abrir en el navegador**

- **Visor**: http://localhost:5000/map.html
- **Editor**: http://localhost:5000/creator.html

## 📁 Estructura del Proyecto

```
16dejulio/
├── index.html              # Página de inicio
├── map.html                # Visor del mapa 3D
├── creator.html            # Editor del mapa
├── styles.css              # Estilos globales
├── data-manager.js         # Gestión de datos (LocalStorage/Firestore)
├── firebase-bridge.js      # Integración con Firebase
├── lighting-config.js      # Configuración de iluminación 3D
├── map-config.js           # Configuración del mapa
├── firebase.json           # Configuración de Firebase
└── README.md               # Este archivo
```

## 🎮 Controles

### Visor (map.html)

| Acción               | Control                                        |
| -------------------- | ---------------------------------------------- |
| Mover mapa           | Arrastrar con botón central del mouse / WASD   |
| Zoom                 | Rueda del mouse / Botones +/- / Teclas +/-     |
| Rotar cámara         | Arrastrar con clic derecho                     |
| Resetear orientación | Clic en la brújula                             |
| Cambiar vista        | Botón de cámara (lateral izquierdo)            |
| Abrir menú           | Botón hamburguesa (esquina superior izquierda) |
| Ver información      | Clic en un puesto                              |

### Editor (creator.html)

| Acción            | Control                              |
| ----------------- | ------------------------------------ |
| Colocar objeto    | Clic izquierdo en modo construcción  |
| Borrar objeto     | Clic izquierdo en modo borrar        |
| Rotar objeto      | Tecla R / Botón Rotar                |
| Cambiar modo      | Teclas P (Pintar) / X (Borrar)       |
| Cambiar categoría | Teclas 1 (Estructuras) / 2 (Terreno) |
| Guardar           | Ctrl+S / Botón Guardar               |
| Cambiar vista     | Tecla Q                              |

## 🛠️ Tecnologías

- **Three.js 0.160.0**: Motor de renderizado 3D
- **Firebase Hosting**: Alojamiento web
- **LocalStorage API**: Persistencia local de datos
- **Vanilla JavaScript**: Sin frameworks adicionales
- **CSS3**: Estilos modernos con animaciones

## 🎨 Características Técnicas

### Optimización de Rendimiento

- **Universal Instancing**: Renderiza miles de objetos con solo 3 draw calls
- **Frustum Culling**: Solo renderiza objetos visibles
- **Lazy Loading**: Carga de recursos bajo demanda
- **Efficient Material Sharing**: Reutilización de materiales

### Arquitectura de Datos

- **Dual Storage**: LocalStorage como primario, Firestore como respaldo
- **Fallback automático**: Si Firestore falla, usa LocalStorage
- **Sincronización**: Guarda en ambos sistemas simultáneamente

## 🔧 Configuración

### Firebase (Opcional)

Para usar Firestore en producción:

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Actualizar `firebase-bridge.js` con tus credenciales:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};
```

### Cambiar Contraseña del Editor

En `creator.html`, línea 618:

```javascript
if (password && password.value === "admin123") {
  // Cambiar 'admin123' por tu contraseña
}
```

## 🚀 Despliegue

### Firebase Hosting

1. **Iniciar sesión en Firebase**

```bash
firebase login
```

2. **Inicializar proyecto** (si no está inicializado)

```bash
firebase init hosting
```

3. **Desplegar**

```bash
firebase deploy --only hosting
```

### Otros Servicios

El proyecto es compatible con cualquier servicio de hosting estático:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

## 📝 Roadmap

- [ ] Sistema de autenticación de usuarios
- [ ] Búsqueda de puestos por nombre/categoría
- [ ] Exportación de mapas a formatos 3D (GLTF, OBJ)
- [ ] Modo multijugador colaborativo
- [ ] Integración con Google Maps real
- [ ] Soporte para dispositivos móviles táctiles
- [ ] Temas personalizables (día/noche)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Lucho** - [@luphoeux](https://github.com/luphoeux)

## 🙏 Agradecimientos

- Three.js por el increíble motor 3D
- Firebase por el hosting gratuito
- La comunidad de El Alto por la inspiración

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub
