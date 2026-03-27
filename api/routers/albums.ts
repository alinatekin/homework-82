import express from 'express';
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import Album from '../models/Album';
import Track from "../models/Track";

const albumsRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, randomUUID() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

albumsRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const albumData = {
            name: req.body.name,
            artist: req.body.artist,
            year: parseInt(req.body.year),
            image: req.file ? req.file.filename : null,
        };

        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (error) {
        res.status(400).send(error);
    }
});

albumsRouter.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.artist) {
            query = { artist: req.query.artist };
        }

        const albums = await Album.find(query).populate('artist', 'name information').sort({ year: -1 });

        const albumsWithTrackCount = await Promise.all(
            albums.map(async (album) => {
                const trackCount = await Track.countDocuments({ album: album._id });

                return {
                    ...album.toObject(),
                    trackCount
                };
            })
        );

        res.send(albumsWithTrackCount);
    } catch (error) {
        res.sendStatus(500);
    }
});

albumsRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');

        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }

        res.send(album);
    } catch (error) {
        res.sendStatus(500);
    }
});

export default albumsRouter;