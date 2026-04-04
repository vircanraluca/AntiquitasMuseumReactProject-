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


const PORT=process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));