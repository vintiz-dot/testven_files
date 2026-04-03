/**
 * ============================================================
 *  Code.gs — Google Apps Script for EdTech Capstone Survey
 *  (Expanded 8-Question Version)
 * ============================================================
 *
 *  SETUP INSTRUCTIONS:
 *  ────────────────────
 *  1. Open Google Sheets → create a new spreadsheet
 *  2. Name it "EdTech Capstone Survey Responses"
 *  3. Go to Extensions → Apps Script
 *  4. Replace the default code with this entire file
 *  5. Save (Ctrl+S)
 *  6. Run setupHeaders() once to auto-create formatted column headers
 *  7. Click Deploy → New deployment
 *     - Type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  8. Click Deploy → copy the Web App URL
 *  9. Paste that URL into script.js where it says:
 *     const APPS_SCRIPT_URL = '...';
 *
 *  COLUMN HEADERS (14 columns):
 *     A: Timestamp           (server time)
 *     B: Submitted At        (client time)
 *     C: Grade Band
 *     D: Role
 *     E: Current Devices
 *     F: Usage Frequency
 *     G: Classroom Uses
 *     H: Digital Platforms
 *     I: Differentiation Rating
 *     J: Effectiveness Rating
 *     K: Challenges
 *     L: PD Needs
 *     M: Device Preference
 *     N: Recommendation
 *
 *  IMPORTANT:
 *  - Every time you edit this code, you must create a NEW deployment
 *    (Deploy → New deployment) for changes to take effect.
 */

// ──────────────────────────────────────────────────────────
// doGet() — PRIMARY handler for survey submissions
// Data arrives as URL query parameters via e.parameter.
// GET is used because it follows Apps Script's 302 redirect
// seamlessly — no CORS issues from cross-origin pages.
// ──────────────────────────────────────────────────────────
function doGet(e) {
  try {
    // If run from editor or no parameters
    if (typeof e === 'undefined' || !e.parameter) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', message: 'Endpoint active. No data.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = e.parameter;

    // Check if this is a survey submission (has at least one survey field)
    if (data.grade_band || data.current_devices || data.challenges || data.recommendation) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

      // ── Deduplication: skip if this submission_id already exists ──
      var subId = data.submission_id || '';
      if (subId) {
        var lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          var ids = sheet.getRange(2, 15, lastRow - 1, 1).getValues().flat();
          if (ids.indexOf(subId) !== -1) {
            return ContentService
              .createTextOutput(JSON.stringify({ status: 'duplicate', message: 'Already recorded' }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      }

      var row = [
        new Date(),                              // A: Timestamp (server time)
        data.timestamp || '',                    // B: Submitted At (client time)
        data.grade_band || '',                   // C: Grade Band
        data.role || '',                         // D: Role
        data.current_devices || '',              // E: Current Devices
        data.usage_frequency || '',              // F: Usage Frequency
        data.classroom_uses || '',               // G: Classroom Uses
        data.digital_platforms || '',            // H: Digital Platforms
        data.differentiation_rating || '',       // I: Differentiation Rating
        data.effectiveness_rating || '',         // J: Effectiveness Rating
        data.challenges || '',                   // K: Challenges
        data.pd_needs || '',                     // L: PD Needs
        data.device_preference || '',            // M: Device Preference
        data.recommendation || '',               // N: Recommendation
        subId                                    // O: Submission ID (dedup key)
      ];

      sheet.appendRow(row);

      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          message: 'Response recorded',
          row: sheet.getLastRow()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // No survey data — just return status
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'ok',
        message: 'EdTech Capstone Survey endpoint is active.',
        sheet: SpreadsheetApp.getActiveSpreadsheet().getName(),
        rows: SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────
// doPost() — FALLBACK handler for POST requests
// ──────────────────────────────────────────────────────────
function doPost(e) {
  try {
    if (typeof e === 'undefined') {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'No event object. Deploy as Web App.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;

    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'No data received' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── Deduplication ──
    var subId = data.submission_id || '';
    if (subId) {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        var ids = sheet.getRange(2, 15, lastRow - 1, 1).getValues().flat();
        if (ids.indexOf(subId) !== -1) {
          return ContentService
            .createTextOutput(JSON.stringify({ status: 'duplicate', message: 'Already recorded' }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    var row = [
      new Date(),
      data.timestamp || '',
      data.grade_band || '',
      data.role || '',
      data.current_devices || '',
      data.usage_frequency || '',
      data.classroom_uses || '',
      data.digital_platforms || '',
      data.differentiation_rating || '',
      data.effectiveness_rating || '',
      data.challenges || '',
      data.pd_needs || '',
      data.device_preference || '',
      data.recommendation || '',
      subId
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Response recorded',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ──────────────────────────────────────────────────────────
// setupHeaders() — Run this ONCE to create formatted headers
// ──────────────────────────────────────────────────────────
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = [
    'Timestamp',
    'Submitted At',
    'Grade Band',
    'Role',
    'Current Devices',
    'Usage Frequency',
    'Classroom Uses',
    'Digital Platforms',
    'Differentiation Rating',
    'Effectiveness Rating',
    'Challenges',
    'PD Needs',
    'Device Preference',
    'Recommendation',
    'Submission ID'
  ];

  // Set headers in row 1
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format header row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4F46E5');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');

  // Auto-resize columns
  for (var i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }

  // Set wider widths for text-heavy columns
  sheet.setColumnWidth(5, 300);   // Current Devices
  sheet.setColumnWidth(7, 350);   // Classroom Uses
  sheet.setColumnWidth(8, 350);   // Digital Platforms
  sheet.setColumnWidth(11, 350);  // Challenges
  sheet.setColumnWidth(12, 350);  // PD Needs
  sheet.setColumnWidth(14, 400);  // Recommendation

  // Freeze header row
  sheet.setFrozenRows(1);

  Logger.log('Headers set up successfully! 14 columns created.');
}
