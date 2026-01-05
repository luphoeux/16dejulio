# Guía de Contribución

¡Gracias por tu interés en contribuir al Mapa Interactivo 3D de la Feria 16 de Julio! 🎉

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/16dejulio.git
cd 16dejulio
```

### 2. Crea una Rama

```bash
git checkout -b feature/mi-nueva-caracteristica
```

Usa prefijos descriptivos:

- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Documentación
- `style/` - Cambios de estilo/formato
- `refactor/` - Refactorización de código
- `test/` - Añadir o corregir tests

### 3. Desarrolla

- Escribe código limpio y comentado
- Sigue las convenciones de estilo existentes
- Prueba tus cambios localmente
- Asegúrate de que no rompes funcionalidades existentes

### 4. Commit

```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

Usa mensajes de commit descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato, punto y coma faltantes, etc.
- `refactor:` - Refactorización de código
- `test:` - Añadir tests
- `chore:` - Mantenimiento

### 5. Push y Pull Request

```bash
git push origin feature/mi-nueva-caracteristica
```

Luego abre un Pull Request en GitHub con:

- Título descriptivo
- Descripción detallada de los cambios
- Screenshots si aplica
- Referencias a issues relacionados

## 📋 Checklist antes de PR

- [ ] El código funciona correctamente
- [ ] No hay errores en la consola
- [ ] El código está comentado donde es necesario
- [ ] Se actualizó la documentación si aplica
- [ ] Los cambios siguen el estilo del proyecto
- [ ] Se probó en diferentes navegadores (Chrome, Firefox, Safari)

## 🎨 Estándares de Código

### JavaScript

- Usa `const` y `let`, evita `var`
- Nombres descriptivos para variables y funciones
- Comenta código complejo
- Usa arrow functions cuando sea apropiado
- Maneja errores apropiadamente

### CSS

- Usa variables CSS para colores y medidas
- Nombres de clases descriptivos (BEM si es posible)
- Evita `!important` a menos que sea absolutamente necesario
- Mantén la especificidad baja

### HTML

- Semántica correcta
- Accesibilidad (ARIA labels donde sea necesario)
- IDs únicos y descriptivos

## 🐛 Reportar Bugs

Usa el [Issue Tracker](https://github.com/luphoeux/16dejulio/issues) e incluye:

1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Screenshots** si aplica
5. **Información del sistema**:
   - Navegador y versión
   - Sistema operativo
   - Resolución de pantalla

## 💡 Sugerir Mejoras

¿Tienes una idea? ¡Genial! Abre un issue con:

- Descripción detallada de la funcionalidad
- Casos de uso
- Mockups o ejemplos si es posible
- Por qué sería útil

## 📞 Contacto

Si tienes preguntas, puedes:

- Abrir un issue
- Contactar al mantenedor: [@luphoeux](https://github.com/luphoeux)

## 🙏 Agradecimientos

Cada contribución, por pequeña que sea, es valiosa. ¡Gracias por hacer este proyecto mejor!

---

**Nota**: Al contribuir, aceptas que tus contribuciones se licencien bajo la Licencia MIT del proyecto.
