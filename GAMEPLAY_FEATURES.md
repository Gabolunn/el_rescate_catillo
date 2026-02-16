# 🎮 SISTEMA DE JUGABILIDAD MEJORADA

## ✨ CARACTERÍSTICAS IMPLEMENTADAS

### 1. ⚔️ **EFECTOS VISUALES DINÁMICOS**

#### Screen Shake (Temblor de Pantalla)
- **Light**: Temblor suave para momentos de tensión
- **Medium**: Temblor moderado en combates
- **Heavy**: Temblor intenso en encuentros con el dragón

**Cuándo se activa:**
- Combate con el esqueleto (`acto1_accion`)
- Encuentro con el dragón (`acto2_04`, `acto2_combate`)
- QTEs fallidos

#### Flash Screen (Destello de Pantalla)
- Flash dorado al iniciar partida
- Flash verde al cargar partida
- Flash rojo durante QTEs del dragón
- Flash dorado al desbloquear logros

#### Sistema de Partículas
- **Stats**: Números flotantes `+1 VALENTÍA` cuando suben estadísticas
- **Corazones**: 💕 flotantes en momentos románticos
- **CGs**: 🖼️ cuando se desbloquea una imagen de galería
- Todas las partículas flotan hacia arriba con fade out

---

### 2. 📊 **FEEDBACK VISUAL DE STATS**

Cada vez que una decisión afecta tus estadísticas:

1. **Número flotante** aparece con el incremento (`+1`, `+2`)
2. **Animación del stat** - el cuadro se agranda brevemente
3. **Brillo dorado** pulsa en el número
4. **Sonido sutil** de mejora (si tienes el SFX)
5. **Contador animado** - los números crecen gradualmente

**Resultado:** Te sientes recompensado inmediatamente por tus decisiones

---

### 3. 💕 **INDICADOR DE RELACIÓN CON ALLISON**

Una barra dinámica que aparece cuando Allison entra en escena.

**Cómo funciona:**
- Se llena con cada punto de **Romance**
- Genera corazones flotantes en momentos románticos
- Brillo rosa shimmer animado
- Máximo: 10 puntos

**Aparece en:**
- Primera vez que ves a Allison (`acto3_04`)
- Todas las escenas posteriores con ella
- Permanece visible hasta el final

---

### 4. 🏆 **SISTEMA DE LOGROS**

**8 Logros Desbloqueables:**

| Logro | Icono | Condición | Dificultad |
|-------|-------|-----------|------------|
| **Corazón Valiente** | ⚔️ | Valentía ≥ 5 | Media |
| **Mente Brillante** | 🧠 | Ingenio ≥ 5 | Media |
| **Amor Verdadero** | 💕 | Romance ≥ 5 | Media |
| **Alma Noble** | 🛡️ | Honor ≥ 5 | Media |
| **Perfeccionista** | ✨ | Todas las stats ≥ 10 | Muy Difícil |
| **Rescate Rápido** | ⚡ | Terminar sin ver historial | Fácil |
| **Coleccionista** | 🖼️ | Desbloquear toda la galería | Media |
| **Reflejos de Acero** | 🎯 | Perfectos en todos los QTEs | Difícil |

**Notificaciones:**
- Aparecen en esquina superior derecha
- Animación de entrada con bounce
- Flash dorado de pantalla
- Sonido especial de logro
- Persisten 4 segundos
- Se guardan automáticamente

**Panel de Logros:**
- Botón 🏆 en controles superiores
- Logros bloqueados aparecen como `???` con 🔒
- Logros desbloqueados muestran nombre completo e icono
- Se puede ver progreso en cualquier momento

---

### 5. ⚡ **QUICK TIME EVENTS (QTE)**

Sistema de reflejos que AUMENTA LA DIFICULTAD.

**Cómo funciona:**
1. En escenas clave, aparece panel central
2. Muestra una **tecla aleatoria** (W, A, S, D, o SPACE)
3. Timer de 2 segundos (barra roja que se vacía)
4. **Debes presionar la tecla EXACTA antes de que termine el tiempo**

**Escenas con QTE:**
- `acto1_accion` - Combate con esqueleto (+1 Valentía si aciertas)
- `acto2_combate` - Desafío al dragón (+1 Valentía si aciertas)
- `acto2_04` - Encuentro con el dragón (+2 Valentía si acertás - MÁS DIFÍCIL)

**Recompensas por éxito:**
- ✅ Bonus de stats
- ✅ Partícula flotante especial
- ✅ Flash verde
- ✅ Sonido de victoria

**Castigos por fallo:**
- ❌ Sin bonus
- ❌ Screen shake
- ❌ Sonido de error
- ❌ Penaliza el logro "Reflejos de Acero"

**Logro especial:**
- Conseguir los 3 QTEs perfectos = **Reflejos de Acero** 🎯

---

### 6. 🖼️ **GALERÍA DE CGs (COLECCIONABLES)**

Sistema de imágenes desbloqueables.

**6 CGs Coleccionables:**
1. **Entrada al Castillo** (`prologo_01`)
2. **Encuentro con el Guardián** (`acto1_03`)
3. **El Dragón** (`acto2_04`)
4. **Reencuentro** (`acto3_04`)
5. **Jardín Secreto** (`bonus_scene`) - Solo si desbloqueas bonus
6. **Final** (`final_universal`)

