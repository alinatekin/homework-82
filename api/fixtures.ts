import mongoose from 'mongoose';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/spotify');
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    console.log('Creating artists...');
    const beatles = await Artist.create({
        name: 'The Beatles',
        information: 'Legendary rock band from Liverpool.',
        photo: 'beatles.jpg',
    });

    const queen = await Artist.create({
        name: 'Queen',
        information: 'British rock band formed in London in 1970.',
        photo: 'queen.jpg',
    });

    console.log('Creating albums...');
    const abbeyRoad = await Album.create({
        name: 'Abbey Road',
        artist: beatles._id,
        year: 1969,
        image: 'abbey_road.jpg',
    });
    const letItBe = await Album.create({
        name: 'Let It Be',
        artist: beatles._id,
        year: 1970,
        image: 'let_it_be.jpg',
    });
    const aNightAtTheOpera = await Album.create({
        name: 'A Night at the Opera',
        artist: queen._id,
        year: 1975,
        image: 'night_opera.jpg',
    });
    const theGame = await Album.create({
        name: 'The Game',
        artist: queen._id,
        year: 1980,
        image: 'the_game.jpg',
    });

    console.log('Creating tracks...');
    await Track.create([
        { name: 'Come Together', album: abbeyRoad._id, trackNumber: 1, duration: '4:19' },
        { name: 'Something', album: abbeyRoad._id, trackNumber: 2, duration: '3:02' },
        { name: 'Maxwell\'s Silver Hammer', album: abbeyRoad._id, trackNumber: 3, duration: '3:27' },
        { name: 'Oh! Darling', album: abbeyRoad._id, trackNumber: 4, duration: '3:27' },
        { name: 'Octopus\'s Garden', album: abbeyRoad._id, trackNumber: 5, duration: '2:51' },

        { name: 'Two of Us', album: letItBe._id, trackNumber: 1, duration: '3:36' },
        { name: 'Dig a Pony', album: letItBe._id, trackNumber: 2, duration: '3:54' },
        { name: 'Across the Universe', album: letItBe._id, trackNumber: 3, duration: '3:48' },
        { name: 'I Me Mine', album: letItBe._id, trackNumber: 4, duration: '2:25' },
        { name: 'Dig It', album: letItBe._id, trackNumber: 5, duration: '0:50' },

        { name: 'Death on Two Legs', album: aNightAtTheOpera._id, trackNumber: 1, duration: '3:43' },
        { name: 'Lazing on a Sunday Afternoon', album: aNightAtTheOpera._id, trackNumber: 2, duration: '1:07' },
        { name: 'I\'m in Love with My Car', album: aNightAtTheOpera._id, trackNumber: 3, duration: '3:05' },
        { name: 'You\'re My Best Friend', album: aNightAtTheOpera._id, trackNumber: 4, duration: '2:52' },
        { name: 'Bohemian Rhapsody', album: aNightAtTheOpera._id, trackNumber: 5, duration: '5:55' },

        { name: 'Play the Game', album: theGame._id, trackNumber: 1, duration: '3:30' },
        { name: 'Dragon Attack', album: theGame._id, trackNumber: 2, duration: '4:18' },
        { name: 'Another One Bites the Dust', album: theGame._id, trackNumber: 3, duration: '3:35' },
        { name: 'Need Your Loving Tonight', album: theGame._id, trackNumber: 4, duration: '2:50' },
        { name: 'Crazy Little Thing Called Love', album: theGame._id, trackNumber: 5, duration: '2:42' },
    ]);

    console.log('Fixtures loaded successfully!');
    await mongoose.connection.close();
};

run().catch(console.error);