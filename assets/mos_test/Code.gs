function doGet() {
  return ContentService.createTextOutput("MOS collector is running.");
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("responses") || spreadsheet.getSheets()[0];
    var headers = data.headers || [
      "timestamp",
      "name",
      "phone",
      "group",
      "present_index",
      "filename",
      "language",
      "model",
      "score",
      "session_id",
    ];
    var rows = data.rows || [];

    if (!rows.length) {
      return json_({ ok: false, error: "No rows" });
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

    return json_({
      ok: true,
      appended: rows.length,
      name: data.name || "",
      group: data.group || "",
      session_id: data.session_id || "",
    });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
