require ('dotenv').config();
const express=require('express');
const cors=require('cors');
const db=require('./db');

const app=express();
app.use(cors());
app.use(express.json());

app.get('/api/test', async(req,res)=>{
    const [rows]=await db.query('SELECT 1+1 AS result');
    res.json(rows);
})

const PORT=process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));