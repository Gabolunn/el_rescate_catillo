# 🔧 DOCUMENTACIÓN TÉCNICA

## Arquitectura del Sistema

### Visión General

"El Rescate en el Castillo" es una novela visual construida con tecnologías web estándar (HTML5, CSS3, JavaScript ES6+) sin dependencias externas. El sistema sigue una arquitectura de separación de contenidos (content-engine separation).

```
┌─────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                │
│              HTML (index.html) + CSS                │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                   GAME ENGINE                       │
│              JavaScript (game.js)                   │
│  ┌─────────────────────────────────────────────┐   │
│  │  GameEngine Class (Singleton Pattern)      │   │
│  │  - Scene Manager                           │   │
│  │  - State Manager                           │   │
│  │  - UI Controller                           │   │
│  │  - Persistence Layer (LocalStorage)        │   │
│  │  - Audio Controller                        │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                   DATA LAYER                        │
│                 JSON (story.json)                   │
│  - Scene Definitions                                │
│  - Dialogue Trees                                   │
│  - Choice Logic                                     │
│  - Branching Paths                                  │
└─────────────────────────────────────────────────────┘
```

---

## Componentes del Sistema

### 1. GameEngine Class (game.js)

**Responsabilidades:**
- Gestión del ciclo de vida del juego
- Carga y parseo del story.json
- Renderizado de escenas
- Gestión de estado (stats, flags, historia)
- Manejo de eventos de UI
- Persistencia de datos

**Propiedades principales:**
```javascript
{
  story: Object,              // Datos del JSON cargado
  currentScene: Object,       // Escena actual
  gameState: {
    currentSceneId: String,
    stats: {
      valentia: Number,
      ingenio: Number,
      romance: Number,
      honor: Number
    },
    flags: Object,            // Flags booleanos para lógica
    history: Array            // Historial de diálogos
  },
  config: {
    textSpeed: String,
    musicVolume: Number,
    sfxVolume: Number,
    autoSave: Boolean
  }
}
```

**Métodos principales:**
```javascript
// Inicialización
init()                        // Setup inicial
loadStory()                   // Carga story.json

// Flujo de juego
startNewGame()                // Nueva partida
loadScene(sceneId)            // Carga una escena
renderScene(scene)            // Renderiza escena actual
advanceScene()                // Avanza a siguiente escena

// Gestión de decisiones
selectChoice(choice)          // Procesa elección del jugador
applyEffects(effects)         // Aplica efectos a stats/flags
determineEpilogue()           // Calcula epílogo según stats

// UI
showDialogue(speaker, text)   // Muestra diálogo
typeText(text, speed)         // Efecto escribir
showChoices(choices)          // Renderiza opciones
renderSprites(sprites)        // Renderiza personajes
setBackground(bg)             // Cambia fondo

// Persistencia
saveGame()                    // Guardado manual
autoSave()                    // Guardado automático
loadGame()                    // Carga partida

// Paneles y modales
togglePanel(panelName)
toggleModal(modalName)
renderHistory()               // Actualiza log
```

---

### 2. Estructura de Datos (story.json)

**Schema de Scene:**
```json
{
  "id": "string (unique)",
  "bg": "string (filename)",
  "sprites": [
    {
      "character": "string",
      "image": "string (filename)",
      "position": "left|center|right"
    }
  ],
  "speaker": "string",
  "text": "string (dialogue)",
  "choices": [
    {
      "label": "string",
      "effects": {
        "stat": number
      },
      "next": "string (sceneId)"
    }
  ],
  "effects": {},
  "next": "string|null (sceneId)",
  "requires": {},             // Opcional
  "nextLogic": "string",      // Opcional
  "isFinalScreen": boolean    // Opcional
}
```

**Tipos de Escenas:**

1. **Escena Lineal:**
   - No tiene choices
   - Tiene `next` definido
   - Avanza automáticamente con botón continuar

2. **Escena de Decisión:**
   - Tiene array `choices` con 2+ opciones
   - `next` está en null
   - Cada choice tiene su propio `next`

3. **Escena con Lógica Especial:**
   - Tiene `nextLogic` definido
   - Ejecuta función personalizada
   - Ej: `checkEpilogueType`

4. **Escena Final:**
   - Tiene `isFinalScreen: true`
   - Renderizado especial (pantalla negra, texto grande)
   - No tiene choices ni next

---

### 3. Sistema de Stats

**Variables Rastreadas:**
- `valentia`: Acciones de coraje y combate
- `ingenio`: Acciones de astucia y estrategia
- `romance`: Acciones emotivas y conexión personal
- `honor`: Acciones de deber y código moral

**Cómo se incrementan:**
```javascript
// En choices del JSON
{
  "effects": {
    "valentia": 1    // Suma 1 a valentía
  }
}

// En el motor
applyEffects(effects) {
  for (const [key, value] of Object.entries(effects)) {
    if (key in this.gameState.stats) {
      this.gameState.stats[key] += value;
    }
  }
}
```