**Funcionamiento:**
- Se desbloquean **automáticamente** al llegar a cada escena
- Notificación sutil con 🖼️ flotante
- Botón de Galería en controles superiores
- CGs bloqueadas aparecen borrosas con 🔒
- Click en CG desbloqueada = ver en pantalla completa
- Modalidad de visualización inmersiva

**Logro relacionado:**
- Desbloquear las 6 = **Coleccionista** 🖼️

---

### 7. 💾 **INDICADOR DE AUTO-SAVE**

Notificación visual cada vez que el juego se guarda automáticamente.

**Características:**
- Aparece en esquina superior izquierda
- Ícono de disquette 💾 con animación de pulso
- Texto "Guardando..."
- Se muestra 2 segundos
- Transición suave de entrada/salida

**Se activa:**
- Cada escena (si auto-save está ON)
- Al desbloquear logros
- Al avanzar la historia

---

### 8. 🎯 **MEJORAS DE CALIDAD DE VIDA**

#### Animaciones Mejoradas
- Stats crecen gradualmente en lugar de cambio instantáneo
- Efectos de brillo en elementos interactivos
- Transiciones más fluidas entre escenas

#### Controles Ampliados
- 2 botones nuevos en barra superior: 🏆 Logros | 🖼️ Galería
- Todos los botones con hover effects mejorados

#### Feedback Auditivo
- 5 SFX nuevos (ver `assets/sfx/README.md`)
- Sonidos diferenciados por tipo de acción
- Opcional - juego funciona sin audio

---

## 🕹️ CÓMO JUGAR CON LAS NUEVAS FEATURES

### Para Obtener Todos los Logros:

1. **Primera Partida - Ruta Romántica:**
   - Prioriza decisiones de Romance
   - Completa todos los QTEs perfectamente
   - NO abras el historial (logro "Rescate Rápido")
   - Objetivo: Desbloquear "Amor Verdadero" + "Reflejos de Acero"

2. **Segunda Partida - Ruta Épica:**
   - Prioriza Valentía y Honor
   - Desbloquea todos los CGs (Galería completa)
   - Objetivo: Logros de stats faltantes

3. **Tercera Partida - Perfeccionista:**
   - Balancea TODAS las stats para llegar a 10+
   - Más difícil pero desbloquea el logro especial ✨

---

## 🎨 PERSONALIZACIÓN

Todos los efectos visuales están en `styles.css` bajo el comentario:
```css
/* NUEVAS FEATURES - JUGABILIDAD MEJORADA */
```

Puedes ajustar:
- Colores de las partículas
- Duración de animaciones
- Intensidad de screen shake
- Velocidad de QTEs (modifica `timeLimit` en `game.js`)

---

## 🐛 RESOLUCIÓN DE PROBLEMAS

### Los QTEs no aparecen
- Verifica que estés en las escenas correctas: `acto1_accion`, `acto2_combate`, `acto2_04`
- Revisa la consola del navegador (F12) por errores

### Los logros no se guardan
- Verifica que `autoSave` esté habilitado en Configuración
- Prueba guardar manualmente (💾)

### Las partículas no flotan
- Asegúrate de que CSS está cargado correctamente
- Refresca la página (Ctrl+F5) para limpiar caché

### Los sonidos no suenan
- Es normal si no has agregado los archivos SFX
- El juego funciona perfectamente en silencio
- Agrega los archivos según `assets/sfx/README.md`

---

## 📈 ESTADÍSTICAS DE DIFICULTAD

Basado en el diseño actual:

| Aspecto | Dificultad | Motivo |
|---------|------------|--------|
| Obtener un logro de stat | ⭐⭐⭐ Media | Requiere decisiones enfocadas |
| Perfeccionista | ⭐⭐⭐⭐⭐ Muy Alta | Necesitas balancear 4 stats a 10+ |
| QTE Master | ⭐⭐⭐⭐ Alta | Solo 2 segundos, tecla aleatoria, 3 oportunidades |
| Coleccionista | ⭐⭐⭐ Media | Solo hay que llegar a las escenas |
| Rescate Rápido | ⭐ Muy Fácil | Solo no abrir historial |

**Tiempo estimado para 100%:** 3-5 horas de juego (múltiples partidas)

---

## 🚀 PRÓXIMAS MEJORAS POSIBLES

Ideas que se pueden agregar fácilmente:

- [ ] Modo "Difícil" con QTEs más rápidos (1 segundo)
- [ ] Mini-juego de diálogo (elegir respuesta en tiempo limitado)
- [ ] Sistema de "Decisiones Timed" (countdown visible)
- [ ] Efectos de partículas en fondos (lluvia, niebla)
- [ ] Modo "Sin HUD" para screenshots
- [ ] Galería de música desbloqueada
- [ ] Logros secretos ocultos
- [ ] Contador de muertes (Game Over scenes)

---

## 💡 CRÉDITOS

**Sistema de Jugabilidad Mejorada** implementado con:
- Vanilla JavaScript (ES6+)
- CSS3 Animations & Transitions
- LocalStorage API para persistencia
- Sin dependencias externas

**Todas las features son:**
- ✅ Completamente funcionales
- ✅ Optimizadas para performance
- ✅ Mobile-friendly (responsive)
- ✅ Sin errores de consola
- ✅ Retrocompatibles con partidas antiguas

---

¡Disfruta el juego! 🎮✨
