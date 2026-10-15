# 🎓 The Puán Lane (1990)

> **Simulación Universitaria por Turnos inspirada en *Jones in the Fast Lane* (Sierra On-Line, 1990), adaptada a la Facultad de Filosofía y Letras de la Universidad de Buenos Aires (Puán 480).**

🎮 **[JUGAR ONLINE AQUÍ](https://marianovilar.github.io/puan-fast-lane/)**

---

## 🕹️ Descripción del Juego

*The Puán Lane* es un simulador de gestión de recursos, toma de decisiones y supervivencia académica. Como estudiante en Puán, deberás administrar tu presupuesto semanal de horas y balancear tu Salud Mental / Energía física a lo largo de un semestre de 16 semanas.

### ⏳ Economía Dual
1. **Tiempo Semanal:**
   - 40 horas disponibles por semana (20 hs para el Estudiante Laburante).
   - Cada traslado (Casa ↔ Facu: 2 hs; entre espacios internos: 0.5 hs) y cada acción descuenta tiempo.
   - El reloj analógico retro marca en **rojo** el tiempo ya consumido durante la semana.
2. **Salud Mental & Energía (0 a 100%):**
   - El estudio, la militancia y la cursada consumen energía y salud mental.
   - Si la salud mental cae por debajo del **30%**, se entra en estado de **BURNOUT** (lectura al 50% y bloqueo en exámenes).
   - Si llega a 0% durante dos semanas consecutivas, el personaje colapsa (Game Over).

---

## 🎭 Arquetipos de Jugador (Condiciones Asimétricas)

1. **La Promesa Académica (Perfil CONICET):**
   - *Meta:* Promedio $\ge 8.5$, Prestigio $\ge 300$ pts y Adscripción completada.
   - *Pasiva:* +30% eficiencia al estudiar e investigar.
   - *Desventaja:* Notas menores a 8 drenan el doble de Salud Mental.

2. **La Cuadro Militante (Conducción CEFyL):**
   - *Meta:* Capital Político $\ge 1000$ pts y mantener regularidad en las materias.
   - *Pasiva:* Acciones en CEFyL y Patio rinden x2.
   - *Desventaja:* Estudiar en Biblioteca cuesta el doble de Salud Mental.

3. **El Estudiante Laburante (La Manta Corta):**
   - *Meta:* Aprobar el semestre con Salud Mental $\ge 60\%$.
   - *Pasiva:* Inmune a pánicos menores.
   - *Desventaja:* Solo dispone de 20 hs semanales (jornada laboral).

4. **El Poeta de Pasillo (El Bohemio de Puán):**
   - *Meta:* Salud Mental $\ge 85\%$, Contactos en Patio $\ge 500$ y no quedar libre.
   - *Pasiva:* Recupera x2 de Salud Mental en el Patio; gran efectividad de chamuyo.
   - *Desventaja:* Iniciar estudio en Aula o Biblioteca cuesta +50% de energía inicial.

---

## 🏛️ Locaciones Reales de Puán 480 (Pixel Art Sierra VGA)

- **Casa:** Monoambiente bohemio para dormir y recuperar energía.
- **Aula:** Prácticos (asistencia obligatoria $\ge 75\%$) y teóricos conceptuales.
- **Biblioteca Central:** Fichaje bibliográfico y estudio intensivo en silencio.
- **Patio de Puán:** El corazón social bajo el histórico pino, café en el buffet, mate y sobremesas.
- **CEFyL:** Mesas de agrupación, fotocopiadora y asambleas eternas.
- **Instituto de Investigación:** Archivo histórico, fichaje de fuentes y ponencias académicas.

---

## 📝 Personalización de Diálogos

Todos los pensamientos y viñetas del personaje en cada espacio están centralizados en:
📁 [`src/dialogos.json`](src/dialogos.json)

Podés editar, agregar o cambiar cualquier diálogo abriendo el archivo JSON en cualquier editor sin tocar código TypeScript.

---

## 🛠️ Tecnologías

- **Frontend:** React 19 + TypeScript + Vite
- **Estilos:** Tailwind CSS v4 + Estética retro Sierra On-Line (VGA 1990) + Fuentes pixel art Google Fonts (*Press Start 2P*, *VT323*)
- **Audio:** Sintetizador retro Web Audio API (sin dependencias externas)
- **Deployment:** GitHub Pages con GitHub Actions

---

## 👨‍💻 Créditos

**Vibecodeado por Mariano Vilar usando Google AntiGravity.**
