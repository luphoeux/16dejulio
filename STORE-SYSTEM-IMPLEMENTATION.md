# 🏗️ Sistema de Gestión de Tiendas - Implementación

## ✅ Lo que ya está hecho:

### 1. Estructura de Datos

- ✅ `store-data-structure.js` creado con:
  - Estructura completa de datos de tienda
  - 8 categorías de negocios con subcategorías
  - Función `crearTiendaNueva()` para generar tiendas

### 2. UI del Creator

- ✅ Botón "SELECCIONAR" agregado (tecla S)
- ✅ Modal completo de edición con 4 tabs:
  - 📋 Información Básica
  - 📞 Contacto y Redes Sociales
  - 🕐 Horarios
  - ⭐ Extras y Propietario

### 3. Sistema de Exportación/Importación

- ✅ Botones de exportar/importar JSON
- ✅ Sincronización con Firestore
- ✅ Guías de uso completas

## 🔨 Lo que falta implementar:

### 1. CSS del Modal

Crear estilos en `creator.html` dentro de la sección `<style>`:

```css
/* Store Modal Styles */
.store-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
}

.store-modal.hidden {
  display: none;
}

.store-modal-content {
  background: var(--oni-bg);
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.store-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--oni-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.store-modal-header h2 {
  margin: 0;
  color: var(--oni-text);
  font-size: 20px;
}

.store-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--oni-text);
  padding: 4px 8px;
  transition: color 0.2s;
}

.store-modal-close:hover {
  color: #ff4444;
}

.store-modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.store-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--oni-border);
}

.store-tab {
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  color: var(--oni-text-dim);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  margin-bottom: -2px;
}

.store-tab:hover {
  color: var(--oni-text);
  background: rgba(255, 255, 255, 0.05);
}

.store-tab.active {
  color: var(--oni-accent);
  border-bottom-color: var(--oni-accent);
}

.store-tab-content {
  display: none;
}

.store-tab-content.active {
  display: block;
}

.store-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.store-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.store-form-group.full-width {
  grid-column: 1 / -1;
}

.store-form-group label {
  color: var(--oni-text);
  font-size: 13px;
  font-weight: 500;
}

.store-form-group input,
.store-form-group select,
.store-form-group textarea {
  padding: 10px 12px;
  background: var(--oni-input-bg);
  border: 1px solid var(--oni-border);
  border-radius: 6px;
  color: var(--oni-text);
  font-size: 14px;
  font-family: inherit;
}

.store-form-group input:focus,
.store-form-group select:focus,
.store-form-group textarea:focus {
  outline: none;
  border-color: var(--oni-accent);
}

.store-form-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.store-horarios-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.horario-row {
  display: grid;
  grid-template-columns: 120px 1fr auto 1fr;
  gap: 12px;
  align-items: center;
}

.horario-row label {
  color: var(--oni-text);
  font-size: 14px;
}

.horario-row input[type="time"] {
  padding: 8px;
  background: var(--oni-input-bg);
  border: 1px solid var(--oni-border);
  border-radius: 6px;
  color: var(--oni-text);
}

.caracteristicas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.caracteristicas-grid label {
  color: var(--oni-text);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.store-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--oni-border);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.store-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.store-btn-primary {
  background: var(--oni-accent);
  color: white;
}

.store-btn-primary:hover {
  background: var(--oni-accent-hover);
  transform: translateY(-1px);
}

.store-btn-secondary {
  background: transparent;
  color: var(--oni-text);
  border: 1px solid var(--oni-border);
}

.store-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
}
```

### 2. JavaScript - Funciones del Modal

Agregar al final del script de `creator.html`:

