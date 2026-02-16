# EL RESCATE EN EL CASTILLO
## Novela Visual - Documentación Completa

---

## 📋 RESUMEN EJECUTIVO

### Premisa
"El Rescate en el Castillo" es una novela visual seria de género medieval/fantasía donde el caballero Gabriel debe infiltrarse en un castillo oscuro para rescatar a la princesa Allison. El juego combina elementos de acción, ingenio y drama emocional en una narrativa ramificada que responde a las decisiones del jugador.

### Tono
- **Serio y dramático:** tensión real, lealtad, determinación
- **Sin comedia forzada:** momentos ligeros solo cuando son orgánicos
- **Medieval oscuro:** atmósfera sobria, elegante y tensa
- **Emocional:** conexiones profundas entre personajes

### Duración
- **Primera partida:** 15-20 minutos
- **Explorar todas las rutas:** 45-60 minutos
- **Total de escenas:** 60+
- **4 epílogos diferentes** (todos terminan en la misma pantalla final)

### Loop de Juego
1. Leer escena (fondo, personajes, diálogo)
2. Tomar decisión que afecta stats
3. Ver consecuencias inmediatas en diálogos
4. Desbloquear escenas bonus según stats acumuladas
5. Obtener epílogo basado en la stat más alta
6. Pantalla final universal: "TE AMO POTO"

---

## 🗺️ MAPA DE RUTAS

### Estructura General
```
PRÓLOGO
├─ Entrada sigilosamente [+1 Ingenio] → Entrada stealth
└─ Entrada con determinación [+1 Valentía] → Entrada frontal

ACTO 1: CALABOZOS (Guardia Esqueleto)
├─ Usar espada de plata [+1 Valentía] → Acción
├─ Sobornarlo con secreto [+1 Ingenio] → Ingenio
└─ Promesa inquebrantable [+1 Honor] → Determinación
    └─ MICROELECCIÓN: Leer nota de Allison [+1 Romance] o seguir

ACTO 2: TORRE (Dragón)
├─ Desafiar al combate [+1 Valentía] → Combate
├─ Resolver acertijo [+1 Ingenio] → Acertijo
└─ Apelar a soledad [+1 Honor] → Empatía
    └─ MICROELECCIÓN: Tomar escudo honorable [+1 Honor] o dejarlo

ACTO 3: CÁMARA DE ALLISON
├─ Es mi deber [+1 Honor] → Respuesta honorable
├─ Me importas [+1 Romance] → Respuesta emotiva
└─ Confías en mí [+1 Valentía] → Respuesta determinada
    └─ MICROELECCIÓN: ¿Todo bien? [+1 Romance] o seguir

CHECK BONUS
├─ Si total stats >= 10 → ESCENA BONUS: Jardín secreto
└─ Continuar

EPÍLOGOS (según stat más alta >= 3)
├─ Valentía máxima → ÉPICO: Héroes legendarios
├─ Ingenio máximo → ASTUTO: Reformadores del reino
├─ Romance máximo → ÍNTIMO: Amor verdadero
└─ Honor máximo → HONORABLE: Protector y Reina

FINAL UNIVERSAL (obligatorio)
└─ Pantalla negra: "TE AMO POTO"
```

### Tabla de Variables por Elección

| Acto | Elección | Valentia | Ingenio | Romance | Honor |
|------|----------|----------|---------|---------|-------|
| Prólogo | Sigilo | 0 | +1 | 0 | 0 |
| Prólogo | Frontal | +1 | 0 | 0 | 0 |
| Acto 1 | Espada | +1 | 0 | 0 | 0 |
| Acto 1 | Secreto | 0 | +1 | 0 | 0 |
| Acto 1 | Promesa | 0 | 0 | 0 | +1 |
| Acto 1 Micro | Leer nota | 0 | 0 | +1 | 0 |
| Acto 2 | Combate | +1 | 0 | 0 | 0 |
| Acto 2 | Acertijo | 0 | +1 | 0 | 0 |
| Acto 2 | Empatía | 0 | 0 | 0 | +1 |
| Acto 2 Micro | Escudo | 0 | 0 | 0 | +1 |
| Acto 3 | Deber | 0 | 0 | 0 | +1 |
| Acto 3 | Importas | 0 | 0 | +1 | 0 |
| Acto 3 | Confías | +1 | 0 | 0 | 0 |
| Acto 3 Micro | ¿Todo bien? | 0 | 0 | +1 | 0 |

