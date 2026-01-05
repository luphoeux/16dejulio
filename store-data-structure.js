// store-data-structure.js - Estructura de datos para tiendas

// Estructura completa de datos de una tienda
const StoreDataStructure = {
  // === IDENTIFICACIÓN ===
  id: "",                    // UUID único generado automáticamente
  buildingId: "",            // ID del edificio en el mapa (referencia a la estructura 3D)
  
  // === INFORMACIÓN BÁSICA ===
  nombre: "",                // Nombre de la tienda/puesto
  numeroLocal: "",           // Número de local/casa
  sector: "",                // Sector de la feria (A, B, C, etc.)
  
  // === UBICACIÓN ===
  direccion: {
    calle: "",               // Nombre de la calle
    numero: "",              // Número de casa/edificio
    referencia: "",          // Punto de referencia
    googleMapsUrl: "",       // URL de Google Maps
    coordenadas: {
      lat: 0,                // Latitud
      lng: 0                 // Longitud
    }
  },
  
  // === TIPO DE NEGOCIO ===
  tipoNegocio: "",           // Categoría principal
  subCategoria: "",          // Subcategoría específica
  
  // === PRODUCTOS/SERVICIOS ===
  productos: [],             // Array de productos que vende
  servicios: [],             // Array de servicios que ofrece
  descripcion: "",           // Descripción general del negocio
  
  // === HORARIOS ===
  horarios: {
    lunes: { abierto: false, inicio: "", fin: "" },
    martes: { abierto: false, inicio: "", fin: "" },
    miercoles: { abierto: false, inicio: "", fin: "" },
    jueves: { abierto: true, inicio: "08:00", fin: "18:00" },
    viernes: { abierto: false, inicio: "", fin: "" },
    sabado: { abierto: false, inicio: "", fin: "" },
    domingo: { abierto: true, inicio: "08:00", fin: "18:00" }
  },
  
  // === CONTACTO ===
  contacto: {
    telefono: "",            // Teléfono fijo
    celular: "",             // Celular
    whatsapp: "",            // Número de WhatsApp
    email: "",               // Correo electrónico
    sitioWeb: ""             // Sitio web (si tiene)
  },
  
  // === REDES SOCIALES ===
  redesSociales: {
    facebook: "",            // URL de Facebook
    instagram: "",           // Usuario de Instagram
    tiktok: "",              // Usuario de TikTok
    twitter: "",             // Usuario de Twitter
    youtube: ""              // Canal de YouTube
  },
  
  // === INFORMACIÓN ADICIONAL ===
  propietario: {
    nombre: "",              // Nombre del propietario
    apellido: "",            // Apellido del propietario
    ci: "",                  // Cédula de identidad
    telefono: ""             // Teléfono del propietario
  },
  
  // === CARACTERÍSTICAS ===
  caracteristicas: {
    aceptaTarjetas: false,   // Acepta tarjetas de crédito/débito
    tieneDelivery: false,    // Ofrece servicio de delivery
    tieneEstacionamiento: false, // Tiene estacionamiento
    accesible: false,        // Accesible para personas con discapacidad
    wifi: false,             // Tiene WiFi
    banoPublico: false       // Tiene baño público
  },
  
  // === MULTIMEDIA ===
  imagenes: [],              // Array de URLs de imágenes
  logo: "",                  // URL del logo
  
  // === METADATA ===
  fechaCreacion: "",         // Fecha de creación del registro
  fechaActualizacion: "",    // Última actualización
  activo: true,              // Si la tienda está activa
  verificado: false,         // Si la información fue verificada
  
  // === ESTADÍSTICAS ===
  visitas: 0,                // Contador de visitas en el mapa
  calificacion: 0,           // Calificación promedio (0-5)
  numeroReviews: 0           // Número de reseñas
};

