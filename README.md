# Simulador · Encuesta de Teorías políticas (TaCT-FoRSED · España)

Simulador web del cuestionario **«25005312CU0203 – Teorías políticas MASTER – UAB»**
(Ipsos, olas de 15 países), adaptado a la submuestra española.

**Este simulador no es la herramienta de recogida de datos del panel.** Sirve para que el
equipo recorra el cuestionario, lo cronometre y deje comentarios pantalla a pantalla antes
del trabajo de campo.

## Qué contiene

| Fichero | Descripción |
|---|---|
| `index.html` | El simulador entero. Un solo fichero autónomo, sin dependencias: funciona abriéndolo en local. |
| `ResponsesScript.osts` | Office Script que añade cada respuesta a `answers_pilottact_sp.xlsx`. Se ejecuta desde un flujo de Power Automate. |
| `answers_pilottact_sp.xlsx` | **No está en el repositorio** (ver `.gitignore`): vive en esta misma carpeta de OneDrive y es donde caen las respuestas. |
| `REVISIONES.md` | Divergencias detectadas entre el Word, los documentos de ética y el simulador. |

## Alcance

- **Solo España** (`S0 = 6`). Se usan la lista de partidos española, los deciles de renta de
  España, las teorías de la conspiración locales españolas y las provincias/CCAA.
- **Screener completo** (fecha de nacimiento, género, residencia, educación) antes del
  consentimiento, siguiendo el orden del Word.
- **78–80 pantallas** y **295–320 columnas**, según la rama que toque.

## Aleatorización

Cada sesión asigna al azar:

| Variable | Valores |
|---|---|
| `block_order` | Trade-offs ⇄ Conspiracy beliefs (50/50) |
| `spain_split_exp1` | `list` (experimento de recuento) / `items` (batería `items_spain`), 50/50 |
| `rama` | A = chemtrails · B = COVID-19 |
| `list_arm` | 1–4 (orden y qué lista lleva el ítem sensible) |
| `condition_traits` | 1–9 |
| `exp3_block` | `debunk` / `prebunk`, 50/50 |
| `condition_debunk` / `condition_prebunk` | 1–4 |

Además se aleatoriza el orden de filas de 12 baterías y la posición de los polos de las seis
preguntas de trade-offs. El orden mostrado se exporta en las columnas `*_order` y
`flip_tradeoff_*`.

Las condiciones asignadas **no aparecen en ninguna pantalla del recorrido**. Hay una
comprobación automática de esto en el script de verificación.

## Panel del simulador

La primera pantalla muestra:

- las **condiciones asignadas** en la sesión;
- el **árbol del recorrido** por bloques, con el número de pantallas de cada uno;
- **saltos directos**: al hacer clic en un bloque se va a su primera pantalla;
- **«Reasignar condiciones»**: vuelve a sortear todas las condiciones y borra respuestas y
  comentarios, para poder recorrer otra combinación.

Desde cualquier pantalla se puede volver al panel con el enlace del pie.

Si en una sesión se usan saltos, reasignaciones o se reabre el panel a mitad del recorrido,
la fila queda marcada con `modo_revision = 1`, `n_saltos` y `n_reasignaciones`, para poder
filtrar los tiempos que no son comparables con una pasada limpia.

## Navegación y validación

- Se puede ir adelante y atrás libremente; las respuestas se conservan.
- **No hay validación obligatoria**: se puede continuar sin responder, y lo no respondido se
  guarda en blanco.
- Las únicas excepciones son el rango del año de nacimiento y la dependencia
  `children_u14 ≤ household_size − 1`.
- Si en el consentimiento se responde que no, la encuesta termina; también si la edad es
  menor de 18. En ambos casos se puede volver atrás para rectificar.

## Comentarios

Cada pantalla tiene una caja de comentarios desplegable que indica el nombre de la columna
donde acabará (`variable_comment`, justo a la derecha de la variable). En la pantalla final
hay un repaso de todos los comentarios escritos, en orden del cuestionario.

## Resultados en `answers_pilottact_sp.xlsx`

Las respuestas caen en la hoja **«Respuestas»** de `answers_pilottact_sp.xlsx`, en esta misma
carpeta de OneDrive — ya tiene la cabecera fija escrita y está lista para recibir filas. No
está en el repositorio (ver `.gitignore`): es un fichero de datos, no de código, y el
repositorio es público.

Como el simulador es una página estática en GitHub Pages, no puede escribir directamente en
un fichero de OneDrive: hace falta un intermediario que reciba el envío y añada la fila. El
equivalente de Microsoft a lo que hacía Apps Script con Google Sheets es un flujo de
**Power Automate** con disparador HTTP que ejecuta el Office Script `ResponsesScript.osts`.

1. En `answers_pilottact_sp.xlsx` (Excel Online, no la app de escritorio): pestaña
   **Automatizar → Nuevo script**, borrar el contenido de ejemplo y pegar
   `ResponsesScript.osts`. Guardar con un nombre reconocible (p. ej. «Añadir respuesta»).
2. Ir a [make.powerautomate.com](https://make.powerautomate.com) → **Crear → Flujo de nube
   instantáneo** → elegir el disparador **«Cuando se recibe una solicitud HTTP»** (no hace
   falta definir un esquema JSON: se deja el cuerpo como texto).
3. Añadir una acción **Excel Online (Business) → Ejecutar script**:
   - Ubicación: OneDrive - UAB (o Business).
   - Documento: `answers_pilottact_sp.xlsx` (buscarlo o pegar su ruta).
   - Script: el que has guardado en el paso 1.
   - Parámetro `payloadJson`: la expresión `triggerBody()` (el cuerpo tal cual llega).
4. Guardar el flujo. Power Automate genera la **URL HTTP POST** del disparador: cópiala.
5. Pega esa URL en `RESPONSES_URL`, al principio del `<script>` de `index.html`.

Si más adelante se modifica `ResponsesScript.osts`, basta con guardar el script en Excel
Online: el flujo llama siempre a la última versión guardada, no hace falta redesplegar nada
(a diferencia de Apps Script). Si se borra el flujo y se crea uno nuevo, la URL cambia.

El envío se hace con `mode:'no-cors'`, de modo que el navegador **no confirma** la respuesta
del servidor. La pantalla final lo advierte: hay que comprobar el Excel.

**Aviso de cuenta:** el flujo y el script deben crearse con la cuenta de UAB que tiene acceso
a esta carpeta de OneDrive; si `answers_pilottact_sp.xlsx` se comparte o se mueve de carpeta,
el flujo puede dejar de encontrarlo y hay que reapuntarlo al fichero nuevo.

## Material sensible

El cuestionario en Word **no contiene ningún estímulo visual**: las únicas imágenes del
documento son logotipos de las cabeceras. Por tanto no se ha incrustado ningún material
gráfico en el simulador, y **no debe añadirse ninguno más adelante** sin revisar antes el
expediente de ética. El repositorio es público porque GitHub Pages lo exige, y por eso la
página lleva `<meta name="robots" content="noindex, nofollow">` y el `.docx` original queda
fuera del repositorio.

## Verificación

El JavaScript se puede comprobar desde Node sin abrir el navegador: sintaxis, construcción
del flujo en todas las combinaciones de condiciones, ausencia de columnas duplicadas o con
caracteres extraños, correspondencia del ítem sensible de `directQ` con la lista vista,
secciones condicionales del debriefing y dependencias entre preguntas.