```javascript
// === SISTEMA DE TIENDAS ===

// Variable global para almacenar datos de tiendas
window.storesData = {};
let currentEditingStoreId = null;
let storeIdCounter = 1;

// Generar ID secuencial para tienda
function generateStoreId() {
  const id = `TIENDA-${String(storeIdCounter).padStart(3, "0")}`;
  storeIdCounter++;
  return id;
}

// Abrir modal de edición de tienda
function openStoreModal(buildingId) {
  const modal = document.getElementById("storeEditModal");
  if (!modal) return;

  // Si la tienda ya existe, cargar datos
  if (window.storesData[buildingId]) {
    loadStoreDataToForm(window.storesData[buildingId]);
    currentEditingStoreId = buildingId;
  } else {
    // Crear nueva tienda
    const newStore = window.crearTiendaNueva(buildingId);
    newStore.id = generateStoreId();
    window.storesData[buildingId] = newStore;
    loadStoreDataToForm(newStore);
    currentEditingStoreId = buildingId;
  }

  // Poblar categorías
  populateCategories();

  modal.classList.remove("hidden");
}

// Cerrar modal
function closeStoreModal() {
  const modal = document.getElementById("storeEditModal");
  if (modal) modal.classList.add("hidden");
  currentEditingStoreId = null;
}

// Cambiar tab
function switchStoreTab(tabName) {
  // Desactivar todos los tabs
  document.querySelectorAll(".store-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".store-tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Activar tab seleccionado
  event.target.classList.add("active");
  document.getElementById(`tab-${tabName}`).classList.add("active");
}

// Poblar select de categorías
function populateCategories() {
  const select = document.getElementById("store-tipoNegocio");
  if (!select) return;

  select.innerHTML = '<option value="">Seleccionar...</option>';

  Object.values(window.CategoriasNegocio).forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = `${cat.icon} ${cat.nombre}`;
    select.appendChild(option);
  });
}

// Actualizar subcategorías según categoría seleccionada
function updateSubcategorias() {
  const catSelect = document.getElementById("store-tipoNegocio");
  const subSelect = document.getElementById("store-subCategoria");

  if (!catSelect || !subSelect) return;

  const selectedCat = catSelect.value;
  subSelect.innerHTML = '<option value="">Seleccionar...</option>';

  if (selectedCat && window.CategoriasNegocio[selectedCat.toUpperCase()]) {
    const subcats =
      window.CategoriasNegocio[selectedCat.toUpperCase()].subcategorias;
    subcats.forEach((sub) => {
      const option = document.createElement("option");
      option.value = sub;
      option.textContent = sub;
      subSelect.appendChild(option);
    });
  }
}

// Cargar datos de tienda al formulario
function loadStoreDataToForm(store) {
  document.getElementById("store-id").value = store.id;
  document.getElementById("store-nombre").value = store.nombre || "";
  document.getElementById("store-numeroLocal").value = store.numeroLocal || "";
  document.getElementById("store-sector").value = store.sector || "";
  document.getElementById("store-tipoNegocio").value = store.tipoNegocio || "";
  document.getElementById("store-subCategoria").value =
    store.subCategoria || "";
  document.getElementById("store-descripcion").value = store.descripcion || "";
  document.getElementById("store-productos").value =
    store.productos?.join(", ") || "";

  // Contacto
  document.getElementById("store-telefono").value =
    store.contacto?.telefono || "";
  document.getElementById("store-celular").value =
    store.contacto?.celular || "";
  document.getElementById("store-whatsapp").value =
    store.contacto?.whatsapp || "";
  document.getElementById("store-email").value = store.contacto?.email || "";
  document.getElementById("store-sitioWeb").value =
    store.contacto?.sitioWeb || "";

  // Redes sociales
  document.getElementById("store-facebook").value =
    store.redesSociales?.facebook || "";
  document.getElementById("store-instagram").value =
    store.redesSociales?.instagram || "";
  document.getElementById("store-tiktok").value =
    store.redesSociales?.tiktok || "";
  document.getElementById("store-twitter").value =
    store.redesSociales?.twitter || "";

  // Características
  document.getElementById("car-tarjetas").checked =
    store.caracteristicas?.aceptaTarjetas || false;
  document.getElementById("car-delivery").checked =
    store.caracteristicas?.tieneDelivery || false;
  document.getElementById("car-estacionamiento").checked =
    store.caracteristicas?.tieneEstacionamiento || false;
  document.getElementById("car-accesible").checked =
    store.caracteristicas?.accesible || false;
  document.getElementById("car-wifi").checked =
    store.caracteristicas?.wifi || false;
  document.getElementById("car-bano").checked =
    store.caracteristicas?.banoPublico || false;

  // Propietario
  document.getElementById("prop-nombre").value =
    store.propietario?.nombre || "";
  document.getElementById("prop-apellido").value =
    store.propietario?.apellido || "";
  document.getElementById("prop-ci").value = store.propietario?.ci || "";
  document.getElementById("prop-telefono").value =
    store.propietario?.telefono || "";
}

// Guardar datos del formulario
function saveStoreData() {
  if (!currentEditingStoreId) return;

  const store = window.storesData[currentEditingStoreId];

  // Información básica
  store.nombre = document.getElementById("store-nombre").value;
  store.numeroLocal = document.getElementById("store-numeroLocal").value;
  store.sector = document.getElementById("store-sector").value;
  store.tipoNegocio = document.getElementById("store-tipoNegocio").value;
  store.subCategoria = document.getElementById("store-subCategoria").value;
  store.descripcion = document.getElementById("store-descripcion").value;
  store.productos = document
    .getElementById("store-productos")
    .value.split(",")
    .map((p) => p.trim())
    .filter((p) => p);

  // Contacto
  store.contacto.telefono = document.getElementById("store-telefono").value;
  store.contacto.celular = document.getElementById("store-celular").value;
  store.contacto.whatsapp = document.getElementById("store-whatsapp").value;
  store.contacto.email = document.getElementById("store-email").value;
  store.contacto.sitioWeb = document.getElementById("store-sitioWeb").value;

  // Redes sociales
  store.redesSociales.facebook =
    document.getElementById("store-facebook").value;
  store.redesSociales.instagram =
    document.getElementById("store-instagram").value;
  store.redesSociales.tiktok = document.getElementById("store-tiktok").value;
  store.redesSociales.twitter = document.getElementById("store-twitter").value;

  // Características
  store.caracteristicas.aceptaTarjetas =
    document.getElementById("car-tarjetas").checked;
  store.caracteristicas.tieneDelivery =
    document.getElementById("car-delivery").checked;
  store.caracteristicas.tieneEstacionamiento = document.getElementById(
    "car-estacionamiento"
  ).checked;
  store.caracteristicas.accesible =
    document.getElementById("car-accesible").checked;
  store.caracteristicas.wifi = document.getElementById("car-wifi").checked;
  store.caracteristicas.banoPublico =
    document.getElementById("car-bano").checked;

  // Propietario
  store.propietario.nombre = document.getElementById("prop-nombre").value;
  store.propietario.apellido = document.getElementById("prop-apellido").value;
  store.propietario.ci = document.getElementById("prop-ci").value;
  store.propietario.telefono = document.getElementById("prop-telefono").value;

  // Actualizar fecha
  store.fechaActualizacion = new Date().toISOString();

  console.log("✅ Tienda guardada:", store);
  if (window.showNotification) {
    window.showNotification(`✅ ${store.nombre} guardada`);
  }

  closeStoreModal();
}
```

