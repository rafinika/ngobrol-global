/**
 * Ngobrol Global — form handler
 * Deploy this file's contents as a Google Apps Script Web App
 * (Extensions > Apps Script in a Google Sheet with "Pendaftaran"
 * and "Newsletter" tabs). See step 3 of the migration roadmap.
 *
 * Deploy as: Web App, execute as "Me", access "Anyone".
 * Copy the resulting /exec URL into FormNewsletter.astro and
 * FormPendaftaran.astro (APPS_SCRIPT_URL).
 */

function doPost(e) {
  var params = e.parameter;
  var type = params.type;
  var sheetName = type === 'newsletter' ? 'Newsletter' : 'Pendaftaran';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return ContentService.createTextOutput('Sheet not found: ' + sheetName)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  if (type === 'newsletter') {
    if (!isValidEmail(params.email)) {
      return respond('invalid_email');
    }
    if (isDuplicate(sheet, 'email', params.email)) {
      return respond('duplicate');
    }
    sheet.appendRow([new Date(), params.email]);
  } else {
    if (!isValidEmail(params.email)) {
      return respond('invalid_email');
    }
    sheet.appendRow([
      new Date(),
      params.nama || '',
      params.email || '',
      params.negara || '',
      params.cerita || '',
    ]);
  }

  return respond('ok');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
}

function isDuplicate(sheet, column, value) {
  var data = sheet.getDataRange().getValues();
  // Assumes email is in the last appended column position used above.
  return data.some(function (row) {
    return row.indexOf(value) !== -1;
  });
}

function respond(status) {
  return ContentService.createTextOutput(status).setMimeType(
    ContentService.MimeType.TEXT
  );
}
