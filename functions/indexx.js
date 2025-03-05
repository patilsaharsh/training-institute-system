const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({origin: true});

// Initialize Firebase
admin.initializeApp();
const db = admin.firestore();

// Set SendGrid API key from environment or Firebase config
const getApiKey = () => {
  try {
    return functions.config().sendgrid?.api_key || process.env.SENDGRID_API_KEY;
  } catch (error) {
    console.warn('Error retrieving SendGrid API key from config:', error);
    return process.env.SENDGRID_API_KEY;
  }
};

// Initialize SendGrid with API key
try {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('SendGrid API key not found in config or environment variables');
  } else {
    sgMail.setApiKey(apiKey);
  }
} catch (error) {
  console.error('Error initializing SendGrid:', error);
}

// Robust helper function to send email
const sendEmail = async (to, subject, html) => {
  if (!to || !subject || !html) {
    console.error('Missing required email parameters');
    return { success: false, error: 'Missing required email parameters' };
  }

  const msg = {
    to,
    from: 'saharshap3@gmail.com', // Your verified sender email in SendGrid
    subject,
    html,
  };
  
  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    
    // Log detailed error for debugging
    if (error.response) {
      console.error('SendGrid API Error:', error.response.body);
    }
    
    // Return success anyway to prevent function failures
    return { 
      success: false, 
      error: error.message,
      // Still return success status for the function
      functionSuccess: true 
    };
  }
};

// CORS wrapper helper function
const withCors = (handler) => {
  return (data, context) => {
    return new Promise((resolve) => {
      cors(data, context, async () => {
        try {
          const result = await handler(data, context);
          resolve(result);
        } catch (error) {
          console.error('Function error:', error);
          resolve({ 
            success: false, 
            error: error.message || 'Unknown error occurred'
          });
        }
      });
    });
  };
};

// Send application confirmation email
exports.sendApplicationConfirmationEmail = functions.https.onCall(
  withCors(async (data) => {
    const { applicationId, email, name } = data;
    
    if (!email || !name) {
      throw new functions.https.HttpsError('invalid-argument', 'Email and name are required');
    }
    
    const subject = 'Application Received - Training Institute';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Application Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for applying to our training program. We have received your application and it is currently under review.</p>
        <p>You will be notified once your application is processed and an interview is scheduled.</p>
        <p>Application ID: ${applicationId}</p>
        <p>If you have any questions, please contact our support team.</p>
        <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
      </div>
    `;
    
    return await sendEmail(email, subject, html);
  })
);

// Send interview scheduled notification
exports.sendInterviewScheduledNotification = functions.https.onCall(
  withCors(async (data) => {
    const { 
      applicationId, 
      studentEmail, 
      studentName, 
      interviewerEmail, 
      interviewerName, 
      meetingLink, 
      scheduledDate,
      interviewNumber
    } = data;
    
    if (!studentEmail || !interviewerEmail || !meetingLink || !scheduledDate) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required data');
    }
    
    let formattedDate;
    try {
      formattedDate = new Date(scheduledDate).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      formattedDate = scheduledDate.toString();
    }
    
    // Send email to student
    const studentSubject = `Interview ${interviewNumber} Scheduled - Training Institute`;
    const studentHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Interview Scheduled</h2>
        <p>Dear ${studentName},</p>
        <p>Your interview for the training program has been scheduled with <strong>${interviewerName}</strong> on <strong>${formattedDate}</strong>.</p>
        <p>Please join the interview using the following link:</p>
        <p><a href="${meetingLink}" style="color: #4F46E5;">${meetingLink}</a></p>
        <p>Please be on time and make sure your camera and microphone are working properly.</p>
        <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
      </div>
    `;
    
    // Send email to interviewer
    const interviewerSubject = `Interview ${interviewNumber} Assignment - Training Institute`;
    const interviewerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Interview Assignment</h2>
        <p>Dear ${interviewerName},</p>
        <p>You have been assigned to conduct an interview for a training program applicant.</p>
        <p><strong>Applicant:</strong> ${studentName}</p>
        <p><strong>Email:</strong> ${studentEmail}</p>
        <p><strong>Interview Date:</strong> ${formattedDate}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #4F46E5;">${meetingLink}</a></p>
        <p>Please log in to the interviewer dashboard to view more details and to provide your evaluation after the interview.</p>
        <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
      </div>
    `;
    
    const results = await Promise.allSettled([
      sendEmail(studentEmail, studentSubject, studentHtml),
      sendEmail(interviewerEmail, interviewerSubject, interviewerHtml)
    ]);
    
    // Even if one email fails, return success for the function
    return { 
      success: true,
      studentEmailSent: results[0].status === 'fulfilled' && results[0].value.success,
      interviewerEmailSent: results[1].status === 'fulfilled' && results[1].value.success
    };
  })
);

// Send interview result notification
exports.sendInterviewResultNotification = functions.https.onCall(
  withCors(async (data) => {
    const { applicationId, studentEmail, studentName, status, feedback, interviewNumber } = data;
    
    if (!studentEmail || !status) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required data');
    }
    
    const subject = `Interview ${interviewNumber} Result - Training Institute`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Interview Result</h2>
        <p>Dear ${studentName},</p>
        <p>We would like to inform you about the result of your recent interview for the training program.</p>
        <p><strong>Result:</strong> ${status === 'passed' ? 'Passed' : 'Not Selected'}</p>
        ${status === 'passed' ? 
          interviewNumber < 3 ? 
            `<p>Congratulations! You have passed Interview ${interviewNumber}. You will soon be contacted for the next round of interviews.</p>` : 
            `<p>Congratulations! You have passed all interviews and have been selected for the training program. You will receive further details soon.</p>` :
          `<p>We regret to inform you that you have not been selected to move forward in the process. We appreciate your interest and wish you the best in your future endeavors.</p>`
        }
        <p><strong>Feedback:</strong> ${feedback}</p>
        <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
      </div>
    `;
    
    return await sendEmail(studentEmail, subject, html);
  })
);

