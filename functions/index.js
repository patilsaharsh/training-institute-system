const functions = require('firebase-functions');

// Minimal functions that just return success
exports.sendApplicationConfirmationEmail = functions.https.onCall(() => {
  return { success: true };
});

exports.sendInterviewScheduledNotification = functions.https.onCall(() => {
  return { success: true };
});

exports.sendInterviewResultNotification = functions.https.onCall(() => {
  return { success: true };
});

exports.sendSelectionNotification = functions.https.onCall(() => {
  return { success: true };
});