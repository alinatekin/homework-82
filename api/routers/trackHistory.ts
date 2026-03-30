import express from 'express';
import TrackHistory from '../models/TrackHistory';
import User from '../models/User';
import Track from "../models/Track";
import Album from "../models/Album";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            return res.status(401).send({ error: 'No token present' });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        const track = await Track.findById(req.body.track);
        if (!track) {
            return res.status(404).send({ error: 'Track not found' });
        }

        const album = await Album.findById(track.album);
        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: track._id,
            artist: album.artist,
            datetime: new Date()
        });

        await trackHistory.save();

        return res.send(trackHistory);
    } catch (error) {
        return next(error);
    }
});

trackHistoryRouter.get('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            return res.status(401).send({ error: 'No token present' });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        const history = await TrackHistory.find({ user: user._id })
            .sort({ datetime: -1 })
            .populate('track', 'name')
            .populate('artist', 'name');

        return res.send(history);
    } catch (error) {
        return next(error);
    }
});

export default trackHistoryRouter;