### Rutas Óptimas para cada Epílogo

**ÉPICO (Valentía):**
- Prólogo: Frontal (+1)
- Acto 1: Espada (+1)
- Acto 2: Combate (+1)
- Acto 3: Confías (+1)
- **Total: 4 Valentía**

**ASTUTO (Ingenio):**
- Prólogo: Sigilo (+1)
- Acto 1: Secreto (+1)
- Acto 2: Acertijo (+1)
- Microelecciones para otras stats
- **Total: 3 Ingenio**

**ÍNTIMO (Romance):**
- Acto 1 Micro: Leer nota (+1)
- Acto 3: Importas (+1)
- Acto 3 Micro: ¿Todo bien? (+1)
- Otras elecciones libres
- **Total: 3 Romance**

**HONORABLE (Honor):**
- Acto 1: Promesa (+1)
- Acto 2: Empatía (+1)
- Acto 2 Micro: Escudo (+1)
- Acto 3: Deber (+1)
- **Total: 4 Honor**

**BONUS:**
- Acumular 10+ puntos totales en cualquier combinación

---

## 📝 GUION COMPLETO

### PRÓLOGO: INGRESO AL CASTILLO

**Escena 1 - Exterior del Castillo**
- **Fondo:** bg_castle_entrance.jpg
- **Sprites:** Gabriel (centro, neutral)
- **Narrador:** "La noche cae sobre el Castillo Oscuro. Las murallas se alzan amenazantes contra el cielo estrellado. Gabriel, caballero del reino, se encuentra ante las puertas de hierro. Ha recorrido días de camino para llegar hasta aquí."

**Escena 2**
- **Fondo:** bg_castle_entrance.jpg
- **Sprites:** Gabriel (centro, determinado)
- **Gabriel:** "La princesa Allison está cautiva en algún lugar de esta fortaleza. No importa lo que me espere dentro... debo encontrarla."

**Escena 3 - ELECCIÓN INICIAL**
- **Narrador:** "Las puertas están entornadas. Una decisión se presenta ante él."
- **CHOICES:**
  - [Entrar sigilosamente] +1 Ingenio → Escena 4a
  - [Entrar con determinación] +1 Valentía → Escena 4b

**Escena 4a - Entrada Sigilo**
- **Fondo:** bg_castle_interior.jpg
- **Sprites:** Gabriel (centro, neutral)
- **Narrador:** "Gabriel se desliza entre las sombras, evitando hacer ruido. El castillo parece vacío, pero la tensión en el aire es palpable. Cada paso es calculado."

**Escena 4b - Entrada Frontal**
- **Fondo:** bg_castle_interior.jpg
- **Sprites:** Gabriel (centro, determinado)
- **Narrador:** "Gabriel empuja las puertas con fuerza. El sonido de metal resonando contra piedra reverbera en los pasillos oscuros. No hay vuelta atrás. Avanza con paso firme hacia el interior."

---

### ACTO 1: LOS CALABOZOS

**Escena 5 - Descenso**
- **Fondo:** bg_dungeon.jpg
- **Sprites:** Gabriel (centro, neutral)
- **Narrador:** "Los pasillos descienden hacia las entrañas del castillo. El aire se vuelve frío y húmedo. Las antorchas proyectan sombras danzantes sobre las paredes de piedra."

**Escena 6**
- **Sprites:** Gabriel (centro, alerta)
- **Gabriel:** "Los calabozos... Si hay guardias, estarán aquí. Debo estar preparado."

**Escena 7 - Aparición del Esqueleto**
- **Sprites:** Esqueleto (derecha), Gabriel (izquierda, alerta)
- **Narrador:** "Un sonido metálico detiene a Gabriel en seco. De las sombras emerge una figura esquelética, vestida con armadura oxidada. El Guardián de los Calabozos."

**Escena 8**
- **Esqueleto Guardia:** "...Alto... Nadie... pasa..."

**Escena 9 - ELECCIÓN PRINCIPAL ACTO 1**
- **Narrador:** "Gabriel evalúa la situación. El esqueleto bloquea el único paso hacia adelante. Debe actuar."
- **CHOICES:**
  - [¡Usar mi espada de plata!] +1 Valentía → Escena 10a
  - [Intentar sobornarlo con un secreto del castillo] +1 Ingenio → Escena 10b
  - [Nada me detendrá para ver a la princesa Allison] +1 Honor → Escena 10c

