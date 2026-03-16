import express from 'express';
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import Artist from '../models/Artist';

const artistsRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, randomUUID() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

artistsRouter.post('/', upload.single('photo'), async (req, res) => {
    try {
        const artistData = {
            name: req.body.name,
            information: req.body.information,
            photo: req.file ? req.file.filename : null,
        };

        const artist = new Artist(artistData);
        await artist.save();

        res.send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (error) {
        res.sendStatus(500);
    }
});

export default artistsRouter;