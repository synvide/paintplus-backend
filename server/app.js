import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import busboyBodyParser from 'busboy-body-parser';
import connectDB from './db/index';
import { PORT } from './constants';
import ActivateRoutes from './routes';

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(busboyBodyParser());
ActivateRoutes(app);
app.use(cookieParser());

app.get('/', (_, res) => {
    res.send('<h1>Paint Plus Development Server</h1>');
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
