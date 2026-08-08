/**
 * Receptor de respuestas del simulador «Teorías políticas» (TaCT-FoRSED · UAB).
 *
 * IMPORTANTE: este script debe estar VINCULADO A LA HOJA DE CÁLCULO
 * (desde la hoja: Extensiones → Apps Script), porque usa getActiveSpreadsheet().
 * Un proyecto suelto creado desde script.google.com no encontrará ninguna hoja.
 *
 * Despliegue: Implementar → Nueva implementación → Aplicación web,
 * ejecutando como tú y con acceso para «Cualquier persona».
 * Si más adelante se modifica este fichero, no basta con guardar:
 * Gestionar implementaciones → editar → Versión: Nueva versión.
 */

var SHEET_NAME = 'Respuestas';

/* Columnas fijas, siempre en este orden y a la izquierda de todo. */
var FIXED_COLS = [
  'timestamp_servidor', 'timestamp_client', 'temps_total_segons',
  'modo_revision', 'n_saltos', 'n_reasignaciones',
  'block_order', 'spain_split_exp1', 'rama', 'list_arm',
  'condition_traits', 'exp3_block', 'condition_debunk', 'condition_prebunk',
  'terminado_en'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var flat = data.flat || {};
    var assign = data.assign || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    var header;
    if (sheet.getLastRow() === 0) {
      header = FIXED_COLS.slice();
      sheet.appendRow(header);
      sheet.setFrozenRows(1);
    } else {
      header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    /* Cabecera dinámica: hay ramas condicionales, así que no todo el mundo
       responde las mismas preguntas y una cabecera fija descolocaría las filas. */
    var known = {}, newCols = [];
    for (var i = 0; i < header.length; i++) known[header[i]] = true;
    for (var key in flat) if (!known[key]) { newCols.push(key); known[key] = true; }
    if (newCols.length) {
      sheet.getRange(1, header.length + 1, 1, newCols.length).setValues([newCols]);
      header = header.concat(newCols);
    }

    var values = {
      timestamp_servidor: new Date(),
      timestamp_client: data.timestampClient || '',
      temps_total_segons: data.totalSeconds || ''
    };
    for (var a in assign) values[a] = assign[a];
    for (var k in flat) values[k] = flat[k];

    var row = header.map(function (name) {
      return values.hasOwnProperty(name) && values[name] !== null ? values[name] : '';
    });
    sheet.appendRow(row);

    return json({ status: 'ok', columnas: header.length, nuevasColumnas: newCols.length });
  } catch (err) {
    return json({ status: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return json({ status: 'El receptor funciona. Usa POST para enviar respuestas.' });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
