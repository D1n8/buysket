import express from 'express';
import cors from 'cors';
import productRouter from './routes/ProductRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/static', express.static(path.join(process.cwd(), 'static')));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.use('/api', productRouter);

app.listen(PORT, () => {
    console.log("Server working!");
    console.log(PORT)
})



// app.delete('/products/:id', async (req, res) => {
//     try {
//         const result = await pool.query(
//             `DELETE FROM products WHERE id=($1)`, [q]
//         )
//         res.status(201).json(res.rows)
//     } catch (error) {
//         res.status(500).json({ error: "Ошибка удаления" })
//     }
// })