**Escena 10a - Acción (Espada)**
- **Sprites:** Gabriel (centro, determinado)
- **Narrador:** "Gabriel desenvaina su espada de plata con un movimiento fluido. El metal brilla con luz propia en la oscuridad. El esqueleto retrocede, temiendo el poder del arma sagrada."
- **Gabriel:** "Apártate de mi camino, o te devolveré al descanso eterno."

**Escena 10b - Ingenio (Secreto)**
- **Sprites:** Esqueleto (derecha), Gabriel (izquierda, neutral)
- **Gabriel:** "Escucha... Sé que este castillo tiene un pasadizo secreto en la sala del trono. Si me dejas pasar, ese secreto morirá conmigo."
- **Esqueleto Guardia:** "...Pasadizo... no sabía... Está bien... pasa... pero yo... no vi nada..."

**Escena 10c - Determinación (Promesa)**
- **Sprites:** Esqueleto (derecha), Gabriel (izquierda, determinado)
- **Gabriel:** "He jurado proteger a la princesa Allison con mi vida. He cruzado montañas y desiertos. Ni la muerte misma me detendrá. Así que... ¿vas a apartarte?"
- **Narrador:** "El esqueleto observa la determinación en los ojos del caballero. Algo en su mirada muerta cambia. Lentamente, se hace a un lado."

**Escena 11 - Post Esqueleto**
- **Fondo:** bg_dungeon.jpg
- **Sprites:** Gabriel (centro, neutral)
- **Narrador:** "Gabriel avanza por el pasillo de los calabozos. El esqueleto queda atrás, inmóvil. El camino está despejado... por ahora."

**Escena 12 - MICROELECCIÓN**
- **Fondo:** bg_dungeon_cell.jpg
- **Narrador:** "Mientras camina, Gabriel nota una celda entreabierta. Dentro, hay una pequeña nota sobre una mesa de madera podrida."
- **CHOICES:**
  - [Leer la nota] +1 Romance → Escena 13
  - [Seguir adelante sin distracciones] → Acto 2

**Escena 13 - Nota de Allison**
- **Sprites:** Gabriel (centro, triste)
- **Gabriel:** "\"Gabriel... si lees esto... sigue adelante. No te detengas por nada. Confío en ti.\" ...Es la letra de Allison. Está viva."

---

### ACTO 2: LA TORRE Y EL DRAGÓN

**Escena 14 - Ascenso**
- **Fondo:** bg_tower_stairs.jpg
- **Sprites:** Gabriel (centro, neutral)
- **Narrador:** "Las escaleras ascienden en espiral, cada paso es más estrecho que el anterior. El aire se vuelve sofocante. Un aroma a azufre invade el ambiente."

**Escena 15**
- **Fondo:** bg_tower_hall.jpg
- **Sprites:** Gabriel (centro, alerta)
- **Gabriel:** "Este calor... No es natural. Algo grande habita en esta torre."

**Escena 16 - Cámara del Dragón**
- **Fondo:** bg_dragon_chamber.jpg
- **Sprites:** Gabriel (izquierda, alerta)
- **Narrador:** "Gabriel entra en una vasta cámara. El techo se pierde en la oscuridad. Montañas de oro y tesoros relucen bajo la luz de las llamas. Y en el centro..."

**Escena 17 - Aparición del Dragón**
- **Sprites:** Dragón (derecha), Gabriel (izquierda, alerta)
- **Narrador:** "Un dragón. Sus escamas negras brillan como obsidiana. Sus ojos dorados se clavan en Gabriel. No es una bestia cualquiera... es antiguo, poderoso, consciente."

**Escena 18**
- **Dragón:** "Humano... valiente... o estúpido. ¿Qué buscas en mi dominio?"

**Escena 19**
- **Gabriel:** "Busco a la princesa Allison. Déjame pasar."

**Escena 20**
- **Dragón:** "¿Y por qué debería... permitirlo? Este castillo es mi prisión... y mi reino. Nadie pasa... sin pagar un precio."

**Escena 21 - ELECCIÓN PRINCIPAL ACTO 2**
- **Narrador:** "El dragón se yergue, sus alas cubriendo las paredes. Gabriel debe decidir cómo enfrentar esta amenaza."
- **CHOICES:**
  - [Desafiar al dragón al combate] +1 Valentía → Escena 22a
  - [Ofrecer resolver el acertijo que lo mantiene prisionero] +1 Ingenio → Escena 22b
  - [Apelar a la soledad del dragón] +1 Honor → Escena 22c

