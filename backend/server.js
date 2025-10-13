import express, { json } from 'express';
import pool from './db.js';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.get('/products', async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows)
    } catch (error){
        console.log(error)
        res.status(500).json({error: "Ошибка получения товаров"})
    }
})

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products(name, price) VALUES($1, $2) RETURNING *',
            [name, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка добавления товара' });
    }
});


app.listen(PORT, () => {
    console.log("Server working!");
    console.log(PORT)
})