### 3. Modo Seleccionar y Mover

Modificar la función `setMode` para incluir el modo 'select':

```javascript
// En la función setMode, agregar:
case 'select':
    currentMode = 'select';
    document.getElementById('modeText').textContent = 'Modo Seleccionar';
    // Actualizar botones activos
    break;
```

### 4. Sistema de Click en Modo Seleccionar

Agregar en el event listener de click del raycaster:

```javascript
// Cuando se hace click en modo select
if (currentMode === "select" && intersects.length > 0) {
  const clickedObject = intersects[0].object;
  const buildingId = clickedObject.userData.buildingId;

  if (buildingId) {
    openStoreModal(buildingId);
  }
}
```

### 5. Modo Mover (Tecla G)

Agregar event listener para la tecla G:

```javascript
// En el event listener de teclado
if (e.key === "g" || e.key === "G") {
  if (selectedBuilding) {
    enterMoveMode();
  }
}

function enterMoveMode() {
  // Implementar lógica para mover edificio
  console.log("Modo mover activado");
}
```

## 📝 Próximos Pasos:

1. Copiar el CSS del modal al `<style>` de creator.html
2. Copiar las funciones JavaScript al script de creator.html
3. Integrar el modo seleccionar con el raycaster
4. Implementar el modo mover (tecla G)
5. Guardar datos de tiendas junto con el mapa
6. Actualizar el visor para mostrar información de tiendas

## 🎯 Resultado Final:

- ✅ Cada edificio tendrá un ID único secuencial (TIENDA-001, TIENDA-002, etc.)
- ✅ Click en modo seleccionar abre el modal de edición
- ✅ Formulario completo con 4 tabs de información
- ✅ Datos se guardan en `window.storesData`
- ✅ Tecla G permite mover edificios
- ✅ Información se exporta/importa junto con el mapa