**Escena 22a - Combate**
- **Gabriel:** "Si el combate es el precio, lo pagaré. Desenvaino mi espada. No retrocederé."
- **Dragón:** "Coraje... admirable. Muy bien, humano. Tu valentía te ha ganado el paso. Pero recuerda... el coraje sin sabiduría es solo temeridad."

**Escena 22b - Acertijo**
- **Gabriel:** "Esperabas un guerrero que te desafíe. Pero veo algo más en tus ojos. Estás atado a este lugar por una maldición, ¿verdad? Puedo ayudarte."
- **Dragón:** "Perceptivo... Muy bien. La maldición es simple: solo quien comprende que la verdadera prisión es la soledad puede liberarme. Y tú... lo comprendes. Pasa."

**Escena 22c - Empatía**
- **Sprites:** Gabriel (izquierda, triste)
- **Gabriel:** "Has estado solo aquí durante siglos, ¿verdad? Guardando este castillo vacío. Sin nadie con quien hablar. Conozco esa soledad."
- **Dragón:** "...Siglos, sí. Nadie me había hablado así en mucho tiempo. Ve, caballero. Encuentra a tu princesa. Y cuando salgan... llévense también mi bendición."

**Escena 23 - Paso del Dragón**
- **Sprites:** Gabriel (centro, neutral)
- **Narrador:** "El dragón se aparta, abriendo el camino hacia la escalera que asciende a la torre más alta. Gabriel continúa su ascenso."

**Escena 24 - MICROELECCIÓN**
- **Fondo:** bg_tower_stairs.jpg
- **Narrador:** "En las escaleras, Gabriel encuentra una armadura antigua colgada en la pared. Tiene grabado un escudo familiar."
- **CHOICES:**
  - [Tomar el escudo como recuerdo de honor] +1 Honor → Escena 25
  - [Dejarlo en su lugar] → Acto 3

**Escena 25 - Escudo**
- **Gabriel:** "Este escudo perteneció a un caballero honorable. Llevaré su legado conmigo."

---

### ACTO 3: LA CÁMARA DE ALLISON

**Escena 26 - Cima de la Torre**
- **Fondo:** bg_tower_top.jpg
- **Sprites:** Gabriel (centro, alerta)
- **Narrador:** "Finalmente, Gabriel alcanza la cima de la torre. Una puerta de madera tallada se alza frente a él. Luz tenue se filtra por debajo."

**Escena 27**
- **Sprites:** Gabriel (centro, determinado)
- **Gabriel:** "Allison... estoy aquí."

**Escena 28 - Reencuentro**
- **Fondo:** bg_allison_chamber.jpg
- **Sprites:** Gabriel (izquierda, neutral), Allison (derecha, neutral)
- **Narrador:** "Gabriel empuja la puerta. La cámara es amplia, amueblada con elegancia pero claramente una prisión. Allison está junto a una mesa, estudiando un mapa antiguo del castillo."

**Escena 29**
- **Sprites:** Allison (derecha, sorprendida)
- **Allison:** "¿Gabriel? ¿Eres realmente tú?"

**Escena 30**
- **Sprites:** Gabriel (izquierda, feliz)
- **Gabriel:** "Sí, Allison. He venido a sacarte de aquí."

**Escena 31**
- **Sprites:** Allison (derecha, determinada)
- **Allison:** "Llevaba semanas preparándome para escapar por mi cuenta. Pero... me alegra que estés aquí. He estudiado las rutas de escape. Tenemos que actuar rápido."

**Escena 32**
- **Sprites:** Allison (derecha, neutral)
- **Allison:** "Pero antes... Gabriel, ¿por qué viniste? Era peligroso. Pudiste morir en el camino."

**Escena 33 - ELECCIÓN PRINCIPAL ACTO 3**
- **Narrador:** "Una pregunta directa que merece una respuesta sincera."
- **CHOICES:**
  - [Es mi deber como caballero protegerte] +1 Honor → Escena 34a
  - [No podía dejarte sola aquí] +1 Romance → Escena 34b
  - [Porque confías en mí, y no fallaré] +1 Valentía → Escena 34c

**Escena 34a - Deber**
- **Sprites:** Gabriel (izquierda, determinado)
- **Gabriel:** "Es mi deber como caballero protegerte, Allison. Hace años, juré servir al reino y a la familia real. Ese juramento no es solo palabras."
- **Sprites:** Allison (derecha, feliz)
- **Allison:** "Tu honor siempre te ha definido, Gabriel. Es uno de los rasgos que más admiro en ti."

