import express from 'express';
import Track from '../models/Track';
import Album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res) => {
    try {
        const trackData = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new Track(trackData);
        await track.save();

        res.send(track);
    } catch (error) {
        res.status(400).send(error);
    }
});

tracksRouter.get('/', async (req, res) => {
    try {
        let query = {};

        if (req.query.album) {
            query = { album: req.query.album };
        }

        if (req.query.artist) {
            const albums = await Album.find({ artist: req.query.artist });
            const albumIds = albums.map(album => album._id);
            query = { album: { $in: albumIds } };
        }

        const tracks = await Track.find(query).populate('album', 'name year');
        res.send(tracks);
    } catch (error) {
        res.sendStatus(500);
    }
});

export default tracksRouter;