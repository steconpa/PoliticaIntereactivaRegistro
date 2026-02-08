# Política Interactiva - Registro de Estudiantes

Aplicación React para la lectura, comprensión y firma digital de la **Política de Uso Seguro de Cuentas Personales de Google** para el programa Técnico Laboral en Sistemas.

## 🚀 Características

- ✅ **8 Secciones Educativas** sobre política de uso de Google
- ✅ **Quiz de Validación** con 3 preguntas aleatorias de un pool de 15
- ✅ **Firma Digital** con integración a Google Apps Script
- ✅ **Diseño Moderno** con Tailwind CSS
- ✅ **Responsive** para móviles y desktop
- ✅ **ID de Registro** único por estudiante

## 🛠️ Tecnologías

- React 18.2
- Vite 4.4
- Tailwind CSS 3.3
- lucide-react (iconos)
- Google Apps Script API

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/TU-USUARIO/PoliticaIntereactivaRegistro.git
cd PoliticaIntereactivaRegistro

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🌐 Deployment a GitHub Pages

### Configuración Inicial

1. **Actualizar URL en `package.json`:**
   ```json
   "homepage": "https://TU-USUARIO.github.io/PoliticaIntereactivaRegistro"
   ```

2. **Subir a GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU-USUARIO/PoliticaIntereactivaRegistro.git
   git push -u origin main
   ```

3. **Habilitar GitHub Pages:**
   - Ve a Settings → Pages
   - En "Source" selecciona: **GitHub Actions**

### Deployment Automático

Cada `git push` desplegará automáticamente la aplicación.

### Deployment Manual

```bash
npm run deploy
```

Ver guía completa en [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Uso

1. **Lectura:** El estudiante lee las 8 secciones de la política
2. **Validación:** Responde 3 preguntas aleatorias
3. **Firma:** Completa el formulario con sus datos
4. **Confirmación:** Recibe un ID de registro único

## 🔗 API Integration

La aplicación se conecta a Google Apps Script para:
- Cargar lista de cursos disponibles (GET)
- Enviar firma digital del estudiante (POST)

Endpoint configurado en `src/App.jsx`:
```javascript
const WEB_APP_URL = "https://script.google.com/macros/s/...";
```

## 📄 Licencia

Creado por Stevens Contreras | 2026

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request
