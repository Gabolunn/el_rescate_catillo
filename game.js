// ==========================================
// EL RESCATE EN EL CASTILLO - GAME ENGINE
// ==========================================

class GameEngine {
    constructor() {
        // Estado del juego
        this.story = null;
        this.currentScene = null;
        this.gameState = {
            currentSceneId: null,
            stats: {
                valentia: 0,
                ingenio: 0,
                romance: 0,
                honor: 0
            },
            flags: {},
            history: [],
            relationship: 0,
            achievements: [],
            unlockedCGs: []
        };
        
        // Configuración
        this.config = {
            textSpeed: 'normal',
            musicVolume: 70,
            sfxVolume: 80,
            autoSave: true
        };
        
        // Velocidades de texto (ms por caracter)
        this.textSpeeds = {
            slow: 50,
            normal: 30,
            fast: 15,
            instant: 0
        };
        
        // Logros disponibles
        this.achievements = {
            brave_heart: { id: 'brave_heart', name: 'Corazón Valiente', desc: 'Alcanza 5+ en Valentía', icon: '⚔️', unlocked: false },
            sharp_mind: { id: 'sharp_mind', name: 'Mente Brillante', desc: 'Alcanza 5+ en Ingenio', icon: '🧠', unlocked: false },
            true_love: { id: 'true_love', name: 'Amor Verdadero', desc: 'Alcanza 5+ en Romance', icon: '💕', unlocked: false },
            noble_soul: { id: 'noble_soul', name: 'Alma Noble', desc: 'Alcanza 5+ en Honor', icon: '🛡️', unlocked: false },
            perfectionist: { id: 'perfectionist', name: 'Perfeccionista', desc: 'Consigue todos los stats al máximo', icon: '✨', unlocked: false },
            speed_runner: { id: 'speed_runner', name: 'Rescate Rápido', desc: 'Completa el juego sin mirar historial', icon: '⚡', unlocked: false },
            collector: { id: 'collector', name: 'Coleccionista', desc: 'Desbloquea toda la galería', icon: '🖼️', unlocked: false },
            qte_master: { id: 'qte_master', name: 'Reflejos de Acero', desc: 'Completa todos los QTEs perfectamente', icon: '🎯', unlocked: false }
        };
        
        // Galería de CGs
        this.gallery = {
            cg_entrance: { id: 'cg_entrance', name: 'Entrada al Castillo', scene: 'prologo_01', unlocked: false },
            cg_skeleton: { id: 'cg_skeleton', name: 'Encuentro con el Guardián', scene: 'acto1_03', unlocked: false },
            cg_dragon: { id: 'cg_dragon', name: 'El Dragón', scene: 'acto2_04', unlocked: false },
            cg_allison_meet: { id: 'cg_allison_meet', name: 'Reencuentro', scene: 'acto3_04', unlocked: false },
            cg_garden: { id: 'cg_garden', name: 'Jardín Secreto', scene: 'bonus_scene', unlocked: false },
            cg_ending: { id: 'cg_ending', name: 'Final', scene: 'final_universal', unlocked: false }
        };
        
        // QTE tracking
        this.qteData = {
            totalAttempts: 0,
            perfectHits: 0,
            currentQTE: null
        };
        
        // RPG Combat System
        this.combatState = {
            inCombat: false,
            enemy: null,
            enemyHp: 0,
            enemyMaxHp: 0,
            playerTurn: true,
            isDefending: false,
            buffAtk: 1,
            buffDef: false,
            onWin: null,
            onLose: null,
            combatSceneId: null
        };
        
        // Items definition
        this.itemDefs = {
            pocion_vida: { name: 'Poción de Vida', icon: '🧪', desc: 'Restaura 30 HP', type: 'heal', value: 30 },
            pocion_fuerza: { name: 'Poción de Fuerza', icon: '💪', desc: '+50% daño siguiente ataque', type: 'buff_atk', value: 1.5 },
            hierba_curativa: { name: 'Hierba Curativa', icon: '🌿', desc: 'Restaura 15 HP', type: 'heal', value: 15 },
            escudo_magico: { name: 'Escudo Mágico', icon: '🛡️', desc: 'Bloquea el próximo ataque', type: 'buff_def', value: 1 }
        };
        
        // Attack definitions
        this.attacks = {
            estocada: { name: 'Estocada', icon: '⚔️', stat: 'valentia', baseDmg: 15, desc: 'Ataque directo con espada' },
            golpe_tactico: { name: 'Golpe Táctico', icon: '🧠', stat: 'ingenio', baseDmg: 12, desc: 'Golpe preciso a punto débil' },
            castigo_divino: { name: 'Castigo Divino', icon: '✨', stat: 'honor', baseDmg: 18, desc: 'Ataque sagrado poderoso' },
            defender: { name: 'Defender', icon: '🛡️', stat: null, baseDmg: 0, desc: 'Reduce el daño recibido a la mitad' }
        };
        
        // Referencia a elementos DOM
        this.dom = {};
        
        // Control de animaciones
        this.isTyping = false;
        this.typingTimeout = null;
        
        this.init();
    }
    
    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    
    async init() {
        this.cacheDOMElements();
        this.loadConfig();
        this.setupEventListeners();
        await this.loadStory();
    }
    
    cacheDOMElements() {
        // Screens
        this.dom.loadingScreen = document.getElementById('loading-screen');
        this.dom.gameScreen = document.getElementById('game-screen');
        
        // Game elements
        this.dom.background = document.getElementById('background');
        this.dom.spritesContainer = document.getElementById('sprites-container');
        this.dom.speakerName = document.getElementById('speaker-name');
        this.dom.dialogueText = document.getElementById('dialogue-text');
        this.dom.continueBtn = document.getElementById('continue-btn');
        this.dom.choicesContainer = document.getElementById('choices-container');
        
        // Stats
        this.dom.statValentia = document.getElementById('stat-valentia');
        this.dom.statIngenio = document.getElementById('stat-ingenio');
        this.dom.statRomance = document.getElementById('stat-romance');
        this.dom.statHonor = document.getElementById('stat-honor');
        
        // Control buttons
        this.dom.menuBtn = document.getElementById('menu-btn');
        this.dom.logBtn = document.getElementById('log-btn');
        this.dom.saveBtn = document.getElementById('save-btn');
        this.dom.settingsBtn = document.getElementById('settings-btn');
        this.dom.achievementsBtn = document.getElementById('achievements-btn');
        this.dom.galleryBtn = document.getElementById('gallery-btn');
        
        // Panels
        this.dom.menuPanel = document.getElementById('menu-panel');
        this.dom.logPanel = document.getElementById('log-panel');
        this.dom.logContent = document.getElementById('log-content');
        this.dom.achievementsPanel = document.getElementById('achievements-panel');
        this.dom.achievementsContent = document.getElementById('achievements-content');
        this.dom.galleryPanel = document.getElementById('gallery-panel');
        this.dom.galleryContent = document.getElementById('gallery-content');
        
        // Modals
        this.dom.settingsModal = document.getElementById('settings-modal');
        this.dom.confirmModal = document.getElementById('confirm-modal');
        
        // Audio
        this.dom.bgmAudio = document.getElementById('bgm-audio');
        this.dom.sfxAudio = document.getElementById('sfx-audio');
        
        // Transition
        this.dom.transitionOverlay = document.getElementById('transition-overlay');
        
        // New features
        this.dom.relationshipBar = document.getElementById('relationship-bar');
        this.dom.relationshipFill = document.getElementById('relationship-fill');
        this.dom.autosaveIndicator = document.getElementById('autosave-indicator');
        this.dom.qtePanel = document.getElementById('qte-panel');
        this.dom.qteKey = document.getElementById('qte-key');
        this.dom.qteTimerFill = document.getElementById('qte-timer-fill');
        this.dom.particlesContainer = document.getElementById('particles-container');
        this.dom.achievementContainer = document.getElementById('achievement-container');
        
        // Combat elements
        this.dom.combatPanel = document.getElementById('combat-panel');
        this.dom.enemyName = document.getElementById('enemy-name');
        this.dom.enemyHpFill = document.getElementById('enemy-hp-fill');
        this.dom.enemyHpText = document.getElementById('enemy-hp-text');
        this.dom.enemySprite = document.getElementById('enemy-sprite');
        this.dom.playerSprite = document.getElementById('player-sprite');
        this.dom.playerCombatHpFill = document.getElementById('player-combat-hp-fill');
        this.dom.playerCombatHpText = document.getElementById('player-combat-hp-text');
        this.dom.combatLog = document.getElementById('combat-log-text');
        this.dom.combatActions = document.getElementById('combat-actions');
        this.dom.combatItemsMenu = document.getElementById('combat-items-menu');
        this.dom.combatItemsList = document.getElementById('combat-items-list');
        this.dom.itemCount = document.getElementById('item-count');
        
        // Death screen
        this.dom.deathScreen = document.getElementById('death-screen');
        
        // HP bar
        this.dom.hpBar = document.getElementById('hp-bar');
        this.dom.hpFill = document.getElementById('hp-fill');
        this.dom.hpText = document.getElementById('hp-text');
        
        // Chest
        this.dom.chestNotification = document.getElementById('chest-notification');
        this.dom.chestItems = document.getElementById('chest-items');
        
        // Inventory panel
        this.dom.inventoryPanel = document.getElementById('inventory-panel');
        this.dom.inventoryContent = document.getElementById('inventory-content');
        this.dom.inventoryBtn = document.getElementById('inventory-btn');
    }
    
