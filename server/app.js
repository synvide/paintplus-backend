import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import busboyBodyParser from 'busboy-body-parser';
import connectDB from './db/index';
import { PORT, NODE_ENV } from './constants';
import ActivateRoutes from './routes';

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(busboyBodyParser());
ActivateRoutes(app);
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (_, res) => {
    res.send(`<h1>Paint Plus ${NODE_ENV} Server</h1>`);
});

const port = PORT || 3001;
try {
    app.listen(port, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log('Error while running server', error);
}

export default app;