**Lógica de Epílogos:**
```javascript
determineEpilogue() {
  const stats = this.gameState.stats;
  const maxStat = Math.max(
    stats.valentia, 
    stats.ingenio, 
    stats.romance, 
    stats.honor
  );
  
  // Check bonus primero
  if (totalStats >= 10) {
    return 'bonus_scene';
  }
  
  // Determinar según stat mayor
  if (stats.valentia === maxStat && stats.valentia >= 3) {
    return 'epilogo_epico';
  }
  // ... resto
}
```

---

### 4. Sistema de Persistencia (LocalStorage)

**Keys usados:**
- `el-rescate-save`: Guardado manual del jugador
- `el-rescate-autosave`: Guardado automático
- `el-rescate-config`: Configuración del usuario

**Estructura de datos guardados:**
```json
{
  "gameState": {
    "currentSceneId": "string",
    "stats": {},
    "flags": {},
    "history": []
  },
  "timestamp": "ISO 8601 string"
}
```

**Implementación:**
```javascript
// Guardar
saveGame() {
  const saveData = {
    gameState: this.gameState,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('el-rescate-save', JSON.stringify(saveData));
}

// Cargar
loadGame() {
  const saveData = JSON.parse(localStorage.getItem('el-rescate-save'));
  this.gameState = saveData.gameState;
  this.updateStatsDisplay();
  this.loadScene(this.gameState.currentSceneId);
}
```

---

### 5. Sistema de Animaciones

**Transiciones de Pantalla:**
```javascript
fadeTransition(callback) {
  // 1. Overlay fade in (400ms)
  this.dom.transitionOverlay.classList.add('active');
  
  setTimeout(() => {
    // 2. Ejecutar cambios (DOM updates)
    callback();
    
    setTimeout(() => {
      // 3. Overlay fade out (100ms)
      this.dom.transitionOverlay.classList.remove('active');
    }, 100);
  }, 400);
}
```

**Efecto de Escritura:**
```javascript
typeText(text, speed) {
  let charIndex = 0;
  const typeChar = () => {
    if (charIndex < text.length) {
      this.dom.dialogueText.textContent += text[charIndex];
      charIndex++;
      setTimeout(typeChar, speed);
    }
  };
  typeChar();
}

// Velocidades:
textSpeeds = {
  slow: 50,     // 50ms por carácter
  normal: 30,   // 30ms
  fast: 15,     // 15ms
  instant: 0    // Sin animación
}
```

---

## Patrones de Diseño Utilizados

### 1. **Singleton Pattern**
La clase `GameEngine` se instancia una sola vez globalmente.

```javascript
let game;
document.addEventListener('DOMContentLoaded', () => {
  game = new GameEngine();
});
```

### 2. **State Pattern**
El estado del juego se centraliza en `gameState` y se modifica mediante métodos controlados.

### 3. **Observer Pattern (implícito)**
Los event listeners observan cambios en la UI y notifican al GameEngine.

### 4. **Strategy Pattern**
Diferentes estrategias para renderizar escenas según su tipo (lineal, decisión, final).

---

## Flujo de Ejecución

### Inicio del Juego

```
1. DOM Content Loaded
   ↓
2. new GameEngine()
   ↓
3. init()
   ├─ cacheDOMElements()
   ├─ loadConfig() (desde LocalStorage)
   ├─ setupEventListeners()
   └─ loadStory() (fetch story.json)
   ↓
4. Pantalla de carga activa
   ↓
5. Usuario click "COMENZAR"
   ↓
6. startNewGame()
   ├─ Inicializar gameState
   ├─ updateStatsDisplay()
   ├─ switchScreen('game')
   └─ loadScene(initialScene)
```

### Ciclo de Escena

```
1. loadScene(sceneId)
   ↓
2. Obtener scene del story.json
   ↓
3. Aplicar effects (si existen)
   ↓
4. renderScene(scene)
   ├─ fadeTransition()
   ├─ setBackground()
   ├─ renderSprites()
   ├─ showDialogue()
   └─ showChoices() o mostrar botón continuar
   ↓
5. addToHistory()
   ↓
6. autoSave() (si está habilitado)
   ↓
7. Esperar interacción del usuario:
   ├─ Click continuar → advanceScene()
   └─ Click choice → selectChoice()
```

### Decisión del Jugador

```
1. selectChoice(choice)
   ↓
2. applyEffects(choice.effects)
   ├─ Incrementar stats
   └─ updateStatsDisplay()
   ↓
3. playSFX('choice')
   ↓
4. loadScene(choice.next)
```

### Determinación de Epílogo

```
1. Escena con nextLogic: 'checkEpilogueType'
   ↓
2. determineEpilogue()
   ↓
3. Calcular total de stats
   ↓
4. if (total >= 10) → 'bonus_scene'
   ↓
5. else: encontrar stat más alta (>= 3)
   ├─ valentia → 'epilogo_epico'
   ├─ ingenio → 'epilogo_astuto'
   ├─ romance → 'epilogo_intimo'
   └─ honor → 'epilogo_honorable'
   ↓
6. loadScene(epilogoId)
   ↓
7. Eventualmente llega a 'final_universal'
   ↓
8. showFinalScreen() - "TE AMO POTO"
```