// Categorías de negocios disponibles
const CategoriasNegocio = {
  ROPA: {
    id: "ropa",
    nombre: "Ropa y Textiles",
    icon: "👔",
    subcategorias: [
      "Ropa de Mujer",
      "Ropa de Hombre",
      "Ropa de Niños",
      "Ropa Deportiva",
      "Ropa Interior",
      "Zapatos",
      "Accesorios",
      "Telas"
    ]
  },
  ELECTRONICA: {
    id: "electronica",
    nombre: "Electrónica",
    icon: "📱",
    subcategorias: [
      "Celulares",
      "Computadoras",
      "Accesorios Electrónicos",
      "Audio y Video",
      "Electrodomésticos",
      "Cámaras",
      "Consolas y Videojuegos"
    ]
  },
  ALIMENTOS: {
    id: "alimentos",
    nombre: "Alimentos y Bebidas",
    icon: "🍔",
    subcategorias: [
      "Comida Rápida",
      "Restaurante",
      "Cafetería",
      "Jugos y Batidos",
      "Panadería",
      "Dulces y Snacks",
      "Frutas y Verduras"
    ]
  },
  HOGAR: {
    id: "hogar",
    nombre: "Hogar y Decoración",
    icon: "🏠",
    subcategorias: [
      "Muebles",
      "Decoración",
      "Cocina",
      "Baño",
      "Iluminación",
      "Textiles para Hogar",
      "Herramientas"
    ]
  },
  BELLEZA: {
    id: "belleza",
    nombre: "Belleza y Cuidado Personal",
    icon: "💄",
    subcategorias: [
      "Peluquería",
      "Barbería",
      "Spa y Masajes",
      "Uñas",
      "Cosméticos",
      "Perfumería",
      "Productos de Belleza"
    ]
  },
  SERVICIOS: {
    id: "servicios",
    nombre: "Servicios",
    icon: "🔧",
    subcategorias: [
      "Reparación de Celulares",
      "Reparación de Computadoras",
      "Cerrajería",
      "Sastrería",
      "Fotografía",
      "Imprenta",
      "Envíos y Courier"
    ]
  },
  JUGUETES: {
    id: "juguetes",
    nombre: "Juguetes y Entretenimiento",
    icon: "🎮",
    subcategorias: [
      "Juguetes",
      "Juegos de Mesa",
      "Artículos de Fiesta",
      "Librería",
      "Música",
      "Películas"
    ]
  },
  OTROS: {
    id: "otros",
    nombre: "Otros",
    icon: "🏪",
    subcategorias: [
      "Artesanías",
      "Joyería",
      "Óptica",
      "Farmacia",
      "Veterinaria",
      "Mascotas",
      "Varios"
    ]
  }
};

// Función para crear una tienda nueva con valores por defecto
function crearTiendaNueva(buildingId, posicion) {
  return {
    id: crypto.randomUUID(),
    buildingId: buildingId,
    nombre: "Tienda Sin Nombre",
    numeroLocal: "",
    sector: "",
    direccion: {
      calle: "",
      numero: "",
      referencia: "",
      googleMapsUrl: "",
      coordenadas: {
        lat: posicion?.lat || 0,
        lng: posicion?.lng || 0
      }
    },
    tipoNegocio: "",
    subCategoria: "",
    productos: [],
    servicios: [],
    descripcion: "",
    horarios: {
      lunes: { abierto: false, inicio: "", fin: "" },
      martes: { abierto: false, inicio: "", fin: "" },
      miercoles: { abierto: false, inicio: "", fin: "" },
      jueves: { abierto: true, inicio: "08:00", fin: "18:00" },
      viernes: { abierto: false, inicio: "", fin: "" },
      sabado: { abierto: false, inicio: "", fin: "" },
      domingo: { abierto: true, inicio: "08:00", fin: "18:00" }
    },
    contacto: {
      telefono: "",
      celular: "",
      whatsapp: "",
      email: "",
      sitioWeb: ""
    },
    redesSociales: {
      facebook: "",
      instagram: "",
      tiktok: "",
      twitter: "",
      youtube: ""
    },
    propietario: {
      nombre: "",
      apellido: "",
      ci: "",
      telefono: ""
    },
    caracteristicas: {
      aceptaTarjetas: false,
      tieneDelivery: false,
      tieneEstacionamiento: false,
      accesible: false,
      wifi: false,
      banoPublico: false
    },
    imagenes: [],
    logo: "",
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
    activo: true,
    verificado: false,
    visitas: 0,
    calificacion: 0,
    numeroReviews: 0
  };
}

// Exportar para uso global
if (typeof window !== "undefined") {
  window.StoreDataStructure = StoreDataStructure;
  window.CategoriasNegocio = CategoriasNegocio;
  window.crearTiendaNueva = crearTiendaNueva;
}
