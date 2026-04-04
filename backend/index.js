require ('dotenv').config();
const express=require('express');
const cors=require('cors');
const db=require('./db');

const app=express();
app.use(cors());
app.use(express.json());

app.get('/api/exhibits', async (req, res) => {
  const [exhibits] = await db.query('SELECT * FROM exhibits');
  for (const exhibit of exhibits) {
    const [facts] = await db.query('SELECT label, value FROM exhibit_facts WHERE exhibit_id = ?', [exhibit.id]);
    exhibit.facts = facts;
  }
  res.json(exhibits);
});

app.get('/api/timeline', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM timeline_events ORDER BY sort_order');
  res.json(rows);
});

app.get('/api/tickets', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM ticket_types');
  res.json(rows);
});

app.post('/api/bookings', async (req, res) => {
  const { visit_date, items } = req.body;

  if (!visit_date || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const total = items.reduce((s, item) => s + item.unit_price * item.quantity, 0);

  const [result] = await db.query(
    'INSERT INTO bookings (visit_date, total_price, status) VALUES (?, ?, ?)',
    [visit_date, total, 'confirmed']
  );

  const bookingId = result.insertId;

  for (const item of items) {
    await db.query(
      'INSERT INTO booking_items (booking_id, ticket_type_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
      [bookingId, item.ticket_type_id, item.quantity, item.unit_price]
    );
  }

  res.json({ success: true, bookingId });
});

const PORT=process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));