**Escena 34b - Corazón**
- **Sprites:** Gabriel (izquierda, triste)
- **Gabriel:** "No podía dejarte sola aquí, Allison. Cada día sin saber si estabas bien era insoportable. No vine solo como tu caballero... vine porque me importas."
- **Sprites:** Allison (derecha, feliz)
- **Allison:** "Gabriel... yo también pensé en ti cada día. Saber que llegarías me dio fuerzas para resistir."

**Escena 34c - Confianza**
- **Sprites:** Gabriel (izquierda, determinado)
- **Gabriel:** "Porque confías en mí, Allison. Depositaste esa confianza en mí, y no voy a fallar. Nunca."
- **Sprites:** Allison (derecha, determinada)
- **Allison:** "Y yo confiaré en ti hasta el final. Ahora, salgamos de aquí juntos."

**Escena 35 - Escape**
- **Allison:** "Hay un pasadizo oculto detrás de esa estantería. Lleva directamente fuera del castillo. ¿Listo?"

**Escena 36**
- **Gabriel:** "Listo. Vamos."

**Escena 37 - MICROELECCIÓN**
- **Fondo:** bg_secret_passage.jpg
- **Narrador:** "Mientras cruzan el pasadizo secreto, Allison se detiene un momento y mira a Gabriel."
- **CHOICES:**
  - [¿Todo bien?] +1 Romance → Escena 38
  - [Debemos seguir] → Check Bonus

**Escena 38 - Romance**
- **Sprites:** Allison (derecha, feliz)
- **Allison:** "Sí... solo quería decir gracias. Por todo."

---

### ESCENA BONUS (Si >= 10 stats totales)

**Escena 39 - Jardín Secreto**
- **Fondo:** bg_garden.jpg
- **Sprites:** Gabriel (izquierda, feliz), Allison (derecha, feliz)
- **Narrador:** "ESCENA BONUS DESBLOQUEADA: Tras salir del pasadizo, Gabriel y Allison llegan a un jardín secreto iluminado por la luna. Un lugar de paz después de tanta tensión."

**Escena 40**
- **Allison:** "Este lugar... es hermoso. No sabía que existía."

**Escena 41**
- **Gabriel:** "Un momento de calma. Lo necesitábamos."

---

### EPÍLOGOS

**EPÍLOGO ÉPICO (Valentía máxima)**

**Escena 42a**
- **Fondo:** bg_kingdom.jpg
- **Sprites:** Gabriel (izquierda, determinado), Allison (derecha, determinada)
- **Narrador:** "FINAL ÉPICO: Gabriel y Allison regresan al reino como héroes. Su valentía será recordada durante generaciones. Juntos, liderarán al reino hacia una nueva era de esperanza."

**Escena 43a**
- **Allison:** "El reino necesita protectores como tú, Gabriel. Juntos seremos invencibles."

---

**EPÍLOGO ASTUTO (Ingenio máximo)**

**Escena 42b**
- **Fondo:** bg_library.jpg
- **Sprites:** Gabriel (izquierda, neutral), Allison (derecha, neutral)
- **Narrador:** "FINAL ASTUTO: Gabriel y Allison utilizan su experiencia para reformar el sistema de defensa del reino. Su inteligencia y estrategia salvan al reino de futuras amenazas sin derramamiento de sangre."

**Escena 43b**
- **Allison:** "La verdadera fuerza no está solo en la espada, sino en la mente."

---

**EPÍLOGO ÍNTIMO (Romance máximo)**

**Escena 42c**
- **Fondo:** bg_sunset.jpg
- **Sprites:** Gabriel (izquierda, feliz), Allison (derecha, feliz)
- **Narrador:** "FINAL ÍNTIMO: Gabriel y Allison encuentran paz alejados de la vida de la corte. Su conexión, forjada en la adversidad, florece en un amor profundo y duradero."

**Escena 43c**
- **Allison:** "Aquí, contigo, he encontrado lo que buscaba. No un rescate... sino un hogar."

---

**EPÍLOGO HONORABLE (Honor máximo)**

**Escena 42d**
- **Fondo:** bg_throne_room.jpg
- **Sprites:** Gabriel (izquierda, determinado), Allison (derecha, determinada)
- **Narrador:** "FINAL HONORABLE: Gabriel es nombrado Gran Protector del Reino. Su honor intachable inspira a una nueva generación de caballeros. Allison, como reina, gobierna con justicia y sabiduría."

