# 🥁 Vintage Jazz Drums (POV First-Person Web Drumkit)

[![Web Audio API](https://img.shields.io/badge/Audio-Web%20Audio%20API-FF6F00?style=for-the-badge&logo=w3c&logoColor=white)](https://developer.mozilla.org/es/docs/Web/API/Web_Audio_API)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5 & CSS3](https://img.shields.io/badge/Frontend-HTML5%20%2F%20CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![Latency](https://img.shields.io/badge/Latency-Zero%20Delay%20(0ms)-00E676?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Una experiencia web interactiva de **Batería Acústica en Perspectiva Primera Persona (POV)** inspirada en los legendarios kits de jazz de los años 60 (*Ludwig / Slingerland / Gretsch*), ambientada en la atmósfera cálida y tenue de un club nocturno.

Construida íntegramente con tecnologías nativas del navegador, incorpora un motor de síntesis percusiva de **Ultra-Baja Latencia (0ms de ataque)** mediante la **Web Audio API** que permite tocar en perfecta sincronía rítmica sobre cualquier canción, tanto con el teclado de la computadora como con el ratón o pantalla táctil.

---

## ✨ Características Principales

- **👁️ Perspectiva Primera Persona (POV / First-Person View):**
  Disposición tridimensional 2.5D en arco que recrea con fidelidad la visión real del baterista sentado en su banqueta frente al kit.
- **🥢 Baquetas Flotantes Animadas (POV Drumsticks):**
  Dos baquetas de nogal americano (*Hickory*) que responden dinámicamente:
  - **Mano Izquierda:** Ejecuta downstrikes rápidos hacia la Caja (*Snare*), los Hi-Hats y el Platillo Crash.
  - **Mano Derecha:** Ejecuta downstrikes hacia el Tom Alto, Floor Tom y Platillo Ride.
- **🦶 Pedal Mecánico de Bombo Activo:**
  El pedal situado en la base del bombo se presiona visualmente y acciona su maza en cada golpe de la barra espaciadora o clic.
- **⚡ Motor de Sonido Instantáneo (Zero Attack Synth):**
  - **Sin archivos externos pesados (MP3/WAV):** Cero descargas, cero problemas de CORS al abrir localmente (`file:///`).
  - **100% Síntesis Nativa:** Osciladores modulados en frecuencia, envolventes exponenciales analógicas y generadores de ruido blanco filtrado con tiempo de ataque de $0\text{ms}$.
  - **Polifonía Ilimitada:** Múltiples piezas pueden sonar simultáneamente en el mismo milisegundo sin cortes ni retraso en el *event loop*.
- **🛡️ Prevención de Ráfagas por Tecla Mantenida:**
  Implementación estricta con `Set` de teclas activas y flag `event.repeat` para garantizar exactamente **un solo golpe sonoro por cada pulsación física**.
- **🎷 Estética Vintage Jazz Club:**
  - Acabados en madera de caoba oscura barnizada y aros de latón dorado pulido.
  - Parches crema vintage estilo pergamino con insignias tipográficas clásicas.
  - Platillos en aleación de bronce torneado con surcos concéntricos.
  - Iluminación reactiva con resplandores cálidos en ámbar y terracota.
- **📊 Visualizador Espectral de Tubos (Canvas Spectrum):**
  Renderizado en tiempo real de frecuencias de audio con un gradiente cálido continuo (*Terracota &rarr; Ámbar &rarr; Marfil*).

---

## 🎹 Mapeo de Teclas e Instrumentos

| Instrumento | Tecla Asignada | Mano / Dispositivo | Característica Sonora |
| :--- | :---: | :---: | :--- |
| **Bombo (Bass Drum)** | <kbd>Espacio</kbd> o <kbd>B</kbd> | Pie (Pedal) | Sub-grave punchy 808 (150Hz &rarr; 0.01Hz) con transitorio de impacto |
| **Caja (Snare Drum)** | <kbd>S</kbd> | Mano Izquierda | Tono acústico triangular + bordonero de ruido blanco filtrado (0.2s) |
| **Hi-Hat Cerrado** | <kbd>H</kbd> | Mano Izquierda | Ruido metálico de alta frecuencia filtrado a 7kHz con corte en 0.05s |
| **Hi-Hat Abierto** | <kbd>Y</kbd> | Mano Izquierda | Timbre metálico brillante con decaimiento sostenido en 0.35s |
| **High Tom (Tom Alto)** | <kbd>T</kbd> | Mano Derecha | Seno afinado (200Hz &rarr; 40Hz) con decaimiento melódico de 0.3s |
| **Floor Tom (Tom Bajo)** | <kbd>G</kbd> | Mano Derecha | Seno grave profundo (120Hz &rarr; 25Hz) con decaimiento de 0.4s |
| **Platillo Crash** | <kbd>C</kbd> | Mano Izquierda | Ruido blanco filtrado a 3kHz con caída expansiva de 1.2s |
| **Platillo Ride** | <kbd>R</kbd> | Mano Derecha | Doble oscilador inarmónico de campana (587Hz + 845Hz) |

---

## 📂 Estructura del Proyecto

```plaintext
drum-web/
│
├── index.html        # Estructura semántica HTML5, kit POV 2.5D y baquetas
├── style.css         # Sistema de diseño Jazz Club, texturas, iluminación y animaciones
├── app.js            # Sintetizador Web Audio API puro, gestión de teclado y baquetas
└── README.md         # Documentación oficial del proyecto
```

---

## 🚀 Cómo Ejecutar el Proyecto

Este proyecto no requiere gestores de paquetes (`npm`), frameworks ni compiladores; funciona de inmediato en cualquier navegador web moderno (*Chrome, Firefox, Edge, Safari, Brave*).

### Opción 1: Abrir directamente (Recomendado)
Haz doble clic sobre el archivo `index.html` o ejecútalo desde tu consola:

```powershell
# En Windows (PowerShell):
Start-Process "index.html"
```

```bash
# En macOS:
open index.html

# En Linux:
xdg-open index.html
```

### Opción 2: Usar un servidor local ligero (Opcional)
Si deseas servirlo mediante un servidor HTTP local:

```bash
# Con Python 3:
python -m http.server 8000

# Con Node.js (npx):
npx serve .
```
Luego abre tu navegador en `http://localhost:8000`.

---

## 🛠️ Tecnologías Empleadas

- **HTML5:** Semántica limpia, accesibilidad con etiquetas `<kbd>`, contenedores vectoriales SVG para atril y herrajes.
- **CSS3:**
  - Perspectiva tridimensional `perspective: 1100px` y `transform-style: preserve-3d`.
  - Gradientes radiales y lineales multicapa para texturas de madera, bronce y cuero.
  - Animaciones aceleradas por hardware mediante `transform: translate3d(...)` y `will-change`.
  - Diseño responsivo adaptable a pantallas de escritorio, tablets y dispositivos móviles.
- **Web Audio API:**
  - Un único `AudioContext` global en modo de baja latencia (`latencyHint: 'interactive'`).
  - Creación dinámica de `OscillatorNode`, `BiquadFilterNode` y `GainNode` con ataque $0\text{ms}$.
  - Análisis de frecuencias en tiempo real con `AnalyserNode`.
  - Generación de ruido blanco puro mediante `AudioBuffer`.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Eres libre de usarlo, modificarlo y compartirlo con fines personales o comerciales.
