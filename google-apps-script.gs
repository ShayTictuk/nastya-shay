/**
 * מקבל אישורי הגעה ושירים מהאתר וכותב אותם ל-Google Sheet.
 * הוראות התקנה: README.md
 */
// The ID from the sheet's address: docs.google.com/spreadsheets/d/<ID>/edit
const SHEET_ID = '1MrwCC4VTErPzKDIwol8DQIWmFXPhWOXWBIWUyneysNo';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (data.type === 'song') {
      sheet_(ss, 'שירים', ['זמן', 'שיר', 'אמן'])
        .appendRow([new Date(), clean_(data.title), clean_(data.artist)]);
    } else {
      const yes = data.attending === 'yes';
      sheet_(ss, 'אישורי הגעה', ['זמן', 'שם', 'טלפון', 'מגיעים', 'כמות', 'הערות'])
        .appendRow([new Date(), clean_(data.name), clean_(data.phone), yes ? 'כן' : 'לא', yes ? Number(data.guests) || 1 : 0, clean_(data.notes)]);
    }
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor: approves access and creates both tabs.
function setup() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  sheet_(ss, 'אישורי הגעה', ['זמן', 'שם', 'טלפון', 'מגיעים', 'כמות', 'הערות']);
  sheet_(ss, 'שירים', ['זמן', 'שיר', 'אמן']);
}

function sheet_(ss, name, headers) {
  let s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    s.appendRow(headers);
    s.setFrozenRows(1);
    s.setRightToLeft(true);
  }
  return s;
}

// Keeps guest text from being run as a spreadsheet formula.
function clean_(v) {
  const s = String(v == null ? '' : v).slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
