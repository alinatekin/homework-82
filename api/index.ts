import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import artistsRouter from './routers/artists';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/spotify');
    console.log('Connected to MongoDB!');

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);