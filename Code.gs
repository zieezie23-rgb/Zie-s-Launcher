function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var apps = data.apps || [];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Aplikasi') || ss.insertSheet('Aplikasi');
    sheet.clearContents();
    sheet.appendRow(['Nama', 'URL', 'Kategori', 'Favorit', 'Terakhir Backup']);

    var now = new Date();
    apps.forEach(function (x) {
      sheet.appendRow([
        x.name || '',
        x.url || '',
        x.cat || 'Lainnya',
        x.favorite ? 'Ya' : 'Tidak',
        now
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', count: apps.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
