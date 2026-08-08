# Revisiones pendientes del cuestionario

Divergencias detectadas al convertir `25005312CU0203-Teorías políticas MASTER - UAB.docx`
en simulador web, contrastando con los documentos de ética
(`Submission Ethics/Consent form and Debrief/`). **Ninguna se ha resuelto por cuenta propia
salvo la primera**, que estaba confirmada como error.

---

## Corregido en el Word

### 1. `directQ`: el ítem sensible estaba cruzado — CORREGIDO

El documento define `Rama A = Chemtrails` y `Rama B = COVID-19`, pero la pregunta directa
decía lo contrario:

> `[TEXT DISPLAY IF RAMA A]: “Una élite global liberó el virus de la COVID-19…”`
> `[TEXT DISPLAY IF RAMA B]: “Las estelas blancas de los aviones (chemtrails)…”`

Un experimento de recuento de ítems compara la estimación indirecta con la respuesta directa
**al mismo ítem**; cruzarlos invalida la comparación.

**Hecho:** el párrafo se ha reescrito en el Word con la asignación correcta, resaltado en
amarillo y con una nota debajo que conserva el texto original. Copia de seguridad en
`25005312CU0203-Teorías políticas MASTER - UAB_backup_2026-08-08.docx`.

---

## Pendientes de decisión (no tocados en el Word)

### 2. Duración declarada en el consentimiento: 25 vs 20 minutos

- Word (español): *«Te llevará aproximadamente unos 25 minutos.»*
- `Consent page survey.docx` (inglés, expediente de ética): *«approximately 20 minutes»*

El simulador usa **25 minutos**, que es lo que dice el cuestionario. Conviene alinear ambos
documentos: el que se presentó a ética es el de 20.

### 3. Correo electrónico de contacto

- Word: `marc.guinjoanc@uab.cat`
- Documento de ética: `marc.guinjoan@uab.cat`

El simulador reproduce el del Word. Uno de los dos es incorrecto y aparece en la pantalla de
consentimiento, que es el punto de contacto que se ofrece a la persona participante.

### 4. `items_spain`: hay dos filas `item_28` y no hay `item_29`

En la tabla de 31 ítems:

| Fila | Variable en el Word | Texto |
|---|---|---|
| 28 | `item_28` | Los camaleones cambian de color para camuflarse |
| 29 | `item_28` | Algunas especies de animales y plantas se han extinguido para siempre |

El simulador ha renombrado la segunda como `item_29`. Hay que decidir la numeración
definitiva antes de programar el instrumento real.

### 5. `items_spain`: filas 27 a 31 sin códigos de respuesta

Las celdas «Sí»/«No» de las filas `item_27` a `item_31` están vacías en el Word, mientras
que las filas 1–26 llevan `1`/`0`. El simulador aplica `1`/`0` a todas.

### 6. `partip`: «Randomize rows 1-7» pero la batería tiene 8 filas

No hay ninguna nota que fije `partip_8` («Participar en una huelga») al final, a diferencia
de `discrim_reasons`, donde sí se indica explícitamente. El simulador **aleatoriza las ocho
filas**. Si la intención era dejar `partip_8` fijo, hay que decirlo.

### 7. Enunciado de los trade-offs (comentario de Carol Galais, 14/07/2026)

> *«son dos instrucciones diferentes. Me perturba mucho.»*
> *«a partir de la 2ª cuestión ¿cuál de estos dos principios crees que debería prevalecer
> cuando existe un conflicto entre ambos?»*

El simulador aplica esa redacción a las preguntas 2 a 6 y mantiene la original en la
primera. Falta cerrar el comentario en el Word.

### 8. `eu_` no tiene nombre de variable

El párrafo dice `eu_¿En qué medida estás de acuerdo con las siguientes afirmaciones?`: se
perdió el nombre de la variable al escribir el enunciado. Los ítems sí lo tienen
(`eu_interest`, `eu_transp`). El simulador la llama `eu_att`.

### 9. El debriefing dice «tres experimentos», pero media muestra española hace dos

La sección 1 del debriefing («completaste una de estas dos opciones: A o B») describe el
experimento de recuento de ítems, que **solo ve el 50% de la muestra española**; el otro 50%
responde `items_spain`. El simulador omite esa sección cuando no corresponde, pero el texto
introductorio sigue diciendo «Has participado en tres experimentos». Hay que revisar la
redacción.

### 10. Redacción: «En la siguiente página encontrarás un pequeño texto»

En el sub-bloque DEBUNK, esa frase introduce el texto del Plan Kalergi, pero el salto de
página está *después* del texto, no antes. El simulador muestra la frase y el texto en la
misma pantalla. Si la intención era una pantalla intermedia, hay que añadir el salto.

### 11. `sm_use`: etiqueta de columna truncada

La cabecera dice `La uso de forma pasiva (veo contenido` — falta el paréntesis de cierre. El
simulador escribe `La uso de forma pasiva (veo contenido)`.

---

## Fuera del alcance del simulador (otros países)

No afectan a la versión española, pero conviene arreglarlos antes del campo:

- **Grecia** (`local_gr1`, `local_gr2`): las dos filas tienen **exactamente el mismo texto**
  (el intento de asesinato de Kostas Karamanlis en 2008). Falta el segundo ítem.
- **Eslovaquia**: las variables se llaman `local_cz1`, `local_cz2`, `local_cz3` (prefijo
  checo) y, además, la primera fila es el ítem checo de la Revolución de Terciopelo, no uno
  eslovaco.
- **Nombres de variable con espacios** en varias tablas de CTs locales: `local_ at2`,
  `local_ cz2`, `local_ fr2`, `local_ gr2`, `local_ hu2`, `local_ it2`, `local_ nl2`,
  `local_ pl2`, `local_ pt2`, `local_ se2`, `local_ uk2`. Se arrastrarán al fichero de datos.
- **Alemania, Chequia y Eslovaquia** repiten el ítem de George Soros / Open Society con
  redacciones casi idénticas a las de Hungría y Polonia; conviene comprobar que es
  intencionado.

---

## Recodificaciones asumidas en el simulador

El screener de Ipsos incluye variables ocultas que el simulador calcula:

| Variable | Cómo se obtiene |
|---|---|
| `RESP_AGE` | De la fecha de nacimiento. |
| `QUOTAGERANGE` | De la edad (`18_24`, `25_34`, `35_44`, `45_54`, `55_65`, `more_65`). |
| `EducationGRP` | De `ES01EDU`: 1–2 → Low, 3–5 → Medium, 6 → High. |
| `ESREGION2` | De la provincia, que es un desplegable de las 52. |
| `ESDEGURBA` | **No se calcula**: requiere el maestro de códigos postales de Ipsos. |

La lista de países de `country_birth` y `country_citizen` no está en el Word (remite a
`Lista_195_paises_UAB`); el simulador usa una lista propia de 195 países en español con
España en primer lugar y numeración secuencial.