    setupEventListeners() {
        // Loading screen
        document.getElementById('start-btn').addEventListener('click', () => this.startNewGame());
        document.getElementById('load-btn').addEventListener('click', () => this.loadGame());
        
        // Game controls
        this.dom.continueBtn.addEventListener('click', () => this.advanceScene());
        this.dom.menuBtn.addEventListener('click', () => this.togglePanel('menu'));
        this.dom.logBtn.addEventListener('click', () => this.togglePanel('log'));
        this.dom.saveBtn.addEventListener('click', () => this.saveGame());
        this.dom.settingsBtn.addEventListener('click', () => this.toggleModal('settings'));
        this.dom.achievementsBtn.addEventListener('click', () => this.togglePanel('achievements'));
        this.dom.galleryBtn.addEventListener('click', () => this.togglePanel('gallery'));
        this.dom.inventoryBtn.addEventListener('click', () => this.togglePanel('inventory'));
        
        // Menu panel
        document.getElementById('close-menu-btn').addEventListener('click', () => this.closePanel('menu'));
        document.getElementById('menu-save-btn').addEventListener('click', () => {
            this.saveGame();
            this.closePanel('menu');
        });
        document.getElementById('menu-load-btn').addEventListener('click', () => {
            this.loadGame();
            this.closePanel('menu');
        });
        document.getElementById('menu-restart-btn').addEventListener('click', () => this.confirmRestart());
        document.getElementById('menu-title-btn').addEventListener('click', () => this.confirmReturnToTitle());
        
        // Log panel
        document.getElementById('close-log-btn').addEventListener('click', () => this.closePanel('log'));
        
        // Achievements panel
        document.getElementById('close-achievements-btn').addEventListener('click', () => this.closePanel('achievements'));
        
        // Gallery panel
        document.getElementById('close-gallery-btn').addEventListener('click', () => this.closePanel('gallery'));
        
        // Inventory panel
        document.getElementById('close-inventory-btn').addEventListener('click', () => this.closePanel('inventory'));
        
        // Combat buttons
        document.querySelectorAll('.attack-btn, .defend-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.combatState.playerTurn && this.combatState.inCombat) {
                    this.playerAttack(btn.dataset.attack);
                }
            });
        });
        document.getElementById('combat-item-btn').addEventListener('click', () => this.toggleCombatItems());
        document.getElementById('close-items-menu').addEventListener('click', () => {
            this.dom.combatItemsMenu.classList.add('hidden');
        });
        
        // Death screen
        document.getElementById('retry-btn').addEventListener('click', () => this.retryCombat());
        document.getElementById('death-title-btn').addEventListener('click', () => {
            this.dom.deathScreen.classList.remove('active');
            this.switchScreen('loading');
        });
        
        // Settings modal
        document.getElementById('close-settings-btn').addEventListener('click', () => this.closeModal('settings'));
        document.getElementById('text-speed').addEventListener('change', (e) => this.updateConfig('textSpeed', e.target.value));
        document.getElementById('music-volume').addEventListener('input', (e) => {
            this.updateConfig('musicVolume', e.target.value);
            document.getElementById('music-volume-value').textContent = e.target.value + '%';
        });
        document.getElementById('sfx-volume').addEventListener('input', (e) => {
            this.updateConfig('sfxVolume', e.target.value);
            document.getElementById('sfx-volume-value').textContent = e.target.value + '%';
        });
        document.getElementById('auto-save').addEventListener('change', (e) => this.updateConfig('autoSave', e.target.checked));
        
        // Confirm modal
        document.getElementById('confirm-no-btn').addEventListener('click', () => this.closeModal('confirm'));
        
        // Skip typing on click
        this.dom.dialogueText.addEventListener('click', () => {
            if (this.isTyping) {
                this.skipTyping();
            }
        });
    }
    
    async loadStory() {
        try {
            const response = await fetch('story.json');
            this.story = await response.json();
            console.log('Historia cargada:', this.story.gameTitle);
        } catch (error) {
            console.error('Error al cargar story.json:', error);
            alert('Error al cargar la historia. Verifica que story.json existe.');
        }
    }
    
    // ==========================================
    // FLUJO DE JUEGO
    // ==========================================
    
    startNewGame() {
        // Inicializar estado
        this.gameState = {
            currentSceneId: this.story.initialScene,
            stats: { ...this.story.initialStats },
            flags: {},
            history: [],
            relationship: 0,
            achievements: [],
            unlockedCGs: [],
            hp: 100,
            maxHp: 100,
            inventory: {}
        };
        
        // Reset QTE data
        this.qteData = {
            totalAttempts: 0,
            perfectHits: 0,
            currentQTE: null
        };
        
        this.updateStatsDisplay();
        this.updateRelationship(0);
        this.updateHPDisplay();
        this.switchScreen('game');
        this.loadScene(this.gameState.currentSceneId);
        
        // Mostrar efecto especial de inicio
        this.flashScreen('#d4a24a', 500);
    }
    
    loadScene(sceneId) {
        // Obtener escena del JSON
        const scene = this.story.scenes[sceneId];
        
        if (!scene) {
            console.error('Escena no encontrada:', sceneId);
            return;
        }
        
        this.currentScene = scene;
        this.gameState.currentSceneId = sceneId;
        
        // Verificar si es la pantalla final especial
        if (scene.isFinalScreen) {
            this.showFinalScreen(scene);
            return;
        }
        
        // Reproducir música según la zona
        this.updateBGM(scene.bg);
        
        // Desbloquear CG si corresponde
        this.checkCGUnlock(sceneId);
        
        // Mostrar barra de relación si Allison aparece
        const hasAllison = scene.sprites && scene.sprites.some(s => s.character === 'allison');
        if (hasAllison) {
            this.dom.relationshipBar.classList.add('visible');
        }
        
        // Aplicar efectos de la escena
        if (scene.effects) {
            this.applyEffects(scene.effects);
        }
        
        // Handle chest in scene
        if (scene.chest) {
            setTimeout(() => this.openChest(scene.chest), 800);
        }
        
        // Trigger QTEs en escenas específicas (only if no combat)
        if (!scene.combat && this.shouldTriggerQTE(sceneId)) {
            setTimeout(() => this.handleSceneQTE(sceneId), 1000);
        }
        
        // Renderizar escena
        this.renderScene(scene);
        
        // Trigger combat after dialogue
        if (scene.combat) {
            this.combatState.combatSceneId = sceneId;
        }
        
        // Agregar al historial
        this.addToHistory(scene.speaker, scene.text);
        
        // Auto-guardado con indicador visual
        if (this.config.autoSave) {
            this.autoSave();
            this.showAutosaveIndicator();
        }
    }
    
    renderScene(scene) {
        // Transición suave
        this.fadeTransition(() => {
            // Cambiar fondo
            this.setBackground(scene.bg);
            
            // Renderizar sprites
            this.renderSprites(scene.sprites);
            
            // Mostrar diálogo
            this.showDialogue(scene.speaker, scene.text);
            
            // Guardar choices pendientes para mostrar después de paginación
            this.pendingChoices = (scene.choices && scene.choices.length > 0) ? scene.choices : null;
            
            // Si hay páginas múltiples, ocultar choices y mostrar botón siguiente
            if (this.dialoguePages && this.dialoguePages.length > 1) {
                this.hideChoices();
                this.dom.continueBtn.classList.remove('hidden');
            } else if (this.pendingChoices) {
                // Texto corto con choices: mostrar choices directamente
                this.showChoices(this.pendingChoices);
                this.dom.continueBtn.classList.add('hidden');
            } else {
                // Sin choices: mostrar continuar
                this.hideChoices();
                this.dom.continueBtn.classList.remove('hidden');
            }
            
        });
    }
    
    setBackground(bgImage) {
        if (bgImage === 'bg_black.jpg') {
            this.dom.background.style.backgroundImage = 'none';
            this.dom.background.style.backgroundColor = '#000000';
        } else {
            this.dom.background.style.backgroundImage = `url('assets/backgrounds/${bgImage}')`;
            this.dom.background.style.backgroundColor = '';
        }
    }
    
    renderSprites(sprites) {
        // Limpiar sprites anteriores
        this.dom.spritesContainer.innerHTML = '';
        
        if (!sprites || sprites.length === 0) return;
        
        // Agregar nuevos sprites
        sprites.forEach(spriteData => {
            const sprite = document.createElement('img');
            sprite.src = `assets/sprites/${spriteData.image}`;
            sprite.alt = spriteData.character;
            sprite.classList.add('sprite', `position-${spriteData.position}`, 'fade-in');
            sprite.onerror = () => {
                // Placeholder si la imagen no existe
                sprite.style.display = 'none';
            };
            this.dom.spritesContainer.appendChild(sprite);
        });
    }
    
    showDialogue(speaker, text) {
        this.dom.speakerName.textContent = speaker;
        
        // Paginar texto largo (máximo ~300 caracteres por página)
        const maxChars = 300;
        if (text.length > maxChars) {
            this.dialoguePages = this.paginateText(text, maxChars);
            this.currentPage = 0;
            this.fullText = text;
            this.showCurrentPage();
        } else {
            this.dialoguePages = null;
            this.currentPage = 0;
            this.fullText = text;
            this.renderText(text);
        }
    }
    
    paginateText(text, maxChars) {
        const pages = [];
        let remaining = text;
        
        while (remaining.length > 0) {
            if (remaining.length <= maxChars) {
                pages.push(remaining);
                break;
            }
            
            // Buscar el último punto, coma o espacio dentro del límite
            let cutPoint = remaining.lastIndexOf('. ', maxChars);
            if (cutPoint === -1 || cutPoint < maxChars * 0.4) {
                cutPoint = remaining.lastIndexOf(', ', maxChars);
            }
            if (cutPoint === -1 || cutPoint < maxChars * 0.4) {
                cutPoint = remaining.lastIndexOf(' ', maxChars);
            }
            if (cutPoint === -1) {
                cutPoint = maxChars;
            }
            
            // Incluir el punto/coma en la página
            const page = remaining.substring(0, cutPoint + 1).trim();
            pages.push(page);
            remaining = remaining.substring(cutPoint + 1).trim();
        }
        
        return pages;
    }
    
    renderText(text) {
        const speed = this.textSpeeds[this.config.textSpeed];
        
        if (speed === 0) {
            this.dom.dialogueText.textContent = text;
            this.isTyping = false;
        } else {
            this.typeText(text, speed);
        }
    }
    
    showCurrentPage() {
        const text = this.dialoguePages[this.currentPage];
        this.renderText(text);
        
        const isLastPage = this.currentPage >= this.dialoguePages.length - 1;
        
        // Actualizar botón de continuar para mostrar indicador de página
        if (this.dialoguePages.length > 1) {
            const pageIndicator = ` (${this.currentPage + 1}/${this.dialoguePages.length})`;
            
            if (isLastPage && this.pendingChoices) {
                // Última página con choices: mostrar choices
                this.showChoices(this.pendingChoices);
                this.dom.continueBtn.classList.add('hidden');
            } else {
                this.hideChoices();
                this.dom.continueBtn.classList.remove('hidden');
                this.dom.continueBtn.textContent = isLastPage 
                    ? '▶ Continuar' + pageIndicator 
                    : '▶ Siguiente' + pageIndicator;
            }
        }
    }
    
    hasMorePages() {
        return this.dialoguePages && this.currentPage < this.dialoguePages.length - 1;
    }
    
    nextPage() {
        this.currentPage++;
        this.showCurrentPage();
    }
    
    typeText(text, speed) {
        this.isTyping = true;
        // Usar innerHTML con span visible/invisible para evitar reflow
        const visibleSpan = document.createElement('span');
        const hiddenSpan = document.createElement('span');
        hiddenSpan.style.visibility = 'hidden';
        
        this.dom.dialogueText.textContent = '';
        this.dom.dialogueText.appendChild(visibleSpan);
        this.dom.dialogueText.appendChild(hiddenSpan);
        
        visibleSpan.textContent = '';
        hiddenSpan.textContent = text;
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                visibleSpan.textContent = text.substring(0, charIndex + 1);
                hiddenSpan.textContent = text.substring(charIndex + 1);
                charIndex++;
                this.typingTimeout = setTimeout(typeChar, speed);
            } else {
                this.isTyping = false;
            }
        };
        
        typeChar();
    }
    
    skipTyping() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        // Mostrar solo la página actual, no todo el texto
        if (this.dialoguePages) {
            this.dom.dialogueText.textContent = this.dialoguePages[this.currentPage];
        } else {
            this.dom.dialogueText.textContent = this.fullText || this.currentScene.text;
        }
        this.isTyping = false;
    }
    
    showChoices(choices) {
        this.dom.choicesContainer.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.classList.add('choice-btn');
            button.textContent = choice.label;
            button.addEventListener('click', () => this.selectChoice(choice));
            this.dom.choicesContainer.appendChild(button);
        });
    }
    
    hideChoices() {
        this.dom.choicesContainer.innerHTML = '';
    }
    
    selectChoice(choice) {
        // Aplicar efectos de la elección
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }
        
        // Avanzar a la siguiente escena
        if (choice.next) {
            this.loadScene(choice.next);
        }
        
        // Reproducir SFX
        this.playSFX('choice');
    }
    
    advanceScene() {
        // Si está escribiendo, completar el texto primero
        if (this.isTyping) {
            this.skipTyping();
            return;
        }
        
        // Si hay más páginas de diálogo, mostrar la siguiente
        if (this.hasMorePages()) {
            this.nextPage();
            return;
        }
        
        // Si la escena tiene combate, iniciar combate al continuar
        if (this.currentScene.combat && !this.combatState.inCombat) {
            this.initiateCombat(this.currentScene.combat);
            return;
        }
        
        // Resetear botón continuar
        this.dom.continueBtn.textContent = '▶ Continuar';
        
        const scene = this.currentScene;
        
        // Verificar lógica especial
        if (scene.nextLogic) {
            this.handleSpecialLogic(scene.nextLogic);
            return;
        }
        
        // Verificar condiciones
        if (scene.requires && !this.checkRequirements(scene.requires)) {
            console.log('Condiciones no cumplidas');
            return;
        }
        
        // Avanzar normalmente
        if (scene.next) {
            this.loadScene(scene.next);
        } else {
            console.log('Fin de la escena actual');
        }
    }
    
    handleSpecialLogic(logicType) {
        switch(logicType) {
            case 'checkEpilogueType':
                this.determineEpilogue();
                break;
            default:
                console.warn('Lógica desconocida:', logicType);
        }
    }
    
    determineEpilogue() {
        const stats = this.gameState.stats;
        
        // Determinar epílogo según las stats más altas
        const maxStat = Math.max(stats.valentia, stats.ingenio, stats.romance, stats.honor);
        
        // Verificar bonus scene primero (solo si no se visitó ya)
        const totalStats = stats.valentia + stats.ingenio + stats.romance + stats.honor;
        if (totalStats >= 10 && !this.gameState.flags.bonusVisited) {
            this.gameState.flags.bonusVisited = true;
            this.loadScene('bonus_scene');
            return;
        }
        
        // Determinar epílogo
        if (stats.valentia === maxStat && stats.valentia >= 3) {
            this.loadScene('epilogo_epico');
        } else if (stats.ingenio === maxStat && stats.ingenio >= 3) {
            this.loadScene('epilogo_astuto');
        } else if (stats.romance === maxStat && stats.romance >= 3) {
            this.loadScene('epilogo_intimo');
        } else if (stats.honor === maxStat && stats.honor >= 3) {
            this.loadScene('epilogo_honorable');
        } else {
            // Default: épico
            this.loadScene('epilogo_epico');
        }
    }
    
    // ==========================================
    // SISTEMA DE STATS Y EFECTOS
    // ==========================================
    
    applyEffects(effects) {
        const statEffects = {};
        const flagEffects = {};
        
        // Separar stats de flags
        for (const [key, value] of Object.entries(effects)) {
            if (key in this.gameState.stats) {
                statEffects[key] = value;
            } else {
                flagEffects[key] = value;
                this.gameState.flags[key] = value;
            }
        }
        
        // Aplicar stats con feedback visual
        if (Object.keys(statEffects).length > 0) {
            this.updateStatsWithFeedback(statEffects);
        } else {
            this.updateStatsDisplay();
        }
    }
    
    updateStatsDisplay() {
        const stats = this.gameState.stats;
        this.dom.statValentia.textContent = stats.valentia;
        this.dom.statIngenio.textContent = stats.ingenio;
        this.dom.statRomance.textContent = stats.romance;
        this.dom.statHonor.textContent = stats.honor;
    }
    
    checkRequirements(requires) {
        // Implementar verificación de requires si es necesario
        for (const [key, value] of Object.entries(requires)) {
            if (this.gameState.stats[key] < value) {
                return false;
            }
        }
        return true;
    }
    
    // ==========================================
    // HISTORIAL
    // ==========================================
    
    addToHistory(speaker, text) {
        this.gameState.history.push({ speaker, text });
        
        // Limitar historial a 50 entradas
        if (this.gameState.history.length > 50) {
            this.gameState.history.shift();
        }
    }
    
    renderHistory() {
        this.dom.logContent.innerHTML = '';
        
        this.gameState.history.forEach(entry => {
            const logEntry = document.createElement('div');
            logEntry.classList.add('log-entry');
            
            const speaker = document.createElement('div');
            speaker.classList.add('log-speaker');
            speaker.textContent = entry.speaker;
            
            const text = document.createElement('div');
            text.classList.add('log-text');
            text.textContent = entry.text;
            
            logEntry.appendChild(speaker);
            logEntry.appendChild(text);
            this.dom.logContent.appendChild(logEntry);
        });
        
        // Scroll al final
        this.dom.logContent.scrollTop = this.dom.logContent.scrollHeight;
    }
    
    // ==========================================
    // GUARDADO Y CARGA
    // ==========================================
    
    saveGame() {
        try {
            const saveData = {
                gameState: this.gameState,
                achievements: Object.keys(this.achievements).reduce((acc, key) => {
                    acc[key] = this.achievements[key].unlocked;
                    return acc;
                }, {}),
                qteData: this.qteData,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('el-rescate-save', JSON.stringify(saveData));
            
            this.showNotification('Partida guardada');
            this.playSFX('save');
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar la partida');
        }
    }
    
    autoSave() {
        try {
            const saveData = {
                gameState: this.gameState,
                achievements: Object.keys(this.achievements).reduce((acc, key) => {
                    acc[key] = this.achievements[key].unlocked;
                    return acc;
                }, {}),
                qteData: this.qteData,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('el-rescate-autosave', JSON.stringify(saveData));
        } catch (error) {
            console.error('Error en auto-guardado:', error);
        }
    }
    
    loadGame() {
        try {
            const saveData = JSON.parse(localStorage.getItem('el-rescate-save'));
            
            if (!saveData) {
                // Intentar cargar auto-guardado
                const autoSave = JSON.parse(localStorage.getItem('el-rescate-autosave'));
                if (autoSave) {
                    this.restoreSave(autoSave);
                    return;
                }
                
                alert('No hay partida guardada');
                return;
            }
            
            this.restoreSave(saveData);
        } catch (error) {
            console.error('Error al cargar:', error);
            alert('Error al cargar la partida');
        }
    }
    
    restoreSave(saveData) {
        this.gameState = saveData.gameState;
        
        // Ensure HP and inventory exist for older saves
        if (this.gameState.hp === undefined) {
            this.gameState.hp = 100;
            this.gameState.maxHp = 100;
        }
        if (!this.gameState.inventory) {
            this.gameState.inventory = {};
        }
        
        // Restaurar achievements
        if (saveData.achievements) {
            Object.keys(saveData.achievements).forEach(key => {
                if (this.achievements[key]) {
                    this.achievements[key].unlocked = saveData.achievements[key];
                }
            });
        }
        
        // Restaurar QTE data
        if (saveData.qteData) {
            this.qteData = saveData.qteData;
        }
        
        // Actualizar displays
        this.updateStatsDisplay();
        this.updateHPDisplay();
        if (this.gameState.relationship) {
            this.updateRelationship(0); // Actualiza la barra al valor correcto
        }
        
        this.switchScreen('game');
        this.loadScene(this.gameState.currentSceneId);
        this.showNotification('Partida cargada');
        this.flashScreen('#00ff00', 300);
    }
    
    // ==========================================
    // UI Y PANTALLAS
    // ==========================================
    
    switchScreen(screenName) {
        this.dom.loadingScreen.classList.remove('active');
        this.dom.gameScreen.classList.remove('active');
        
        if (screenName === 'loading') {
            this.dom.loadingScreen.classList.add('active');
        } else if (screenName === 'game') {
            this.dom.gameScreen.classList.add('active');
        }
        
    }
    
    showFinalScreen(scene) {
        this.fadeTransition(() => {
            this.dom.background.style.backgroundImage = 'none';
            this.dom.background.style.backgroundColor = '#000000';
            this.dom.spritesContainer.innerHTML = '';
            this.dom.speakerName.textContent = '';
            this.hideChoices();
            this.dom.continueBtn.classList.add('hidden');
            
            // Crear contenedor final especial
            const stats = this.gameState.stats;
            const totalStats = stats.valentia + stats.ingenio + stats.romance + stats.honor;
            
            const finalHTML = `
                <div class="final-screen-container">
                    <div class="final-stats-summary">
                        <h3 style="color: var(--color-accent-gold); font-family: var(--font-heading); margin-bottom: 15px; font-size: 1.2rem;">Tu Historia</h3>
                        <div class="final-stat-row"><span>⚔️ Valentía</span><span>${stats.valentia}</span></div>
                        <div class="final-stat-row"><span>🧠 Ingenio</span><span>${stats.ingenio}</span></div>
                        <div class="final-stat-row"><span>💕 Romance</span><span>${stats.romance}</span></div>
                        <div class="final-stat-row"><span>🛡️ Honor</span><span>${stats.honor}</span></div>
                        <div class="final-stat-row final-stat-total"><span>✨ Total</span><span>${totalStats}</span></div>
                    </div>
                    <div class="final-message">${scene.text}</div>
                    <div class="final-hearts">💖</div>
                    <div class="final-credits">
                        <p style="color: #888; font-size: 0.85rem; margin-top: 30px;">El Rescate en el Castillo</p>
                        <p style="color: #666; font-size: 0.75rem;">Hecho con amor</p>
                    </div>
                    <button class="final-restart-btn" onclick="game.startNewGame()">🔄 Jugar de Nuevo</button>
                </div>
            `;
            
            this.dom.dialogueText.style.fontSize = '1rem';
            this.dom.dialogueText.style.textAlign = 'center';
            this.dom.dialogueText.innerHTML = finalHTML;
            
            // Animar elementos con delay
            setTimeout(() => {
                const container = document.querySelector('.final-screen-container');
                if (container) container.classList.add('visible');
            }, 300);
        });
    }
    
    // togglePanel y closePanel están definidos al final de la clase
    
    closePanel(panelName) {
        const panels = {
            menu: this.dom.menuPanel,
            log: this.dom.logPanel,
            achievements: this.dom.achievementsPanel,
            gallery: this.dom.galleryPanel,
            inventory: this.dom.inventoryPanel
        };
        const panel = panels[panelName];
        if (panel) panel.classList.remove('active');
    }
    
    toggleModal(modalName) {
        const modal = modalName === 'settings' ? this.dom.settingsModal : this.dom.confirmModal;
        
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
        } else {
            modal.classList.add('active');
        }
    }
    
    closeModal(modalName) {
        const modal = modalName === 'settings' ? this.dom.settingsModal : this.dom.confirmModal;
        modal.classList.remove('active');
    }
    
    showConfirm(title, message, onConfirm) {
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        
        const yesBtn = document.getElementById('confirm-yes-btn');
        
        // Remover listeners anteriores
        const newYesBtn = yesBtn.cloneNode(true);
        yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);
        
        newYesBtn.addEventListener('click', () => {
            onConfirm();
            this.closeModal('confirm');
        });
        
        this.toggleModal('confirm');
    }
    
    confirmRestart() {
        this.showConfirm(
            'Reiniciar',
            '¿Estás seguro de que quieres reiniciar la historia? Se perderá el progreso actual.',
            () => {
                this.closePanel('menu');
                this.startNewGame();
            }
        );
    }
    
    confirmReturnToTitle() {
        this.showConfirm(
            'Volver al título',
            '¿Deseas volver a la pantalla de título?',
            () => {
                this.closePanel('menu');
                this.switchScreen('loading');
            }
        );
    }
    
    fadeTransition(callback) {
        this.dom.transitionOverlay.classList.add('active');
        
        setTimeout(() => {
            callback();
            
            setTimeout(() => {
                this.dom.transitionOverlay.classList.remove('active');
            }, 100);
        }, 400);
    }
    
    showNotification(message) {
        // Simple notification (puedes mejorar esto)
        console.log('Notificación:', message);
    }
    
    // ==========================================
    // CONFIGURACIÓN
    // ==========================================
    
    loadConfig() {
        try {
            const savedConfig = localStorage.getItem('el-rescate-config');
            if (savedConfig) {
                this.config = JSON.parse(savedConfig);
            }
            
            // Aplicar configuración a la UI
            document.getElementById('text-speed').value = this.config.textSpeed;
            document.getElementById('music-volume').value = this.config.musicVolume;
            document.getElementById('music-volume-value').textContent = this.config.musicVolume + '%';
            document.getElementById('sfx-volume').value = this.config.sfxVolume;
            document.getElementById('sfx-volume-value').textContent = this.config.sfxVolume + '%';
            document.getElementById('auto-save').checked = this.config.autoSave;
        } catch (error) {
            console.error('Error al cargar configuración:', error);
        }
    }
    
    updateConfig(key, value) {
        this.config[key] = value;
        
        try {
            localStorage.setItem('el-rescate-config', JSON.stringify(this.config));
        } catch (error) {
            console.error('Error al guardar configuración:', error);
        }
        
        // Aplicar cambios inmediatos
        if (key === 'musicVolume') {
            this.dom.bgmAudio.volume = value / 100;
        } else if (key === 'sfxVolume') {
            this.dom.sfxAudio.volume = value / 100;
        }
    }
    
    // ==========================================
    // AUDIO (PLACEHOLDERS)
    // ==========================================
    
    playBGM(track) {
        try {
            this.dom.bgmAudio.src = `assets/music/${track}`;
            this.dom.bgmAudio.volume = this.config.musicVolume / 100;
            this.dom.bgmAudio.play().catch(() => {});
        } catch (error) {
            // Música no disponible
        }
    }
    
    updateBGM(bg) {
        // Mapear fondos a pistas de música
        const musicMap = {
            'bg_castle_entrance.jpg': 'main_theme.mp3',
            'bg_castle_interior.png': 'main_theme.mp3',
            'bg_dungeon.png': 'dugeon_theme.mp3',
            'bg_dungeon_cell.png': 'dugeon_theme.mp3',
            'bg_secret_passage.png': 'dugeon_theme.mp3',
            'bg_dragon_chamber.png': 'dragon_theme.mp3',
            'bg_tower_stairs.png': 'dugeon_theme.mp3',
            'bg_tower_hall.png': 'main_theme.mp3',
            'bg_tower_top.png': 'main_theme.mp3',
            'bg_allison_chamber.png': 'ending_theme.mp3',
            'bg_garden.png': 'ending_theme.mp3',
            'bg_forest_exit.jpg': 'ending_theme.mp3',
            'bg_kingdom.png': 'ending_theme.mp3',
            'bg_library.png': 'main_theme.mp3',
            'bg_sunset.png': 'ending_theme.mp3',
            'bg_throne_room.png': 'ending_theme.mp3'
        };
        
        const track = musicMap[bg];
        if (track && this.currentBGM !== track) {
            this.currentBGM = track;
            this.playBGM(track);
        }
    }
    
    playSFX(effect) {
        try {
            // Mapear nombres a archivos reales (mp3 o wav)
            const sfxMap = {
                'choice': 'choice.wav',
                'save': 'save.mp3',
                'page_turn': 'page_turn.wav',
                'stat_increase': 'stat_increase.mp3',
                'achievement': 'achievement.mp3',
                'qte_start': 'qte_start.mp3',
                'qte_success': 'qte_success.mp3',
                'qte_fail': 'qte_fail.mp3'
            };
            const sfxFile = sfxMap[effect] || `${effect}.mp3`;
            this.dom.sfxAudio.src = `assets/sfx/${sfxFile}`;
            this.dom.sfxAudio.volume = this.config.sfxVolume / 100;
            this.dom.sfxAudio.play().catch(() => {});
        } catch (error) {
            // SFX no disponible, silenciar
        }
    }
    
    // ==========================================
    // EFECTOS VISUALES
    // ==========================================
    
    screenShake(intensity = 'medium') {
        const intensities = { light: 5, medium: 10, heavy: 20 };
        const offset = intensities[intensity] || 10;
        const duration = 500;
        const gameScreen = this.dom.gameScreen;
        
        gameScreen.style.animation = `shake ${duration}ms ease-in-out`;
        gameScreen.style.setProperty('--shake-offset', `${offset}px`);
        
        setTimeout(() => {
            gameScreen.style.animation = '';
        }, duration);
    }
    
    flashScreen(color = 'white', duration = 200) {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        flash.style.backgroundColor = color;
        document.body.appendChild(flash);
        
        setTimeout(() => flash.classList.add('active'), 10);
        setTimeout(() => {
            flash.classList.remove('active');
            setTimeout(() => flash.remove(), 300);
        }, duration);
    }
    
    createParticle(x, y, text, color = '#f5d78e', type = 'stat') {
        const particle = document.createElement('div');
        particle.className = `particle particle-${type}`;
        particle.textContent = text;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.color = color;
        
        this.dom.particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
    
    // ==========================================
    // SISTEMA DE STATS CON FEEDBACK
    // ==========================================
    
    updateStatsWithFeedback(effects) {
        Object.keys(effects).forEach(stat => {
            const value = effects[stat];
            if (value > 0) {
                // Actualizar valor
                this.gameState.stats[stat] += value;
                
                // Encontrar el elemento y agregar feedback visual
                const statElement = document.querySelector(`[data-stat="${stat}"]`);
                if (statElement) {
                    const rect = statElement.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    // Crear partícula flotante
                    this.createParticle(centerX, centerY, `+${value}`, '#f5d78e', 'stat');
                    
                    // Animar el stat
                    statElement.classList.add('stat-boost');
                    setTimeout(() => statElement.classList.remove('stat-boost'), 600);
                    
                    // SFX
                    this.playSFX('stat_increase');
                }
                
                // Actualizar display
                const statDisplay = this.dom[`stat${stat.charAt(0).toUpperCase() + stat.slice(1)}`];
                if (statDisplay) {
                    this.animateNumber(statDisplay, this.gameState.stats[stat] - value, this.gameState.stats[stat]);
                }
                
                // Actualizar barra de relación si es romance
                if (stat === 'romance') {
                    this.updateRelationship(value);
                }
                
                // Verificar logros
                this.checkAchievements();
            }
        });
    }
    
    animateNumber(element, from, to) {
        const duration = 500;
        const steps = 20;
        const increment = (to - from) / steps;
        let current = from;
        let step = 0;
        
        const interval = setInterval(() => {
            step++;
            current += increment;
            element.textContent = Math.round(current);
            
            if (step >= steps) {
                element.textContent = to;
                clearInterval(interval);
            }
        }, duration / steps);
    }
    
    // ==========================================
    // SISTEMA DE RELACIÓN
    // ==========================================
    
    updateRelationship(amount) {
        this.gameState.relationship += amount;
        const maxRelationship = 10;
        const percentage = Math.min((this.gameState.relationship / maxRelationship) * 100, 100);
        
        this.dom.relationshipFill.style.width = percentage + '%';
        
        // Crear corazones en momentos románticos
        if (amount > 0) {
            this.createFloatingHearts();
        }
    }
    
    createFloatingHearts() {
        const bar = this.dom.relationshipBar;
        const rect = bar.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const x = rect.left + Math.random() * rect.width;
                const y = rect.bottom;
                this.createParticle(x, y, '💕', '#ff6b9d', 'heart');
            }, i * 100);
        }
    }
    
    // ==========================================
    // SISTEMA DE LOGROS
    // ==========================================
    
    checkAchievements() {
        const stats = this.gameState.stats;
        
        // Corazón Valiente
        if (stats.valentia >= 5 && !this.achievements.brave_heart.unlocked) {
            this.unlockAchievement('brave_heart');
        }
        
        // Mente Brillante
        if (stats.ingenio >= 5 && !this.achievements.sharp_mind.unlocked) {
            this.unlockAchievement('sharp_mind');
        }
        
        // Amor Verdadero
        if (stats.romance >= 5 && !this.achievements.true_love.unlocked) {
            this.unlockAchievement('true_love');
        }
        
        // Alma Noble
        if (stats.honor >= 5 && !this.achievements.noble_soul.unlocked) {
            this.unlockAchievement('noble_soul');
        }
        
        // Perfeccionista
        if (stats.valentia >= 10 && stats.ingenio >= 10 && stats.romance >= 10 && stats.honor >= 10 && !this.achievements.perfectionist.unlocked) {
            this.unlockAchievement('perfectionist');
        }
    }
    
    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;
        
        achievement.unlocked = true;
        this.gameState.achievements.push(achievementId);
        
        // Mostrar notificación
        this.showAchievementNotification(achievement);
        
        // SFX y efectos
        this.playSFX('achievement');
        this.flashScreen('#ffd700', 300);
        
        // Guardar progreso
        if (this.config.autoSave) {
            this.saveGame();
        }
    }
    
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-details">
                <div class="achievement-title">🏆 Logro Desbloqueado</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
        `;
        
        this.dom.achievementContainer.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
    
    renderAchievements() {
        this.dom.achievementsContent.innerHTML = '';
        
        Object.values(this.achievements).forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.unlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.unlocked ? achievement.name : '???'}</div>
                    <div class="achievement-desc">${achievement.unlocked ? achievement.desc : 'Logro bloqueado'}</div>
                </div>
            `;
            this.dom.achievementsContent.appendChild(achievementEl);
        });
    }
    
    // ==========================================
    // QUICK TIME EVENTS (QTE)
    // ==========================================
    
    async triggerQTE(successCallback, failCallback) {
        const keys = ['W', 'A', 'S', 'D', 'SPACE'];
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const timeLimit = 2000; // 2 segundos
        
        this.qteData.currentQTE = {
            key: randomKey,
            success: false,
            startTime: Date.now()
        };
        
        this.qteData.totalAttempts++;
        
        // Mostrar panel QTE
        this.dom.qtePanel.classList.add('active');
        this.dom.qteKey.textContent = randomKey;
        
        // Resetear y reiniciar animación del timer
        this.dom.qteTimerFill.style.animation = 'none';
        this.dom.qteTimerFill.offsetHeight; // Forzar reflow
        this.dom.qteTimerFill.style.animation = `qte-timer ${timeLimit}ms linear forwards`;
        
        // SFX
        this.playSFX('qte_start');
        
        return new Promise((resolve) => {
            let resolved = false;
            
            const keyHandler = (e) => {
                const pressedKey = e.code === 'Space' ? 'SPACE' : e.key.toUpperCase();
                
                if (pressedKey === randomKey && !resolved) {
                    resolved = true;
                    const reactionTime = Date.now() - this.qteData.currentQTE.startTime;
                    this.qteData.currentQTE.success = true;
                    this.qteData.perfectHits++;
                    
                    // Éxito
                    this.dom.qtePanel.classList.add('success');
                    this.playSFX('qte_success');
                    this.flashScreen('#00ff00', 200);
                    
                    setTimeout(() => {
                        this.dom.qtePanel.classList.remove('active', 'success');
                        document.removeEventListener('keydown', keyHandler);
                        if (successCallback) successCallback(reactionTime);
                        resolve(true);
                    }, 500);
                }
            };
            
            const timeoutHandler = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    
                    // Fallo
                    this.dom.qtePanel.classList.add('fail');
                    this.playSFX('qte_fail');
                    this.screenShake('light');
                    
                    setTimeout(() => {
                        this.dom.qtePanel.classList.remove('active', 'fail');
                        document.removeEventListener('keydown', keyHandler);
                        if (failCallback) failCallback();
                        resolve(false);
                    }, 500);
                }
            }, timeLimit);
            
            document.addEventListener('keydown', keyHandler);
        });
    }
    
    checkQTEMasterAchievement() {
        if (this.qteData.totalAttempts >= 3 && this.qteData.perfectHits === this.qteData.totalAttempts) {
            if (!this.achievements.qte_master.unlocked) {
                this.unlockAchievement('qte_master');
            }
        }
    }
    
    shouldTriggerQTE(sceneId) {
        // QTEs en escenas específicas
        const qteScenes = ['acto1_accion', 'acto2_combate', 'acto2_04'];
        return qteScenes.includes(sceneId);
    }
    
    async handleSceneQTE(sceneId) {
        let success = false;
        
        // Configurar QTE según la escena
        if (sceneId === 'acto1_accion' || sceneId === 'acto2_combate') {
            // QTE de combate - sin shake antes del QTE
            success = await this.triggerQTE(
                (reactionTime) => {
                    // Éxito: Bonus de valentía
                    this.createParticle(window.innerWidth / 2, window.innerHeight / 2, '+1 VALENTÍA', '#d4a24a', 'stat');
                    this.gameState.stats.valentia += 1;
                    this.updateStatsDisplay();
                },
                () => {
                    // Fallo: Screen shake después de cerrar QTE
                    setTimeout(() => this.screenShake('light'), 600);
                }
            );
        } else if (sceneId === 'acto2_04') {
            // QTE del dragón (más difícil)
            this.flashScreen('#ff4400', 150);
            success = await this.triggerQTE(
                (reactionTime) => {
                    // Éxito perfecto: +2 valentía
                    this.createParticle(window.innerWidth / 2, window.innerHeight / 2, '+2 VALENTÍA', '#d4a24a', 'stat');
                    this.gameState.stats.valentia += 2;
                    this.updateStatsDisplay();
                    this.flashScreen('#ffd700', 300);
                },
                () => {
                    // Fallo: Screen shake después de cerrar QTE
                    setTimeout(() => this.screenShake('heavy'), 600);
                }
            );
        }
        
        // Verificar logro QTE Master
        this.checkQTEMasterAchievement();
        
        return success;
    }
    
    // ==========================================
    // SISTEMA DE GALERÍA
    // ==========================================
    
    unlockCG(cgId) {
        const cg = this.gallery[cgId];
        if (!cg || cg.unlocked) return;
        
        cg.unlocked = true;
        this.gameState.unlockedCGs.push(cgId);
        
        // Crear partícula
        const rect = this.dom.galleryBtn.getBoundingClientRect();
        this.createParticle(rect.left + rect.width / 2, rect.top, '🖼️ +1', '#f5d78e', 'cg');
        
        // Verificar logro de coleccionista
        const totalCGs = Object.keys(this.gallery).length;
        const unlockedCount = this.gameState.unlockedCGs.length;
        if (unlockedCount === totalCGs && !this.achievements.collector.unlocked) {
            this.unlockAchievement('collector');
        }
    }
    
    checkCGUnlock(sceneId) {
        Object.values(this.gallery).forEach(cg => {
            if (cg.scene === sceneId && !cg.unlocked) {
                this.unlockCG(cg.id);
            }
        });
    }
    
    renderGallery() {
        this.dom.galleryContent.innerHTML = '';
        
        Object.values(this.gallery).forEach(cg => {
            const cgEl = document.createElement('div');
            cgEl.className = `gallery-item ${cg.unlocked ? 'unlocked' : 'locked'}`;
            cgEl.innerHTML = `
                <div class="gallery-thumbnail ${cg.unlocked ? '' : 'locked-thumbnail'}">
                    ${cg.unlocked ? `<img src="assets/backgrounds/${this.getBackgroundForScene(cg.scene)}" alt="${cg.name}">` : '<div class="locked-icon">🔒</div>'}
                </div>
                <div class="gallery-name">${cg.unlocked ? cg.name : '???'}</div>
            `;
            
            if (cg.unlocked) {
                cgEl.addEventListener('click', () => this.viewCG(cg));
            }
            
            this.dom.galleryContent.appendChild(cgEl);
        });
    }
    
    getBackgroundForScene(sceneId) {
        const scene = this.story.scenes[sceneId];
        return scene ? scene.bg : 'bg_black.jpg';
    }
    
    viewCG(cg) {
        // Crear modal de vista completa
        const viewer = document.createElement('div');
        viewer.className = 'cg-viewer';
        viewer.innerHTML = `
            <div class="cg-viewer-content">
                <img src="assets/backgrounds/${this.getBackgroundForScene(cg.scene)}" alt="${cg.name}">
                <div class="cg-viewer-title">${cg.name}</div>
                <button class="cg-viewer-close">✕</button>
            </div>
        `;
        
        document.body.appendChild(viewer);
        setTimeout(() => viewer.classList.add('active'), 10);
        
        viewer.querySelector('.cg-viewer-close').addEventListener('click', () => {
            viewer.classList.remove('active');
            setTimeout(() => viewer.remove(), 300);
        });
        
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) {
                viewer.classList.remove('active');
                setTimeout(() => viewer.remove(), 300);
            }
        });
    }
    
    // ==========================================
    // AUTO-SAVE INDICATOR
    // ==========================================
    
    showAutosaveIndicator() {
        this.dom.autosaveIndicator.classList.add('active');
        setTimeout(() => {
            this.dom.autosaveIndicator.classList.remove('active');
        }, 2000);
    }
    
    // ==========================================
    // SISTEMA DE COMBATE RPG
    // ==========================================

    updateHPDisplay() {
        if (!this.dom.hpFill || !this.dom.hpText) return;
        const pct = Math.max(0, (this.gameState.hp / this.gameState.maxHp) * 100);
        this.dom.hpFill.style.width = pct + '%';
        this.dom.hpText.textContent = `${this.gameState.hp} / ${this.gameState.maxHp}`;

        // Cambiar color según HP
        if (pct <= 25) {
            this.dom.hpFill.style.background = 'linear-gradient(90deg, #ff0000, #cc0000)';
        } else if (pct <= 50) {
            this.dom.hpFill.style.background = 'linear-gradient(90deg, #ff8800, #cc6600)';
        } else {
            this.dom.hpFill.style.background = '';
        }
    }

    setCombatMode(active) {
        const dialogueBox = document.getElementById('dialogue-box');
        const spritesContainer = this.dom.spritesContainer;
        const relationshipBar = this.dom.relationshipBar;
        const statsPanel = document.getElementById('stats-panel');
        const hpBar = this.dom.hpBar;

        if (active) {
            // Ocultar elementos de historia durante combate
            if (dialogueBox) dialogueBox.style.display = 'none';
            if (spritesContainer) spritesContainer.style.display = 'none';
            if (relationshipBar) relationshipBar.style.display = 'none';
            if (statsPanel) statsPanel.style.display = 'none';
            if (hpBar) hpBar.style.display = 'none';
        } else {
            // Restaurar elementos de historia
            if (dialogueBox) dialogueBox.style.display = '';
            if (spritesContainer) spritesContainer.style.display = '';
            if (relationshipBar) relationshipBar.style.display = '';
            if (statsPanel) statsPanel.style.display = '';
            if (hpBar) hpBar.style.display = '';
        }
    }

    initiateCombat(combatData) {
        const enemy = combatData.enemy;
        this.combatState = {
            inCombat: true,
            enemy: enemy,
            enemyHp: enemy.hp,
            enemyMaxHp: enemy.hp,
            playerTurn: true,
            isDefending: false,
            buffAtk: 1,
            buffDef: false,
            onWin: combatData.onWin,
            onLose: combatData.onLose || 'death_screen',
            combatSceneId: this.gameState.currentSceneId,
            turnCount: 1
        };

        // Ocultar UI de historia durante combate
        this.setCombatMode(true);

        // Mostrar panel de combate
        this.dom.combatPanel.classList.add('active');
        this.dom.enemyName.textContent = enemy.name;
        this.dom.enemySprite.src = `assets/sprites/${enemy.sprite}`;
        this.dom.enemySprite.onerror = () => { this.dom.enemySprite.style.display = 'none'; };
        
        // Cargar sprite de Gabriel
        this.dom.playerSprite.src = 'assets/sprites/gabriel_determined.png';
        this.dom.playerSprite.onerror = () => { this.dom.playerSprite.style.display = 'none'; };

        // Crear indicador de turno
        this.createTurnIndicator();

        this.updateCombatHP();
        this.addCombatLog(`¡${enemy.name} aparece! Prepárate para luchar.`);

        // Habilitar botones
        this.setCombatButtonsEnabled(true);
    }

    createTurnIndicator() {
        let indicator = document.querySelector('.combat-turn-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'combat-turn-indicator';
            this.dom.combatPanel.appendChild(indicator);
        }
        this.updateTurnIndicator();
    }

    updateTurnIndicator() {
        const indicator = document.querySelector('.combat-turn-indicator');
        if (indicator && this.combatState) {
            indicator.textContent = `Turno ${this.combatState.turnCount}`;
        }
    }

    showFloatingDamage(target, amount, type) {
        const container = target === 'enemy' ? 
            document.querySelector('.combat-enemy') : 
            document.querySelector('.combat-player');
        if (!container) return;

        const floater = document.createElement('div');
        floater.className = `floating-damage ${type}`;
        
        if (type === 'miss') {
            floater.textContent = 'FALLO';
        } else if (type === 'heal') {
            floater.textContent = `+${amount}`;
        } else {
            floater.textContent = `-${amount}`;
        }

        // Random horizontal position
        floater.style.left = (30 + Math.random() * 40) + '%';
        floater.style.top = '30%';

        container.style.position = 'relative';
        container.appendChild(floater);
        setTimeout(() => floater.remove(), 1200);
    }

    updateCombatHP() {
        // Enemy HP
        const ePct = Math.max(0, (this.combatState.enemyHp / this.combatState.enemyMaxHp) * 100);
        this.dom.enemyHpFill.style.width = ePct + '%';
        this.dom.enemyHpText.textContent = `${this.combatState.enemyHp} / ${this.combatState.enemyMaxHp}`;

        // Player HP in combat
        const pPct = Math.max(0, (this.gameState.hp / this.gameState.maxHp) * 100);
        this.dom.playerCombatHpFill.style.width = pPct + '%';
        this.dom.playerCombatHpText.textContent = `${this.gameState.hp} / ${this.gameState.maxHp}`;

        // Also update main HP bar
        this.updateHPDisplay();
    }

    setCombatButtonsEnabled(enabled) {
        const btns = this.dom.combatActions.querySelectorAll('.combat-btn');
        btns.forEach(b => b.disabled = !enabled);
    }

    playerAttack(attackType) {
        if (!this.combatState.inCombat || !this.combatState.playerTurn) return;

        // Defend action
        if (attackType === 'defender') {
            this.combatState.isDefending = true;
            this.addCombatLog('⛊ Te pones en guardia. El próximo daño se reducirá a la mitad.');
            this.combatState.playerTurn = false;
            this.setCombatButtonsEnabled(false);
            setTimeout(() => this.enemyTurn(), 1200);
            return;
        }

        const atk = this.attacks[attackType];
        if (!atk) return;

        const stat = this.gameState.stats[atk.stat] || 0;
        const hitChance = Math.min(50 + stat * 6, 95);
        const roll = Math.random() * 100;

        if (roll > hitChance) {
            // Miss
            this.addCombatLog(`<span class="miss-text">¡${atk.name} falló! (${Math.round(hitChance)}% probabilidad)</span>`);
            this.showFloatingDamage('enemy', 0, 'miss');
        } else {
            // Calculate damage
            let dmg = atk.baseDmg + Math.floor(Math.random() * (stat * 2 + 1)) - Math.floor(this.combatState.enemy.def / 2);
            dmg = Math.max(1, dmg);

            // Apply buff
            if (this.combatState.buffAtk > 1) {
                dmg = Math.floor(dmg * this.combatState.buffAtk);
                this.combatState.buffAtk = 1;
                this.addCombatLog(`<span class="hit-text">💪 ¡Golpe potenciado! ${atk.name} inflige ${dmg} de daño.</span>`);
            } else {
                this.addCombatLog(`<span class="hit-text">⚔️ ${atk.name} inflige ${dmg} de daño.</span>`);
            }

            // Weak stat bonus
            if (this.combatState.enemy.weakStat === atk.stat) {
                const bonus = Math.floor(dmg * 0.3);
                dmg += bonus;
                this.addCombatLog(`<span class="hit-text">✨ ¡Punto débil! +${bonus} daño extra.</span>`);
                this.showFloatingDamage('enemy', dmg, 'critical');
            } else {
                this.showFloatingDamage('enemy', dmg, 'damage-dealt');
            }

            this.combatState.enemyHp -= dmg;

            // Enemy hit animation
            this.dom.enemySprite.classList.add('hit');
            setTimeout(() => this.dom.enemySprite.classList.remove('hit'), 400);

            this.screenShake('light');
        }

        this.updateCombatHP();

        // Check enemy death
        if (this.combatState.enemyHp <= 0) {
            this.combatState.enemyHp = 0;
            this.updateCombatHP();
            this.addCombatLog(`<span class="hit-text">🏆 ¡Has derrotado a ${this.combatState.enemy.name}!</span>`);
            this.setCombatButtonsEnabled(false);
            setTimeout(() => this.endCombat(true), 1500);
            return;
        }

        // Enemy turn
        this.combatState.playerTurn = false;
        this.setCombatButtonsEnabled(false);
        setTimeout(() => this.enemyTurn(), 1200);
    }

    enemyTurn() {
        if (!this.combatState.inCombat) return;

        const enemy = this.combatState.enemy;
        let dmg = enemy.atk + Math.floor(Math.random() * 7) - 3;
        dmg = Math.max(1, dmg);

        // Check shield buff
        if (this.combatState.buffDef) {
            this.combatState.buffDef = false;
            this.addCombatLog(`<span class="defend-text">🛡️ ¡El Escudo Mágico bloqueó el ataque!</span>`);
            this.showFloatingDamage('player', 0, 'miss');
            this.updateCombatHP();
            this.combatState.isDefending = false;
            this.combatState.playerTurn = true;
            this.combatState.turnCount++;
            this.updateTurnIndicator();
            this.setCombatButtonsEnabled(true);
            return;
        }

        // Defend halves damage
        if (this.combatState.isDefending) {
            dmg = Math.floor(dmg / 2);
            this.addCombatLog(`<span class="defend-text">🛡️ Defiendes. ${enemy.name} ataca por ${dmg} (reducido).</span>`);
            this.combatState.isDefending = false;
        } else {
            this.addCombatLog(`<span class="miss-text">💥 ${enemy.name} ataca por ${dmg} de daño.</span>`);
        }

        this.showFloatingDamage('player', dmg, 'damage-received');
        this.gameState.hp -= dmg;
        if (this.gameState.hp < 0) this.gameState.hp = 0;
        this.updateCombatHP();

        // Player hit animation
        this.dom.playerSprite.classList.add('hit');
        setTimeout(() => this.dom.playerSprite.classList.remove('hit'), 400);

        // Screen shake on player hit
        this.screenShake('medium');
        this.flashScreen('#ff0000', 150);

        // Check player death
        if (this.gameState.hp <= 0) {
            this.addCombatLog(`<span class="miss-text">💀 Has caído en combate...</span>`);
            this.setCombatButtonsEnabled(false);
            setTimeout(() => this.endCombat(false), 1500);
            return;
        }

        // Back to player turn
        this.combatState.playerTurn = true;
        this.combatState.turnCount++;
        this.updateTurnIndicator();
        this.setCombatButtonsEnabled(true);
    }

    addCombatLog(message) {
        if (this.dom.combatLog) {
            this.dom.combatLog.innerHTML = message;
        }
    }

    endCombat(victory) {
        this.combatState.inCombat = false;
        this.dom.combatPanel.classList.remove('active');

        // Remove turn indicator
        const indicator = document.querySelector('.combat-turn-indicator');
        if (indicator) indicator.remove();

        // Remove any floating damage elements
        document.querySelectorAll('.floating-damage').forEach(el => el.remove());

        if (victory) {
            // Full HP heal after each battle
            this.gameState.hp = this.gameState.maxHp;
            this.updateHPDisplay();

            // Stat reward
            const statReward = this.combatState.enemy.weakStat || 'valentia';
            this.gameState.stats[statReward] += 1;
            this.updateStatsDisplay();
            this.createParticle(window.innerWidth / 2, window.innerHeight / 2, `+1 ${statReward.toUpperCase()}`, '#d4a24a', 'stat');
            this.flashScreen('#ffd700', 400);

            this.addCombatLog(`<span class="heal-text">💚 Victoria. Tu vida se ha restaurado por completo.</span>`);

            // Continue to victory scene
            if (this.combatState.onWin) {
                setTimeout(() => {
                    this.setCombatMode(false);
                    this.loadScene(this.combatState.onWin);
                }, 600);
            } else {
                this.setCombatMode(false);
            }
        } else {
            // Restaurar UI de historia antes de mostrar pantalla de muerte
            this.setCombatMode(false);
            // Show death screen
            this.showDeathScreen();
        }
    }

    showDeathScreen() {
        if (this.dom.deathScreen) {
            this.dom.deathScreen.classList.add('active');
        }
    }

    retryCombat() {
        // Hide death screen
        if (this.dom.deathScreen) {
            this.dom.deathScreen.classList.remove('active');
        }

        // Restore HP
        this.gameState.hp = this.gameState.maxHp;
        this.updateHPDisplay();

        // Reload the combat scene
        if (this.combatState.combatSceneId) {
            this.loadScene(this.combatState.combatSceneId);
        }
    }

    // ==========================================
    // SISTEMA DE COFRES E INVENTARIO
    // ==========================================

    openChest(chestData) {
        let items = [];

        if (chestData.items && Array.isArray(chestData.items)) {
            // Multiple items
            items = chestData.items;
        } else if (chestData.item) {
            // Single item
            items = [{ item: chestData.item, quantity: chestData.quantity || 1 }];
        }

        if (items.length === 0) return;

        // Add items to inventory
        let html = '';
        items.forEach(entry => {
            this.addItem(entry.item, entry.quantity || 1);
            const def = this.itemDefs[entry.item];
            if (def) {
                html += `<div class="chest-item-row">${def.icon} ${def.name} x${entry.quantity || 1}</div>`;
            }
        });

        // Show chest notification
        if (this.dom.chestItems) {
            this.dom.chestItems.innerHTML = html;
        }
        if (this.dom.chestNotification) {
            this.dom.chestNotification.classList.add('active');
            this.playSFX('achievement');
            setTimeout(() => {
                this.dom.chestNotification.classList.remove('active');
            }, 3500);
        }
    }

    addItem(itemId, quantity = 1) {
        if (!this.gameState.inventory) this.gameState.inventory = {};
        if (this.gameState.inventory[itemId]) {
            this.gameState.inventory[itemId] += quantity;
        } else {
            this.gameState.inventory[itemId] = quantity;
        }
    }

    removeItem(itemId) {
        if (!this.gameState.inventory || !this.gameState.inventory[itemId]) return false;
        this.gameState.inventory[itemId]--;
        if (this.gameState.inventory[itemId] <= 0) {
            delete this.gameState.inventory[itemId];
        }
        return true;
    }

    useItem(itemId) {
        if (!this.combatState.inCombat || !this.combatState.playerTurn) return;

        const def = this.itemDefs[itemId];
        if (!def) return;
        if (!this.gameState.inventory[itemId] || this.gameState.inventory[itemId] <= 0) return;

        this.removeItem(itemId);

        switch (def.type) {
            case 'heal': {
                const healed = Math.min(def.value, this.gameState.maxHp - this.gameState.hp);
                this.gameState.hp = Math.min(this.gameState.hp + def.value, this.gameState.maxHp);
                this.addCombatLog(`<span class="heal-text">💚 Usaste ${def.name}. Recuperas ${healed} HP.</span>`);
                this.showFloatingDamage('player', healed, 'heal');
                break;
            }
            case 'buff_atk':
                this.combatState.buffAtk = def.value;
                this.addCombatLog(`<span class="hit-text">💪 Usaste ${def.name}. Tu próximo ataque hará +50% daño.</span>`);
                break;
            case 'buff_def':
                this.combatState.buffDef = true;
                this.addCombatLog(`<span class="defend-text">🛡️ Usaste ${def.name}. El próximo ataque enemigo será bloqueado.</span>`);
                break;
        }

        this.updateCombatHP();

        // Hide items menu
        this.dom.combatItemsMenu.classList.add('hidden');

        // End turn after using item
        this.combatState.playerTurn = false;
        this.setCombatButtonsEnabled(false);
        setTimeout(() => this.enemyTurn(), 1200);
    }

    toggleCombatItems() {
        if (this.dom.combatItemsMenu.classList.contains('hidden')) {
            this.renderCombatItemsList();
            this.dom.combatItemsMenu.classList.remove('hidden');
        } else {
            this.dom.combatItemsMenu.classList.add('hidden');
        }
    }

    renderCombatItemsList() {
        if (!this.dom.combatItemsList) return;
        this.dom.combatItemsList.innerHTML = '';

        const inv = this.gameState.inventory || {};
        const keys = Object.keys(inv);

        if (keys.length === 0) {
            this.dom.combatItemsList.innerHTML = '<div class="inventory-empty">Sin objetos</div>';
            return;
        }

        keys.forEach(itemId => {
            const def = this.itemDefs[itemId];
            if (!def) return;
            const qty = inv[itemId];
            const row = document.createElement('div');
            row.className = 'combat-item-row';
            row.innerHTML = `<span>${def.icon} ${def.name} (x${qty})</span><span class="item-use-hint">Usar</span>`;
            row.addEventListener('click', () => this.useItem(itemId));
            this.dom.combatItemsList.appendChild(row);
        });
    }

    renderInventory() {
        if (!this.dom.inventoryContent) return;
        this.dom.inventoryContent.innerHTML = '';

        const inv = this.gameState.inventory || {};
        const keys = Object.keys(inv);

        if (keys.length === 0) {
            this.dom.inventoryContent.innerHTML = '<div class="inventory-empty">🎒 Tu inventario está vacío.</div>';
            return;
        }

        keys.forEach(itemId => {
            const def = this.itemDefs[itemId];
            if (!def) return;
            const qty = inv[itemId];
            const el = document.createElement('div');
            el.className = 'inventory-item';
            el.innerHTML = `
                <div class="inventory-item-icon">${def.icon}</div>
                <div class="inventory-item-info">
                    <div class="inventory-item-name">${def.name} <span class="inventory-qty">x${qty}</span></div>
                    <div class="inventory-item-desc">${def.desc}</div>
                </div>
            `;
            this.dom.inventoryContent.appendChild(el);
        });
    }

    // ==========================================
    // PANEL TOGGLES ACTUALIZADO
    // ==========================================
    
    togglePanel(panelName) {
        const panels = {
            menu: this.dom.menuPanel,
            log: this.dom.logPanel,
            achievements: this.dom.achievementsPanel,
            gallery: this.dom.galleryPanel,
            inventory: this.dom.inventoryPanel
        };
        
        const panel = panels[panelName];
        if (!panel) return;
        
        // Cerrar otros paneles
        Object.values(panels).forEach(p => {
            if (p !== panel) p.classList.remove('active');
        });
        
        // Toggle panel actual
        panel.classList.toggle('active');
        
        // Renderizar contenido si es necesario
        if (panel.classList.contains('active')) {
            if (panelName === 'log') {
                this.renderHistory();
            } else if (panelName === 'achievements') {
                this.renderAchievements();
            } else if (panelName === 'gallery') {
                this.renderGallery();
            } else if (panelName === 'inventory') {
                this.renderInventory();
            }
        }
    }
}


// ==========================================
// INICIALIZAR JUEGO
// ==========================================

let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new GameEngine();
    console.log('Motor de juego inicializado');
});
