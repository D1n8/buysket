import express from 'express';
import cors from 'cors';
import productRouter from './routes/ProductRoute.js';
import categoryRouter from './routes/CategoryRoute.js'
import path from 'path';
import router from './routes/CategoryRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.use('/static', express.static(path.join(process.cwd(), 'static')));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.use('/api', productRouter);
app.use('/api', categoryRouter)

app.listen(PORT, () => {
    console.log("Server working!");
    console.log(PORT)
})