**Escena 43d**
- **Gabriel:** "Serviré al reino hasta mi último aliento. Este es mi juramento."

---

### FINAL UNIVERSAL (OBLIGATORIO)

**Escena 44 - Pantalla Final**
- **Fondo:** Negro puro (bg_black.jpg)
- **Sin sprites**
- **Sin speaker**
- **Texto centralizado, grande, dorado:**

# TE AMO POTO

---

## 🎮 INSTRUCCIONES DE USO

### Instalación Local

1. **Descargar el proyecto completo**
2. **Estructura de carpetas requerida:**
```
juego-allison/
├── index.html
├── styles.css
├── game.js
├── story.json
├── assets/
│   ├── backgrounds/
│   │   ├── bg_castle_entrance.jpg
│   │   ├── bg_castle_interior.jpg
│   │   ├── bg_dungeon.jpg
│   │   ├── bg_dungeon_cell.jpg
│   │   ├── bg_tower_stairs.jpg
│   │   ├── bg_tower_hall.jpg
│   │   ├── bg_dragon_chamber.jpg
│   │   ├── bg_tower_top.jpg
│   │   ├── bg_allison_chamber.jpg
│   │   ├── bg_secret_passage.jpg
│   │   ├── bg_garden.jpg
│   │   ├── bg_forest_exit.jpg
│   │   ├── bg_kingdom.jpg
│   │   ├── bg_library.jpg
│   │   ├── bg_sunset.jpg
│   │   ├── bg_throne_room.jpg
│   │   └── bg_black.jpg
│   ├── sprites/
│   │   ├── gabriel_neutral.png
│   │   ├── gabriel_determined.png
│   │   ├── gabriel_alert.png
│   │   ├── gabriel_happy.png
│   │   ├── gabriel_sad.png
│   │   ├── allison_neutral.png
│   │   ├── allison_surprised.png
│   │   ├── allison_determined.png
│   │   ├── allison_happy.png
│   │   ├── skeleton_guard.png
│   │   └── dragon_awake.png
│   ├── music/ (opcional)
│   │   ├── main_theme.mp3
│   │   ├── dungeon_theme.mp3
│   │   ├── dragon_theme.mp3
│   │   └── ending_theme.mp3
│   └── sfx/ (opcional)
│       ├── choice.mp3
│       ├── save.mp3
│       └── page_turn.mp3
└── README.md
```

3. **Abrir index.html en un navegador moderno**
   - Chrome (recomendado)
   - Firefox
   - Edge
   - Safari

### Controles

- **Click** - Avanzar diálogo / Seleccionar opción
- **☰ (Menú)** - Abrir menú de opciones
- **📜 (Historial)** - Ver historial de diálogos
- **💾 (Guardar)** - Guardar partida actual
- **⚙️ (Configuración)** - Ajustar velocidad de texto, volumen, etc.

### Características

- ✅ **Guardado automático** después de cada escena
- ✅ **Guardado manual** en cualquier momento
- ✅ **Historial de texto** para revisar diálogos anteriores
- ✅ **Sistema de stats** visible en todo momento
- ✅ **4 epílogos diferentes** según tus decisiones
- ✅ **Escena bonus secreta** si acumulas suficientes stats
- ✅ **Velocidad de texto ajustable** (lenta/normal/rápida/instantánea)
- ✅ **Totalmente funcional sin servidor** (modo local)

### Notas Técnicas

- **Sin frameworks:** JavaScript vanilla puro
- **LocalStorage:** Guarda datos en el navegador
- **Resolución recomendada:** 1920x1080 (Full HD)
- **Compatible con responsive:** Se adapta a tablets y móviles
- **Audio opcional:** El juego funciona incluso sin archivos de audio

---

## 🎨 LISTA DE ASSETS NECESARIOS

### Fondos (Backgrounds) - 16:9 ratio, 1920x1080px

