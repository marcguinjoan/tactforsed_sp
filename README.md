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
| `Code.gs` | Receptor de Apps Script para la hoja de cálculo. Debe estar vinculado a la hoja. |
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

## Hoja de cálculo

1. Crear una hoja de Google nueva.
2. Desde la hoja: **Extensiones → Apps Script**.
3. Borrar todo lo que haya, incluido el `function myFunction() { }` por defecto, y pegar el
   contenido de `Code.gs`. `doPost` y `doGet` deben quedar como funciones de primer nivel.
4. Guardar.
5. **Implementar → Nueva implementación → Aplicación web**, ejecutando como tú y con acceso
   para **«Cualquier persona»** (no «Cualquier persona con cuenta de Google»: falla para
   quien no tenga sesión iniciada).
6. Autorizar (aviso de aplicación no verificada → Configuración avanzada → Ir a…).
7. Copiar la URL que acaba en `/exec` y pegarla en `APPS_SCRIPT_URL`, al principio del
   `<script>` de `index.html`.

Si más adelante se toca `Code.gs`, no basta con guardar: **Gestionar implementaciones →
editar → Versión: Nueva versión**. Crear una implementación nueva de cero cambia la URL.

El envío se hace con `mode:'no-cors'`, de modo que el navegador **no confirma** la respuesta
del servidor. La pantalla final lo advierte: hay que comprobar la hoja.

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
