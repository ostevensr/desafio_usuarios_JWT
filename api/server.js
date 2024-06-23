import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import postsRouter from './routes/users.routes.js'

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', postsRouter);

app.listen(PORT, () => {
    console.log(`Servidor Arriba http://localhost:${PORT}`)
});