// Send selection notification
exports.sendSelectionNotification = functions.https.onCall(
  withCors(async (data) => {
    const { applicationId, studentEmail, studentName } = data;
    
    if (!studentEmail || !studentName) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required data');
    }
    
    const subject = 'Congratulations! You have been selected - Training Institute';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Selection Confirmation</h2>
        <p>Dear ${studentName},</p>
        <p>We are pleased to inform you that you have been selected for our training program. Congratulations!</p>
        <p>Our team will contact you soon with details about the next steps, including start date, schedule, and other important information.</p>
        <p>We look forward to welcoming you to our training program and helping you develop your skills.</p>
        <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
      </div>
    `;
    
    return await sendEmail(studentEmail, subject, html);
  })
);

// Daily report for admins about pending applications
exports.sendDailyPendingApplicationsReport = functions.pubsub
  .schedule('0 9 * * *') // Runs at 9 AM every day
  .timeZone('Asia/Kolkata') // Indian Standard Time
  .onRun(async (context) => {
    try {
      // Get all admin users
      const adminUsersSnapshot = await db.collection('users')
        .where('role.admin', '==', true)
        .get();
      
      if (adminUsersSnapshot.empty) {
        console.log('No admin users found');
        return null;
      }
      
      // Get various application statuses
      const snapshots = await Promise.all([
        db.collection('applications').where('status', '==', 'pending').get(),
        db.collection('applications').where('status', '==', 'interview1_scheduled').get(),
        db.collection('applications').where('status', '==', 'interview1_passed').get(),
        db.collection('applications').where('status', '==', 'interview2_scheduled').get(),
        db.collection('applications').where('status', '==', 'interview2_passed').get(),
        db.collection('applications').where('status', '==', 'interview3_scheduled').get()
      ]);
      
      const [
        pendingAppsSnapshot,
        interview1ScheduledSnapshot,
        interview1PassedSnapshot,
        interview2ScheduledSnapshot,
        interview2PassedSnapshot,
        interview3ScheduledSnapshot
      ] = snapshots;
      
      // Prepare email content
      const counts = [
        pendingAppsSnapshot.size,
        interview1ScheduledSnapshot.size,
        interview1PassedSnapshot.size,
        interview2ScheduledSnapshot.size,
        interview2PassedSnapshot.size,
        interview3ScheduledSnapshot.size
      ];
      
      const subject = 'Daily Applications Status Report - Training Institute';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Daily Applications Status Report</h2>
          <p>Here is the current status of applications:</p>
          <ul>
            <li><strong>New Applications (Pending):</strong> ${counts[0]}</li>
            <li><strong>Interview 1 Scheduled:</strong> ${counts[1]}</li>
            <li><strong>Interview 1 Passed (Awaiting Interview 2):</strong> ${counts[2]}</li>
            <li><strong>Interview 2 Scheduled:</strong> ${counts[3]}</li>
            <li><strong>Interview 2 Passed (Awaiting Interview 3):</strong> ${counts[4]}</li>
            <li><strong>Interview 3 Scheduled:</strong> ${counts[5]}</li>
          </ul>
          <p>Please log in to the admin dashboard to take necessary actions.</p>
          <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
        </div>
      `;
      
      // Send email to all admins
      const emailPromises = [];
      adminUsersSnapshot.forEach(doc => {
        const adminEmail = doc.data().email;
        if (adminEmail) {
          emailPromises.push(sendEmail(adminEmail, subject, html));
        }
      });
      
      await Promise.allSettled(emailPromises);
      
      return null;
    } catch (error) {
      console.error('Error sending daily report:', error);
      return null;
    }
  });

