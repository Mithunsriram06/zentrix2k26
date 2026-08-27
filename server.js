const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Setup SQLite Database
const dbPath = path.join(__dirname, 'zentrix_registrations.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite DB:', err);
  } else {
    console.log('Connected to SQLite Database at:', dbPath);
  }
});

// Create registrations table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      year TEXT NOT NULL,
      college TEXT NOT NULL,
      selected_events TEXT NOT NULL,
      food TEXT NOT NULL,
      amount INTEGER DEFAULT 100,
      payment_method TEXT DEFAULT 'UPI',
      transaction_id TEXT,
      payment_proof TEXT,
      registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Configure Multer for payment proof image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.png';
    cb(null, 'proof-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

// Email Transporter (Attempts real SMTP if configured or fallback simulation with logging)
async function sendConfirmationEmail(registration) {
  try {
    // Generate test account if process.env credentials not present
    let transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // Ethereal SMTP test account for automatic email creation
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const eventsList = JSON.parse(registration.selected_events || '[]').join(', ');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #07080d; color: #ffffff; padding: 25px; border-radius: 16px; border: 2px solid #ff0055; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff0055; text-align: center; margin-bottom: 5px;">ZENTRIX 2K26</h2>
        <p style="text-align: center; color: #00f0ff; font-weight: bold; margin-top: 0;">Department of Artificial Intelligence & Data Science</p>
        <p style="text-align: center; color: #aaaaaa; font-size: 13px;">T.J.S Engineering College • September 11, 2026</p>
        <hr style="border-color: #333333; margin: 20px 0;" />
        
        <h3 style="color: #4ade80;">Registration & Payment Confirmed!</h3>
        <p>Dear <strong>${registration.name}</strong>,</p>
        <p>Thank you for registering for <strong>Zentrix 2k26</strong>. Your ₹100 registration fee has been received and verified.</p>
        
        <div style="background-color: #111422; padding: 15px; border-radius: 12px; border: 1px solid #00f0ff; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Unique Pass Token:</strong> <span style="color: #00f0ff; font-size: 18px; font-weight: bold;">${registration.ticket_id}</span></p>
          <p style="margin: 5px 0;"><strong>College:</strong> ${registration.college}</p>
          <p style="margin: 5px 0;"><strong>Year of Study:</strong> ${registration.year}</p>
          <p style="margin: 5px 0;"><strong>Registered Events:</strong> ${eventsList}</p>
          <p style="margin: 5px 0;"><strong>Lunch Preference:</strong> ${registration.food}</p>
          <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹100</p>
        </div>

        <p style="font-size: 13px; color: #cccccc;">Please bring a screenshot or printout of your entry pass token on <strong>11th September 2026 at 8:30 AM</strong> at the T.J.S Engineering College campus registration counter.</p>
        <hr style="border-color: #333333; margin: 20px 0;" />
        <p style="font-size: 11px; text-align: center; color: #888888;">© 2026 Zentrix 2k26 • Department of Artificial Intelligence & Data Science • www.tjsec.in</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"Zentrix 2k26 Symposium" <no-reply@zentrix2k26.in>',
      to: registration.email,
      subject: `Registration Confirmed! Zentrix 2k26 Pass [${registration.ticket_id}]`,
      html: htmlContent
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`Email dispatched to ${registration.email}. Preview URL: ${previewUrl || 'Sent via SMTP'}`);
    return { success: true, previewUrl: previewUrl || null };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { success: false, error: err.message };
  }
}

// REST API Endpoints

// 1. Submit Registration with Payment Proof
app.post('/api/register', upload.single('paymentProof'), (req, res) => {
  const {
    name,
    email,
    phone,
    year,
    college,
    selectedEvents,
    food,
    paymentMethod,
    transactionId
  } = req.body;

  if (!name || !email || !phone || !college) {
    return res.status(400).json({ error: 'Missing mandatory registration fields.' });
  }

  const ticketId = `ZNTX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const paymentProofPath = req.file ? `/uploads/${req.file.filename}` : null;
  const eventsJson = typeof selectedEvents === 'string' ? selectedEvents : JSON.stringify(selectedEvents || []);

  const stmt = db.prepare(`
    INSERT INTO registrations (ticket_id, name, email, phone, year, college, selected_events, food, amount, payment_method, transaction_id, payment_proof)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 100, ?, ?, ?)
  `);

  stmt.run(
    [ticketId, name, email, phone, year, college, eventsJson, food || 'Veg', paymentMethod || 'UPI', transactionId || '', paymentProofPath],
    async function (err) {
      if (err) {
        console.error('SQL Error inserting registration:', err);
        return res.status(500).json({ error: 'Database error saving registration.' });
      }

      const registrationRecord = {
        id: this.lastID,
        ticket_id: ticketId,
        name,
        email,
        phone,
        year,
        college,
        selected_events: eventsJson,
        food,
        amount: 100,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        payment_proof: paymentProofPath,
        registered_at: new Date().toISOString()
      };

      // Send confirmation email
      const emailResult = await sendConfirmationEmail(registrationRecord);

      res.status(201).json({
        message: 'Registration saved to SQL database successfully!',
        registration: registrationRecord,
        emailStatus: emailResult
      });
    }
  );
  stmt.finalize();
});

// 2. Get All Registrations (For Admin Dashboard / View Registered Participants)
app.get('/api/registrations', (req, res) => {
  db.all('SELECT * FROM registrations ORDER BY registered_at DESC', [], (err, rows) => {
    if (err) {
      console.error('SQL Error fetching registrations:', err);
      return res.status(500).json({ error: 'Failed to fetch SQL registrations.' });
    }

    const formattedRows = rows.map(r => ({
      ...r,
      selected_events: JSON.parse(r.selected_events || '[]')
    }));

    res.json({
      total: formattedRows.length,
      registrations: formattedRows
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Zentrix 2k26 Express API Server running on port ${PORT}`);
});
