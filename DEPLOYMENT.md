# 🚀 Guía de Deployment a GitHub Pages

## Configuración Inicial (Solo una vez)

### 1. Actualizar package.json
Abre `package.json` y cambia esta línea:
```json
"homepage": "https://TU-USUARIO.github.io/PoliticaIntereactivaRegistro",
```

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

**Ejemplo:**
```json
"homepage": "https://stevenscontreras.github.io/PoliticaIntereactivaRegistro",
```

### 2. Crear Repositorio en GitHub
1. Ve a [github.com](https://github.com) y crea un nuevo repositorio
2. Nómbralo: `PoliticaIntereactivaRegistro`
3. **NO** inicialices con README

### 3. Subir el Código
Ejecuta estos comandos en la terminal:

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - React app"

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/PoliticaIntereactivaRegistro.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 4. Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona: **GitHub Actions**
5. ¡Listo! El workflow se ejecutará automáticamente

---

## 🎯 Deployment Automático

Una vez configurado, cada vez que hagas `git push`, la app se desplegará automáticamente.

El workflow de GitHub Actions:
- ✅ Instala dependencias
- ✅ Compila la aplicación
- ✅ Despliega a GitHub Pages

**Tu app estará disponible en:**
```
https://TU-USUARIO.github.io/PoliticaIntereactivaRegistro
```

---

## 🔧 Deployment Manual (Alternativa)

Si prefieres desplegar manualmente:

```bash
# Instalar gh-pages
npm install

# Desplegar
npm run deploy
```

Esto compilará y subirá automáticamente a la rama `gh-pages`.

---

## ✅ Verificar Deployment

1. Ve a tu repositorio en GitHub
2. Click en **Actions**
3. Verás el workflow "Deploy to GitHub Pages" ejecutándose
4. Cuando termine (✅ verde), tu app estará lista
5. Visita: `https://TU-USUARIO.github.io/PoliticaIntereactivaRegistro`

---

## 🐛 Troubleshooting

### Error: "Page not found"
- Verifica que habilitaste GitHub Pages en Settings → Pages
- Asegúrate de seleccionar "GitHub Actions" como source

### Error: "Failed to deploy"
- Revisa que el `homepage` en `package.json` sea correcto
- Verifica que el nombre del repositorio coincida

### Los estilos no cargan
- Confirma que `base: '/PoliticaIntereactivaRegistro/'` esté en `vite.config.js`
- El nombre debe coincidir exactamente con el nombre del repositorio

---

## 📝 Comandos Útiles

```bash
# Ver estado de git
git status

# Hacer cambios y desplegar
git add .
git commit -m "Descripción del cambio"
git push

# Compilar localmente para probar
npm run build
npm run preview
```

---

**¡Tu aplicación estará en línea en minutos!** 🎉
