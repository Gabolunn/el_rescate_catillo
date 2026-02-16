# 🎨 GUÍA DE ASSETS

## Guía completa para conseguir o crear los recursos visuales y de audio

---

## 🖼️ FONDOS / BACKGROUNDS

### Especificaciones Técnicas
- **Formato:** JPG o PNG
- **Resolución:** 1920x1080px (Full HD 16:9)
- **Tamaño archivo:** < 500KB por imagen (optimizado)
- **Estilo:** Realista o semi-realista, medieval oscuro

### Paleta de Colores Recomendada
- **Base:** Negros (#0a0a0f), grises oscuros (#1a1a24, #2a2a3a)
- **Acentos:** Dorado medieval (#d4af37), plateado (#c0c0c0)
- **Luces:** Naranja fuego (#ff6600), azul frío (#4a6fa5)
- **Sombras:** Negro transparente (rgba(0,0,0,0.6))

### Lista Detallada de Fondos

#### 1. bg_castle_entrance.jpg
**Descripción:** Exterior del castillo de noche  
**Elementos clave:**
- Murallas de piedra oscura
- Puertas de hierro entornadas
- Cielo nocturno con estrellas
- Luz de luna tenue
- Ambiente hostil pero no aterrador

#### 2. bg_castle_interior.jpg
**Descripción:** Pasillo interior del castillo  
**Elementos clave:**
- Paredes de piedra con antorchas
- Arquitectura gótica medieval
- Sombras proyectadas
- Atmósfera sombría

#### 3. bg_dungeon.jpg
**Descripción:** Calabozos húmedos  
**Elementos clave:**
- Celdas con barrotes de hierro
- Humedad en paredes
- Iluminación baja (antorchas distantes)
- Sensación claustrofóbica

#### 4. bg_dungeon_cell.jpg
**Descripción:** Interior de celda individual  
**Elementos clave:**
- Mesa de madera podrida
- Pared de piedra con musgo
- Una nota visible sobre la mesa
- Más luz que calabozos generales

#### 5. bg_tower_stairs.jpg
**Descripción:** Escaleras de caracol ascendentes  
**Elementos clave:**
- Escalones estrechos de piedra
- Perspectiva hacia arriba
- Antorchas en paredes
- Sensación de altura

#### 6. bg_tower_hall.jpg
**Descripción:** Pasillo de torre con calor  
**Elementos clave:**
- Luz rojiza/anaranjada
- Aire distorsionado por calor
- Ventanas estrechas
- Ambiente más cálido visualmente

#### 7. bg_dragon_chamber.jpg
**Descripción:** Cámara del dragón  
**Elementos clave:**
- Espacio vasto con techo alto
- Montañas de oro y tesoros
- Columnas o pilares
- Fuego ambiental (braseros)
- Centro despejado para el dragón

#### 8. bg_tower_top.jpg
**Descripción:** Cima de la torre  
**Elementos clave:**
- Puerta de madera tallada ornamentada
- Luz filtrándose por debajo
- Paredes de piedra circular
- Ventanas con vista nocturna

#### 9. bg_allison_chamber.jpg
**Descripción:** Habitación de Allison  
**Elementos clave:**
- Mobiliario elegante (cama con dosel, mesa)
- Mapa antiguo visible en mesa
- Ventana con barrotes disimulados
- Decoración noble pero sobria
- Iluminación suave (velas)

#### 10. bg_secret_passage.jpg
**Descripción:** Pasadizo secreto  
**Elementos clave:**
- Túnel estrecho de piedra
- Oscuridad con luz tenue al fondo
- Paredes irregulares
- Sensación de escape

#### 11. bg_garden.jpg
**Descripción:** Jardín secreto nocturno  
**Elementos clave:**
- Vegetación mágica/etérea
- Luz de luna prominente
- Flores brillantes
- Atmósfera de paz y belleza
- Contraste con oscuridad del castillo

#### 12. bg_forest_exit.jpg
**Descripción:** Salida al bosque  
**Elementos clave:**
- Árboles con amanecer entre ellos
- Castillo visible a lo lejos atrás
- Camino hacia libertad
- Luz cálida del alba

#### 13. bg_kingdom.jpg
**Descripción:** Vista del reino próspero  
**Elementos clave:**
- Castillo principal majestuoso
- Día claro con cielo azul
- Estandartes y banderas
- Atmósfera de esperanza

#### 14. bg_library.jpg
**Descripción:** Gran biblioteca  
**Elementos clave:**
- Estanterías altas con libros antiguos
- Luz cálida de velas o lámparas
- Mesa de estudio con pergaminos
- Atmósfera académica

#### 15. bg_sunset.jpg
**Descripción:** Atardecer romántico  
**Elementos clave:**
- Campo abierto o colina
- Cielo naranja/rosa/púrpura
- Horizonte despejado
- Atmósfera íntima y serena

#### 16. bg_throne_room.jpg
**Descripción:** Sala del trono  
**Elementos clave:**
- Trono ornamentado al fondo
- Columnas y tapices
- Estandartes del reino
- Iluminación ceremonia

#### 17. bg_black.jpg
**Descripción:** Fondo negro puro  
**Nota:** Puede ser una imagen 1920x1080 totalmente negra (#000000) o simplemente usar CSS

---

## 👤 SPRITES / PERSONAJES

### Especificaciones Técnicas
- **Formato:** PNG con transparencia (canal alpha)
- **Resolución:** 800x1200px (proporción 2:3)
- **Tamaño archivo:** < 300KB por sprite
- **Estilo:** Coherente entre todos los personajes

### Poses y Composición
- **Vista:** 3/4 frontal
- **Iluminación:** Frontal o ligeramente lateral
- **Posición base:** De rodillas hacia arriba (busto + cintura visible)
- **Espacio superior:** Dejar 10% en top para animaciones

### Lista Detallada de Sprites

#### Gabriel - Caballero (5 sprites)

**Diseño Base:**
- Edad: 25-30 años
- Cabello: Oscuro, corto o medio largo
- Armadura: Medieval funcional (no fantasía excesiva)
- Espada: Al cinto, visible pero no prominente
- Físico: Atlético, postura noble

**Variaciones:**
1. **gabriel_neutral.png**
   - Expresión: Seria pero tranquila
   - Brazos: Relajados a los lados
   - Mirada: Directa

2. **gabriel_determined.png**
   - Expresión: Ceño fruncido, mandíbula tensa
   - Brazos: Mano en espada o puños cerrados
   - Mirada: Intensa y firme

3. **gabriel_alert.png**
   - Expresión: Alerta, ojos abiertos
   - Brazos: Mano en empuñadura de espada
   - Postura: Ligeramente defensiva

4. **gabriel_happy.png**
   - Expresión: Sonrisa leve, ojos relajados
   - Brazos: Postura abierta
   - Lenguaje corporal: Aliviado

5. **gabriel_sad.png**
   - Expresión: Melancólica, cejas levantadas
   - Mirada: Ligeramente hacia abajo
   - Postura: Hombros caídos

#### Allison - Princesa (4 sprites)

**Diseño Base:**
- Edad: 22-27 años
- Cabello: Largo, color claro o castaño
- Vestido: Elegante medieval, colores nobles (azul, morado)
- Accesorios: Tiara o cinta, collar fino
- Físico: Grácil pero postura fuerte

**Variaciones:**
1. **allison_neutral.png**
   - Expresión: Serena, compuesta
   - Brazos: Manos juntas o a los lados
   - Postura: Recta, elegante

2. **allison_surprised.png**
   - Expresión: Ojos muy abiertos, boca ligeramente abierta
   - Brazos: Mano en pecho
   - Lenguaje corporal: Sorpresa genuina

3. **allison_determined.png**
   - Expresión: Firme, mirada decidida
   - Brazos: Cruzados o manos en mesa
   - Postura: Confiada y fuerte

4. **allison_happy.png**
   - Expresión: Sonrisa genuina, ojos brillantes
   - Brazos: Postura abierta y relajada
   - Lenguaje corporal: Calidez

#### Skeleton_guard - Guardia Esqueleto (1 sprite)

**Diseño:**
- **skeleton_guard.png**
- Esqueleto completo con armadura oxidada
- Arma: Lanza o espada vieja
- Pose: Amenazante pero no cómica
- Ojos: Luz tenue en cuencas (opcional)
- Estilo: Medieval serio, no caricatura

#### Dragon - Dragón (1 sprite)

**Diseño:**
- **dragon_awake.png**
- Escamas negras brillantes
- Ojos dorados/amarillos intensos
- Alas: Parcialmente extendidas o plegadas
- Pose: Imponente, cabeza levantada
- Tamaño: Que ocupe buena parte del frame
- Expresión: Inteligente, no solo bestial

---

## 🎵 MÚSICA / BGM

### Especificaciones Técnicas
- **Formato:** MP3 (128-192 kbps)
- **Duración:** 2-4 minutos
- **Loop:** Seamless (sin corte audible al reiniciar)
- **Volumen:** Normalizado a -18 LUFS

### Estilo Musical por Track

#### 1. main_theme.mp3
**Estilo:** Épico orquestal con melancolía  
**Instrumentación:** Cuerdas, corno francés, piano  
**Tempo:** Moderato (90-100 BPM)  
**Mood:** Aventura, determinación, misterio  
**Referencia:** Temas de intro de RPG medievales

#### 2. dungeon_theme.mp3
**Estilo:** Dark ambient con percusión mínima  
**Instrumentación:** Drones, cuerdas graves, percusión distante  
**Tempo:** Lento (60-70 BPM)  
**Mood:** Tensión, claustrofobia, peligro latente  
**Referencia:** Música de mazmorras en Dark Souls

#### 3. dragon_theme.mp3
**Estilo:** Épico intenso con drama  
**Instrumentación:** Orquesta completa, coro, tambores tribales  
**Tempo:** Allegro (120-140 BPM)  
**Mood:** Peligro inminente, majestuosidad, respeto  
**Referencia:** Boss themes épicos

#### 4. ending_theme.mp3
**Estilo:** Emotivo y esperanzador  
**Instrumentación:** Piano, cuerdas, flauta  
**Tempo:** Variable (empieza lento, se eleva)  
**Mood:** Resolución, esperanza, logro, amor  
**Referencia:** Temas de créditos emotivos

### Fuentes Recomendadas

**Gratis:**
- **Incompetech** (incompetech.com) - Filtro: Medieval, Orchestral
- **Purple Planet** (purple-planet.com) - Sección: Epic
- **FreePD** (freepd.com) - Dominio público

**Premium (licencias razonables):**
- **AudioJungle** (audiojungle.net)
- **Epidemic Sound** (epidemicsound.com)
- **Artlist** (artlist.io)

---

## 🔊 EFECTOS DE SONIDO / SFX

### Especificaciones Técnicas
- **Formato:** MP3 (128 kbps)
- **Duración:** 0.3-2 segundos
- **Volumen:** Normalizado

### Lista de SFX

#### 1. choice.mp3
**Descripción:** Selección de opción  
**Tipo:** UI elegant click  
**Referencia:** Parchment unfold, light stone click  
**Duración:** ~0.5s

#### 2. save.mp3
**Descripción:** Confirmación de guardado  
**Tipo:** Success chime  
**Referencia:** Libro cerrándose, small bell  
**Duración:** ~1s

#### 3. page_turn.mp3
**Descripción:** Avance de diálogo  
**Tipo:** Page flip suave  
**Referencia:** Paper shuffle  
**Duración:** ~0.8s

### Fuentes Recomendadas

**Gratis:**
- **Zapsplat** (zapsplat.com)
- **Freesound** (freesound.org)
- **Sonniss GDC** (sonniss.com/gameaudiogdc)

---

## 🛠️ HERRAMIENTAS RECOMENDADAS

### Para Crear/Editar Fondos
- **Photoshop / GIMP** - Edición profesional
- **Krita** - Pintura digital gratuita
- **Midjourney** - IA generativa (requiere suscripción)
- **Stable Diffusion** - IA gratuita local
- **DALL-E** - IA generativa OpenAI

### Para Crear/Editar Sprites
- **Clip Studio Paint** - Estándar para ilustración
- **Photoshop** - Edición profesional
- **GIMP** - Alternativa gratuita
- **Krita** - Pintura digital
- **Character Creator 3** - 3D a 2D render

### Para Música
- **Audacity** - Editor gratuito básico
- **FL Studio** - Composición profesional
- **Reaper** - DAW económico
- **MuseScore** - Partituras gratuitas

### Para SFX
- **Audacity** - Edición gratuita
- **Bfxr** - Generador retro
- **ChipTone** - Generador 8-bit

---

## 🤝 ALTERNATIVAS RÁPIDAS

### Si no tienes tiempo/presupuesto:

1. **Usar placeholders CSS**
   - El juego ya tiene fallbacks visuales
   - Gradientes de color temáticos

2. **Contratar en Fiverr**
   - Ilustradores: $30-$100 por set completo
   - Compositores: $50-$150 por 4 tracks

3. **Buscar asset packs**
   - **itch.io** - Asset packs indie baratos
   - **OpenGameArt** - Recursos gratuitos CC

4. **IA Generativa**
   - Fondos: Midjourney (~$10/mes)
   - Sprites: NovelAI, Stable Diffusion (gratis/barato)

5. **Stock con licencia**
   - **Envato Elements** - Suscripción todo incluido
   - **Adobe Stock** - Individual por asset

---

## ✅ CHECKLIST ANTES DE AGREGAR ASSETS

Antes de colocar cada asset en la carpeta correspondiente:

### Fondos
- [ ] Resolución correcta (1920x1080)
- [ ] Formato JPG u optimizado
- [ ] Nombre exacto según story.json
- [ ] Tamaño < 500KB
- [ ] Colores coherentes con paleta

### Sprites
- [ ] Fondo transparente (PNG)
- [ ] Proporción vertical adecuada
- [ ] Estilo coherente entre personajes
- [ ] Nombre exacto según story.json
- [ ] Tamaño < 300KB

### Audio
- [ ] Formato MP3
- [ ] Volume normalizado
- [ ] Loop seamless (BGM)
- [ ] Nombre exacto según convención

---

## 🎯 PRIORIDADES

Si tienes recursos limitados, crea en este orden:

**Prioridad ALTA:**
1. Fondos principales (castillo, calabozo, dragón, habitación Allison)
2. Sprites de Gabriel y Allison (neutral, determinado, feliz)

**Prioridad MEDIA:**
3. Resto de fondos
4. Sprites de esqueleto y dragón
5. Música principal (main_theme)

**Prioridad BAJA:**
6. Resto de música
7. Efectos de sonido (opcional)

---

¿Necesitas más ayuda? Revisa el README.md principal para detalles técnicos adicionales.