| Archivo | Descripción | Referencia Visual |
|---------|-------------|-------------------|
| `bg_castle_entrance.jpg` | Entrada del castillo de noche, puertas de hierro, murallas oscuras, cielo estrellado | Castillo gótico medieval |
| `bg_castle_interior.jpg` | Pasillo de piedra con antorchas, arquitectura medieval oscura | Interior castillo |
| `bg_dungeon.jpg` | Calabozos húmedos, paredes de piedra, celdas con barrotes | Mazmorra medieval |
| `bg_dungeon_cell.jpg` | Interior de celda con mesa podrida y nota | Celda individual |
| `bg_tower_stairs.jpg` | Escaleras de caracol ascendiendo, estrechas, antorchas | Escalera torre |
| `bg_tower_hall.jpg` | Pasillo de torre con calor, luz rojiza | Pasillo elevado |
| `bg_dragon_chamber.jpg` | Cámara vasta con tesoros, columnas, fuego ambiente | Guarida de dragón |
| `bg_tower_top.jpg` | Puerta tallada de madera, luz bajo la puerta | Cima torre |
| `bg_allison_chamber.jpg` | Habitación elegante pero prisión, mesa con mapas | Cuarto princesa |
| `bg_secret_passage.jpg` | Pasadizo estrecho de piedra, oscuro | Túnel secreto |
| `bg_garden.jpg` | Jardín secreto nocturno iluminado por luna | Jardín mágico |
| `bg_forest_exit.jpg` | Bosque exterior del castillo, amanecer | Salida bosque |
| `bg_kingdom.jpg` | Reino con castillo principal, día claro | Reino próspero |
| `bg_library.jpg` | Biblioteca con libros antiguos, luz cálida | Gran biblioteca |
| `bg_sunset.jpg` | Atardecer en campo abierto, romántico | Paisaje sunset |
| `bg_throne_room.jpg` | Sala del trono elegante, estandartes | Sala ceremonial |
| `bg_black.jpg` | Negro puro (o usar CSS) | Color #000000 |

### Sprites (Personajes) - PNG con transparencia, ~800x1200px

| Archivo | Descripción | Pose/Expresión |
|---------|-------------|----------------|
| **GABRIEL (Caballero)** | | |
| `gabriel_neutral.png` | Armadura medieval, espada al cinto, cabello oscuro | Postura neutral |
| `gabriel_determined.png` | Misma base, expresión seria y determinada | Mirada firme |
| `gabriel_alert.png` | Mano en empuñadura de espada, alerta | Postura defensiva |
| `gabriel_happy.png` | Sonrisa leve, relajado | Expresión aliviada |
| `gabriel_sad.png` | Expresión melancólica, mirada baja | Vulnerable |
| **ALLISON (Princesa)** | | |
| `allison_neutral.png` | Vestido elegante medieval, cabello largo, postura noble | Neutral elegante |
| `allison_surprised.png` | Ojos abiertos, mano en pecho | Sorpresa genuina |
| `allison_determined.png` | Brazos cruzados o manos en mesa, mirada firme | Determinación |
| `allison_happy.png` | Sonrisa cálida, postura abierta | Felicidad |
| **OTROS** | | |
| `skeleton_guard.png` | Esqueleto con armadura oxidada, lanza o espada | Pose amenazante |
| `dragon_awake.png` | Dragón negro con ojos dorados, alas parcialmente extendidas | Imponente |

### Música (Opcional) - MP3, loop seamless

| Archivo | Uso | Duración sugerida |
|---------|-----|-------------------|
| `main_theme.mp3` | Menú principal y prólogo | 2-3 min loop |
| `dungeon_theme.mp3` | Acto 1 (calabozos) | 2-3 min loop |
| `dragon_theme.mp3` | Acto 2 (dragón) | 2-3 min loop |
| `ending_theme.mp3` | Epílogos y final | 3-4 min |

### Efectos de Sonido (Opcional) - MP3 cortos

| Archivo | Descripción |
|---------|-------------|
| `choice.mp3` | Selección de opción (click elegante) |
| `save.mp3` | Confirmación de guardado |
| `page_turn.mp3` | Avance de diálogo |

### Placeholders

Si no tienes los assets, el juego funciona con:
- **Fondos:** Gradientes CSS de colores apropiados
- **Sprites:** Se ocultan automáticamente si no se encuentran
- **Audio:** El juego es completamente funcional sin audio

### Recomendaciones de Creación

**Fondos:**
- Estilo: Realista o semi-realista, colores oscuros
- Paleta: Negros, grises, azules oscuros, dorados para acentos
- Iluminación: Baja, dramática, con antorchas o luz de luna
- Herramientas: Photoshop, Midjourney, Stable Diffusion, DALL-E

**Sprites:**
- Estilo: Artístico coherente (anime serio o semi-realista)
- Fondo: Transparente (PNG)
- Iluminación: Frontal o 3/4, consistente
- Detalles: Alta calidad, expresiones claras
- Herramientas: Clip Studio Paint, Photoshop, comisiones artísticas

