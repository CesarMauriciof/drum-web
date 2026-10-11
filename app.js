/**
 * ==========================================================================
 * VINTAGE JAZZ DRUMS - FIRST-PERSON PERSPECTIVE (POV) ENGINE
 * Web Audio API Instant-Attack Percussion Synth • Animated Drumsticks
 * ==========================================================================
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. AUDIOCONTEXT GLOBAL ÚNICO (SÍNTESIS PURA INSTANTÁNEA - 0ms LATENCY)
  // ---------------------------------------------------------------------------
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Nodo de ganancia maestro
  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.8, audioCtx.currentTime);

  // Analizador para el visualizador Canvas
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;
  analyser.smoothingTimeConstant = 0.8;

  // Cadena de audio: masterGain -> analyser -> destination
  masterGain.connect(analyser);
  analyser.connect(audioCtx.destination);

  // ---------------------------------------------------------------------------
  // 2. BÚFER DE RUIDO BLANCO REUTILIZABLE (Zero CPU en tiempo de ejecución)
  // ---------------------------------------------------------------------------
  let noiseBuffer = null;
  function getNoiseBuffer() {
    if (!noiseBuffer) {
      const bufferSize = audioCtx.sampleRate * 2; // 2 segundos de ruido blanco puro
      noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    }
    return noiseBuffer;
  }
  // Inicializar el búfer de ruido inmediatamente
  getNoiseBuffer();

  // ---------------------------------------------------------------------------
  // 3. SINTETIZADOR DE PERCUSIÓN CON ATAQUE 0 (CERO RETARDO)
  // ---------------------------------------------------------------------------

  /**
   * BOMBO (Kick):
   * Oscilador con caída rápida de frecuencia (150Hz -> 0.01Hz en 0.5s)
   * Ganancia exponencial iniciando en 1 inmediatamente (Ataque 0ms).
   */
  function playKick() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);

    gain.gain.setValueAtTime(1, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * CAJA (Snare):
   * Tono bajo + Buffer de ruido blanco con filtro paso alto
   * Decaimiento de 0.2s y ataque instantáneo de 0ms.
   */
  function playSnare() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    // 1. Tono bajo (casco acústico)
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.15);

    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.15);

    // 2. Ruido blanco con filtro paso alto (bordonero)
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = getNoiseBuffer();

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(1, now); // Ataque 0ms
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + 0.2);
  }

  /**
   * HI-HAT CERRADO:
   * Filtro paso alto a 7000Hz con decaimiento ultra-corto de 0.05s
   */
  function playHiHatClosed() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const source = audioCtx.createBufferSource();
    source.buffer = getNoiseBuffer();

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.8, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    source.start(now);
    source.stop(now + 0.05);
  }

  /**
   * HI-HAT ABIERTO:
   * Filtro paso alto a 7000Hz con decaimiento sostenido de 0.35s
   */
  function playHiHatOpen() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const source = audioCtx.createBufferSource();
    source.buffer = getNoiseBuffer();

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.8, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    source.start(now);
    source.stop(now + 0.35);
  }

  /**
   * PLATILLO CRASH:
   * Filtro paso alto a 3000Hz con decaimiento prolongado de 1.2s
   */
  function playCrash() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const source = audioCtx.createBufferSource();
    source.buffer = getNoiseBuffer();

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.9, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    source.start(now);
    source.stop(now + 1.2);
  }

  /**
   * HIGH TOM:
   * Seno percusivo de 200Hz a 40Hz con caída de 0.3s
   */
  function playTomHigh() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);

    gain.gain.setValueAtTime(1, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * FLOOR TOM:
   * Seno percusivo grave de 120Hz a 25Hz con caída de 0.4s
   */
  function playTomLow() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.4);

    gain.gain.setValueAtTime(1, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * PLATILLO RIDE:
   * Campana inarmónica (587Hz + 845Hz) con caída de 0.7s
   */
  function playRide() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(845, now);

    gain.gain.setValueAtTime(0.6, now); // Ataque 0ms
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
  }

  /**
   * Despachador de sonido
   */
  function triggerSound(soundId) {
    switch (soundId) {
      case 'kick':
        playKick();
        break;
      case 'snare':
        playSnare();
        break;
      case 'hihat-closed':
        playHiHatClosed();
        break;
      case 'hihat-open':
        playHiHatOpen();
        break;
      case 'tom-high':
        playTomHigh();
        break;
      case 'tom-low':
        playTomLow();
        break;
      case 'crash':
        playCrash();
        break;
      case 'ride':
        playRide();
        break;
    }
  }

  // ---------------------------------------------------------------------------
  // 4. ANIMACIÓN DE LAS BAQUETAS FLOTANTES POV (DRUMSTICKS)
  // ---------------------------------------------------------------------------
  let leftStickEl = null;
  let rightStickEl = null;
  let leftStickTimeout = null;
  let rightStickTimeout = null;

  /**
   * Dispara el golpe físico de la baqueta hacia el instrumento impactado
   */
  function animateDrumstick(soundId) {
    // Si no están los elementos listos (o en móvil donde se ocultan), retornar
    if (!leftStickEl || !rightStickEl) return;

    // Asignación de manos:
    // LADO IZQUIERDO: Hi-Hat, Hi-Hat Open, Snare, Crash
    // LADO DERECHO: High Tom, Floor Tom, Ride (y apoyo de Crash si se desea)
    if (soundId === 'snare') {
      // Golpe izquierdo hacia la caja
      leftStickEl.className = 'drumstick left-stick strike';
      clearTimeout(leftStickTimeout);
      leftStickTimeout = setTimeout(() => {
        leftStickEl.className = 'drumstick left-stick';
      }, 90);
    } else if (soundId === 'hihat-closed' || soundId === 'hihat-open') {
      // Golpe izquierdo hacia el Hi-Hat
      leftStickEl.className = 'drumstick left-stick strike-hihat';
      clearTimeout(leftStickTimeout);
      leftStickTimeout = setTimeout(() => {
        leftStickEl.className = 'drumstick left-stick';
      }, 90);
    } else if (soundId === 'crash') {
      // Golpe izquierdo hacia el Crash
      leftStickEl.className = 'drumstick left-stick strike-crash';
      clearTimeout(leftStickTimeout);
      leftStickTimeout = setTimeout(() => {
        leftStickEl.className = 'drumstick left-stick';
      }, 95);
    } else if (soundId === 'tom-high') {
      // Golpe derecho hacia el High Tom
      rightStickEl.className = 'drumstick right-stick strike-tom';
      clearTimeout(rightStickTimeout);
      rightStickTimeout = setTimeout(() => {
        rightStickEl.className = 'drumstick right-stick';
      }, 90);
    } else if (soundId === 'ride') {
      // Golpe derecho hacia el Ride
      rightStickEl.className = 'drumstick right-stick strike-ride';
      clearTimeout(rightStickTimeout);
      rightStickTimeout = setTimeout(() => {
        rightStickEl.className = 'drumstick right-stick';
      }, 95);
    } else if (soundId === 'tom-low') {
      // Golpe derecho hacia el Floor Tom
      rightStickEl.className = 'drumstick right-stick strike-floor';
      clearTimeout(rightStickTimeout);
      rightStickTimeout = setTimeout(() => {
        rightStickEl.className = 'drumstick right-stick';
      }, 90);
    }
  }

  // ---------------------------------------------------------------------------
  // 5. CONTROLADOR DE LA INTERFAZ Y EVENTOS DE TECLADO (ZERO-DELAY)
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const drumPieces = Array.from(document.querySelectorAll('.drum-piece'));
    const volumeSlider = document.getElementById('masterVolume');
    const volumeValue = document.getElementById('volumeValue');
    const statusMessage = document.getElementById('statusMessage');
    const lastHitName = document.getElementById('lastHitName');
    const latencyBadge = document.getElementById('latencyBadge');
    const canvas = document.getElementById('audioVisualizer');

    // Referencias a las baquetas
    leftStickEl = document.getElementById('leftStick');
    rightStickEl = document.getElementById('rightStick');

    // Mapeo O(1) de teclas a elementos DOM
    const keyMap = new Map();
    drumPieces.forEach((piece) => {
      const code = piece.dataset.key;
      const altCode = piece.dataset.altKey;
      if (code) keyMap.set(code, piece);
      if (altCode) keyMap.set(altCode, piece);
    });

    // Mapeos por letra (insensible a mayúsculas/minúsculas)
    keyMap.set(' ', keyMap.get('Space'));
    keyMap.set('b', keyMap.get('Space'));
    keyMap.set('B', keyMap.get('Space'));
    keyMap.set('s', keyMap.get('KeyS'));
    keyMap.set('S', keyMap.get('KeyS'));
    keyMap.set('h', keyMap.get('KeyH'));
    keyMap.set('H', keyMap.get('KeyH'));
    keyMap.set('y', keyMap.get('KeyY'));
    keyMap.set('Y', keyMap.get('KeyY'));
    keyMap.set('t', keyMap.get('KeyT'));
    keyMap.set('T', keyMap.get('KeyT'));
    keyMap.set('g', keyMap.get('KeyG'));
    keyMap.set('G', keyMap.get('KeyG'));
    keyMap.set('c', keyMap.get('KeyC'));
    keyMap.set('C', keyMap.get('KeyC'));
    keyMap.set('r', keyMap.get('KeyR'));
    keyMap.set('R', keyMap.get('KeyR'));

    function updateVisualFeedback(piece) {
      const pieceName = piece.querySelector('.label-name')?.textContent || piece.dataset.sound;
      if (lastHitName) {
        lastHitName.textContent = pieceName;
        lastHitName.style.color = piece.style.getPropertyValue('--hit-glow') || '#f5d77f';
      }
      if (statusMessage) {
        statusMessage.textContent = `Tocando: ${pieceName}`;
      }
    }

    /**
     * Dispara un golpe completo: sonido, animación de baqueta y feedback visual
     */
    function triggerHit(piece) {
      if (!piece) return;
      const soundId = piece.dataset.sound;

      // 1. DISPARAR AUDIO INMEDIATAMENTE
      triggerSound(soundId);

      // 2. DISPARAR ANIMACIÓN DE BAQUETA (DOWNSTRIKE)
      animateDrumstick(soundId);

      // 3. ILUMINACIÓN Y REBOTE DE LA PIEZA
      piece.classList.remove('hit');
      requestAnimationFrame(() => {
        piece.classList.add('hit');
      });

      // 4. METADATA VISUAL
      updateVisualFeedback(piece);
    }

    // -------------------------------------------------------------------------
    // PREVENCIÓN DE RÁFAGA POR TECLA MANTENIDA (Set de teclas activas)
    // -------------------------------------------------------------------------
    const activeKeys = new Set();

    window.addEventListener(
      'keydown',
      (e) => {
        // Prevenir scroll en la barra espaciadora
        if (e.code === 'Space' || e.key === ' ') {
          e.preventDefault();
        }

        // Desbloquear AudioContext en el primer evento del usuario
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        // Ignorar si event.repeat es true o si la tecla ya está en el Set de activas
        const keyId = e.code || e.key;
        if (e.repeat || activeKeys.has(keyId)) {
          return;
        }

        // Registrar la tecla como activa para evitar disparos repetidos
        activeKeys.add(keyId);

        // Disparar golpe
        const piece = keyMap.get(e.code) || keyMap.get(e.key);
        if (piece) {
          triggerHit(piece);
        }
      },
      { capture: true, passive: false }
    );

    window.addEventListener(
      'keyup',
      (e) => {
        const keyId = e.code || e.key;
        activeKeys.delete(keyId);

        const piece = keyMap.get(e.code) || keyMap.get(e.key);
        if (piece) {
          piece.classList.remove('hit');
        }
      },
      { capture: true }
    );

    // Limpiar teclas activas si la ventana pierde el foco
    window.addEventListener('blur', () => {
      activeKeys.clear();
      drumPieces.forEach((p) => p.classList.remove('hit'));
    });

    // -------------------------------------------------------------------------
    // EVENTOS DE PUNTERO (MOUSE Y TOQUE)
    // -------------------------------------------------------------------------
    drumPieces.forEach((piece) => {
      piece.addEventListener(
        'pointerdown',
        (e) => {
          e.preventDefault();
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          triggerHit(piece);
        },
        { passive: false }
      );

      piece.addEventListener('pointerup', () => {
        piece.classList.remove('hit');
      });

      piece.addEventListener('pointerleave', () => {
        piece.classList.remove('hit');
      });

      piece.addEventListener('pointercancel', () => {
        piece.classList.remove('hit');
      });
    });

    // -------------------------------------------------------------------------
    // DESBLOQUEO DEL AUDIOCONTEXT EN EL PRIMER TOQUE
    // -------------------------------------------------------------------------
    const unlockContext = () => {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
          if (latencyBadge) {
            latencyBadge.innerHTML = '⚡ Modo Zero-Delay: <strong>Activo (0ms)</strong>';
            latencyBadge.classList.add('active');
          }
        });
      } else if (latencyBadge) {
        latencyBadge.innerHTML = '⚡ Modo Zero-Delay: <strong>Activo (0ms)</strong>';
        latencyBadge.classList.add('active');
      }
    };

    ['click', 'pointerdown', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, unlockContext, { capture: true, passive: true, once: true });
    });

    if (latencyBadge) {
      latencyBadge.addEventListener('click', unlockContext);
    }

    // -------------------------------------------------------------------------
    // CONTROL DE VOLUMEN MAESTRO
    // -------------------------------------------------------------------------
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      masterGain.gain.setValueAtTime(val, audioCtx.currentTime);
      const percentage = Math.round(val * 100);
      volumeValue.textContent = `${percentage}%`;

      const volumeIcon = document.getElementById('volumeIcon');
      if (percentage === 0) {
        volumeIcon.textContent = '🔇';
      } else if (percentage < 50) {
        volumeIcon.textContent = '🔉';
      } else {
        volumeIcon.textContent = '🔊';
      }
    });

    // -------------------------------------------------------------------------
    // VISUALIZADOR DE AUDIO (CANVAS SPECTRUM - TONOS ÁMBAR VINTAGE)
    // -------------------------------------------------------------------------
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        requestAnimationFrame(draw);

        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        if (audioCtx.state !== 'running') {
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, height / 2);
          ctx.lineTo(width, height / 2);
          ctx.stroke();
          return;
        }

        analyser.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 1.8;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * (height - 4);

          // Gradiente vertical vintage: Terracota profundo -> Ámbar dorado -> Blanco marfil
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#d96814');
          gradient.addColorStop(0.55, '#f5a623');
          gradient.addColorStop(1, '#fff1c5');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight - 2, barWidth - 1.5, barHeight + 2);

          x += barWidth;
          if (x >= width) break;
        }
      }

      draw();
    }
  });
})();