// Reminder for interviewers 1 hour before the interview
exports.sendInterviewReminders = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    try {
      const now = admin.firestore.Timestamp.now();
      const oneHourLater = new Date(now.toMillis() + 3600000); // 1 hour in milliseconds
      
      // Get all interviews scheduled in the next hour
      const interviewsSnapshot = await db.collection('applications')
        .where('status', 'in', ['interview1_scheduled', 'interview2_scheduled', 'interview3_scheduled'])
        .get();
      
      if (interviewsSnapshot.empty) {
        console.log('No upcoming interviews found');
        return null;
      }
      
      const emailPromises = [];
      
      interviewsSnapshot.forEach(doc => {
        const application = doc.data();
        
        // Determine which interview we're looking at
        let interviewKey, interviewNumber;
        
        if (application.status === 'interview1_scheduled') {
          interviewKey = 'interview1';
          interviewNumber = 1;
        } else if (application.status === 'interview2_scheduled') {
          interviewKey = 'interview2';
          interviewNumber = 2;
        } else if (application.status === 'interview3_scheduled') {
          interviewKey = 'interview3';
          interviewNumber = 3;
        } else {
          return; // Skip if no valid interview status
        }
        
        const interview = application.interviews?.[interviewKey];
        
        if (!interview || !interview.scheduledDate) return;
        
        const scheduledDate = interview.scheduledDate.toDate();
        
        // Check if interview is in the next hour
        if (scheduledDate >= now.toDate() && scheduledDate <= oneHourLater) {
          // Send reminder to interviewer
          const interviewerEmail = interview.interviewerId;
          const interviewerName = interview.interviewerName || 'Interviewer';
          const studentName = application.name || 'Student';
          const meetingLink = interview.meetingLink || '#';
          
          if (!interviewerEmail) return;
          
          let formattedDate;
          try {
            formattedDate = scheduledDate.toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
          } catch (error) {
            formattedDate = scheduledDate.toString();
          }
          
          // Reminder email to interviewer
          const subject = `Reminder: Interview in 1 hour - Training Institute`;
          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4F46E5;">Interview Reminder</h2>
              <p>Dear ${interviewerName},</p>
              <p>This is a reminder that you have an interview scheduled in 1 hour.</p>
              <p><strong>Applicant:</strong> ${studentName}</p>
              <p><strong>Interview:</strong> Interview ${interviewNumber}</p>
              <p><strong>Date & Time:</strong> ${formattedDate}</p>
              <p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #4F46E5;">${meetingLink}</a></p>
              <p>Please ensure you're prepared and ready for the interview.</p>
              <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
            </div>
          `;
          
          emailPromises.push(sendEmail(interviewerEmail, subject, html));
          
          // Also send reminder to student
          const studentEmail = application.email;
          
          if (studentEmail) {
            const studentSubject = `Reminder: Your interview is in 1 hour - Training Institute`;
            const studentHtml = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Interview Reminder</h2>
                <p>Dear ${studentName},</p>
                <p>This is a reminder that your interview is scheduled in 1 hour.</p>
                <p><strong>Interview:</strong> Interview ${interviewNumber}</p>
                <p><strong>Date & Time:</strong> ${formattedDate}</p>
                <p><strong>Interviewer:</strong> ${interviewerName}</p>
                <p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #4F46E5;">${meetingLink}</a></p>
                <p>Please ensure you're prepared and ready for the interview. Make sure your camera and microphone are working properly.</p>
                <p style="margin-top: 20px;">Regards,<br>Training Institute Team</p>
              </div>
            `;
            
            emailPromises.push(sendEmail(studentEmail, studentSubject, studentHtml));
          }
        }
      });
      
      if (emailPromises.length > 0) {
        await Promise.allSettled(emailPromises);
        console.log(`Sent ${emailPromises.length} interview reminders`);
      }
      
      return null;
    } catch (error) {
      console.error('Error sending interview reminders:', error);
      return null;
    }
  });