**Audio:**
- Música: Orquestal medieval, dark ambient
- SFX: Sutiles, no invasivos
- Fuentes gratuitas: Incompetech, Purple Planet, Zapsplat

---

## 🔧 PERSONALIZACIÓN

### Editar el Guion

Todo el contenido está en `story.json`. Para modificar:

```json
{
  "scenes": {
    "id_escena": {
      "bg": "fondo.jpg",
      "sprites": [...],
      "speaker": "Nombre",
      "text": "Diálogo",
      "choices": [...],
      "effects": { "valentia": 1 },
      "next": "proxima_escena"
    }
  }
}
```

### Agregar Nuevas Escenas

1. Define la escena en `story.json` con un ID único
2. Conecta con `"next": "tu_nueva_escena"`
3. Agrega assets correspondientes en `/assets`

### Modificar Estilos

Edita `styles.css`, variables CSS en `:root`:

```css
:root {
    --color-accent-gold: #d4af37;  /* Color principal */
    --text-size-normal: 1.1rem;    /* Tamaño de texto */
    /* ... más variables */
}
```

### Añadir Idiomas

Duplica `story.json` como `story_en.json` y modifica el motor para detectar idioma.

---

## 📊 DIAGRAMA DE SISTEMA

```
┌─────────────────────────────────────────────────────┐
│                  GAME ENGINE (game.js)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐     ┌──────────────┐            │
│  │  Story Loader│────▶│  Scene Manager│            │
│  │  (JSON)      │     │  (Render)    │            │
│  └──────────────┘     └──────────────┘            │
│         │                     │                     │
│         ▼                     ▼                     │
│  ┌──────────────┐     ┌──────────────┐            │
│  │  Game State  │     │  UI Manager  │            │
│  │  (Stats,Flags)│    │ (DOM Render) │            │
│  └──────────────┘     └──────────────┘            │
│         │                     │                     │
│         ▼                     ▼                     │
│  ┌──────────────┐     ┌──────────────┐            │
│  │ Save/Load Sys│     │ Audio Manager│            │
│  │ (LocalStorage)│    │ (BGM/SFX)    │            │
│  └──────────────┘     └──────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Necesito servidor web?**
R: No. Abre `index.html` directamente en tu navegador. Todo funciona localmente.

**P: ¿Los assets son obligatorios?**
R: No. El juego tiene fallbacks para fondos, sprites y audio.

**P: ¿Cómo respaldar mi partida?**
R: Las partidas se guardan en localStorage del navegador. Para exportar, usa las herramientas de desarrollador (F12) → Application → Local Storage.

**P: ¿Puedo cambiar el mensaje final?**
R: Sí, edita `story.json` → escena `"final_universal"` → campo `"text"`. Pero el requisito original es mantener "TE AMO POTO".

**P: ¿Cómo desbloqueo la escena bonus?**
R: Acumula 10 o más puntos totales entre las 4 stats (valentía, ingenio, romance, honor). Toma todas las microelecciones.

**P: ¿Puedo agregar más personajes?**
R: Sí. Agrega sus sprites a `/assets/sprites/` y referencialos en `story.json`.

---

## 🚀 PRÓXIMOS PASOS / MEJORAS OPCIONALES

- [ ] Agregar galería de arte desbloqueada
- [ ] Sistema de logros/achievements
- [ ] Más rutas y finales alternativos
- [ ] Modo "skip texto ya leído"
- [ ] Exportar partida como JSON
- [ ] Integración con backend para leaderboards
- [ ] Traducción a otros idiomas
- [ ] Versión móvil nativa (Cordova/Capacitor)

---

## 📜 CRÉDITOS

**Dirección Narrativa:** Sistema de branching narrativo con 4 variables de personalidad
**Diseño de Juego:** Estructura Prólogo-3Actos-Epílogo con micro-decisiones
**Programación:** Motor JavaScript vanilla sin dependencias
**Engine:** GameEngine v1.0 - HTML5/CSS3/ES6

**Herramientas:**
- JavaScript ES6+ (Motor de juego)
- HTML5 (Estructura)
- CSS3 (Estética medieval)
- JSON (Datos de historia)
- LocalStorage API (Persistencia)

---

## 📄 LICENCIA

Este proyecto es un trabajo personalizado. Todos los derechos reservados.
Uso personal permitido. Prohibida distribución comercial sin permiso.

---

**¡Disfruta de "El Rescate en el Castillo"!**

*"TE AMO POTO"*