---

## Optimizaciones Implementadas

### 1. **Caching de Referencias DOM**
Todas las referencias DOM se cachean en `init()` para evitar queries repetidos.

### 2. **Lazy Loading de Audio**
Los assets de audio solo se cargan cuando se reproducen.

### 3. **Debouncing en Configuración**
Los sliders de volumen no guardan en cada cambio, solo al soltar.

### 4. **Limitación de Historial**
El historial se limita a 50 entradas para evitar memory leaks.

### 5. **Transiciones CSS**
Se usan transiciones CSS3 en lugar de JavaScript para mejor performance.

---

## Extensibilidad

### Agregar Nuevas Stats

1. Agregar a `initialStats` en story.json
2. Agregar display en HTML (stats-panel)
3. Actualizar `updateStatsDisplay()` en game.js

### Agregar Nuevos Tipos de Escena

1. Definir nuevo `nextLogic` en story.json
2. Agregar case en `handleSpecialLogic()`:

```javascript
handleSpecialLogic(logicType) {
  switch(logicType) {
    case 'checkEpilogueType':
      this.determineEpilogue();
      break;
    case 'tuNuevaLogica':  // NUEVO
      this.tuNuevaFuncion();
      break;
  }
}
```

### Agregar Efectos Visuales

1. Definir animación en CSS:
```css
@keyframes tuAnimacion {
  from { ... }
  to { ... }
}
```

2. Aplicar con clases JavaScript:
```javascript
elemento.classList.add('tu-animacion');
```

---

## Debugging

### Modo Debug

Activa la consola del navegador (F12) para ver logs:

```javascript
console.log('Historia cargada:', this.story.gameTitle);
console.log('Escena actual:', this.currentScene);
console.log('Estado del juego:', this.gameState);
```

### Inspeccionar LocalStorage

F12 → Application → Local Storage → file://

### Forzar Escena Específica

En consola del navegador:
```javascript
game.loadScene('epilogo_epico');
```

### Ver Stats Actual

```javascript
console.log(game.gameState.stats);
```

---

## Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### Features Requeridas
- LocalStorage API
- ES6+ (arrow functions, classes, template literals)
- CSS Grid y Flexbox
- Async/Await

### Polyfills NO Necesarios
El código no requiere polyfills para navegadores modernos.

---

## Performance

### Métricas Objetivo
- **Initial Load:** < 2 segundos
- **Scene Transition:** < 500ms
- **UI Response:** < 100ms
- **Save/Load:** < 50ms

### Optimizaciones Futuras
- Lazy load de story.json por capítulos
- Service Worker para offline support
- WebP para imágenes (con fallback)
- Preload de assets críticos

---

## Seguridad

### Consideraciones
- **XSS:** Evitado usando `textContent` en lugar de `innerHTML`
- **LocalStorage:** Datos en cliente, no sensitivos
- **CORS:** No aplica en modo local

---

## Testing

### Testing Manual

1. **Flujo Completo:**
   - Nueva partida → Jugar hasta final → Verificar "TE AMO POTO"

2. **Todas las Rutas:**
   - Probar cada combinación de decisiones principales
   - Verificar que cada epílogo sea alcanzable

3. **Persistencia:**
   - Guardar → Cerrar navegador → Reabrir → Cargar

4. **UI:**
   - Probar todos los paneles y modales
   - Verificar responsive en diferentes resoluciones

### Testing Automatizado (opcional)

Actualmente no implementado. Opciones:
- Jest para lógica de game engine
- Cypress para E2E testing
- Puppeteer para headless testing

---

## Mantenimiento

### Actualizar Contenido

1. Editar `story.json`
2. Agregar assets si es necesario
3. Refrescar navegador (Ctrl+F5)

### Actualizar Motor

1. Editar `game.js`
2. Refrescar navegador
3. Verificar console para errores

### Versionado

Actual: v1.0.0

Formato: `MAJOR.MINOR.PATCH`
- MAJOR: Cambios incompatibles
- MINOR: Nuevas features compatibles
- PATCH: Bug fixes

---

## FAQ Técnico

**P: ¿Por qué no usar un framework?**  
R: Simplicidad, cero dependencias, fácil de modificar para principiantes.

**P: ¿Soporta multiplataforma?**  
R: Sí, funciona en cualquier navegador moderno (desktop/mobile).

**P: ¿Cómo migrar a un servidor?**  
R: Subir todos los archivos. Cambiar `fetch('story.json')` por ruta absoluta si es necesario.

**P: ¿Cómo agregar base de datos?**  
R: Reemplazar LocalStorage con API calls a backend (fetch + Node.js/PHP/etc).

**P: ¿Cómo traducir?**  
R: Crear `story_en.json`, detectar idioma del navegador, cargar JSON correspondiente.

---

**Documentación técnica completa. Para dudas específicas, revisa el código fuente comentado en game.js.**
