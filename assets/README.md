# Carpeta de Assets 3D

Para reemplazar las estructuras con modelos personalizados:

1. Coloca tus archivos `.glb` en esta carpeta.
2. Asegúrate de que los nombres coincidan con los tamaños definidos:
   - `1x1.glb`
   - `2x2.glb`
   - `3x3.glb`
   - `2x4.glb`
   - `6x3.glb`
   - `5x4.glb`
   - `4x4.glb`
   - `4x3.glb`

El sistema cargará automáticamente estos modelos. Si un archivo no existe, el sistema mostrará un cubo de color como respaldo (fallback).

### Recomendaciones:

- Centra el modelo en el origen (0,0,0) en tu programa de 3D.
- La escala 1 unidad = 1 metro (1 cuadro de grilla).
