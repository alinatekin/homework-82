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
        await db.dropCollection('trackhistories');
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
        { name: 'Come Together', album: abbeyRoad._id, trackNumber: 1, duration: '4:19', youtubeLink: 'https://www.youtube.com/watch?v=45cYwDMibGo' },
        { name: 'Something', album: abbeyRoad._id, trackNumber: 2, duration: '3:02', youtubeLink: 'https://www.youtube.com/watch?v=UelDrZ1aFeY' },
        { name: 'Maxwell\'s Silver Hammer', album: abbeyRoad._id, trackNumber: 3, duration: '3:27', youtubeLink: 'https://www.youtube.com/watch?v=mJag19WoAe0&list=RDmJag19WoAe0&start_radio=1' },
        { name: 'Oh! Darling', album: abbeyRoad._id, trackNumber: 4, duration: '3:27', youtubeLink: 'https://www.youtube.com/watch?v=9BznFjbcBVs&list=RD9BznFjbcBVs&start_radio=1' },
        { name: 'Octopus\'s Garden', album: abbeyRoad._id, trackNumber: 5, duration: '2:51', youtubeLink: 'https://www.youtube.com/watch?v=De1LCQvbqV4' },

        { name: 'Two of Us', album: letItBe._id, trackNumber: 1, duration: '3:36', youtubeLink: 'https://www.youtube.com/watch?v=cLQox8e9688&list=RDcLQox8e9688&start_radio=1' },
        { name: 'Dig a Pony', album: letItBe._id, trackNumber: 2, duration: '3:54', youtubeLink: 'https://www.youtube.com/watch?v=LpdJE7HG8Ls&list=RDLpdJE7HG8Ls&start_radio=1' },
        { name: 'Across the Universe', album: letItBe._id, trackNumber: 3, duration: '3:48', youtubeLink: 'https://www.youtube.com/watch?v=90M60PzmxEE&list=RD90M60PzmxEE&start_radio=1' },
        { name: 'I Me Mine', album: letItBe._id, trackNumber: 4, duration: '2:25', youtubeLink: 'https://www.youtube.com/watch?v=seqaTuXkqFI&list=RDseqaTuXkqFI&start_radio=1' },
        { name: 'Dig It', album: letItBe._id, trackNumber: 5, duration: '0:50', youtubeLink: 'https://www.youtube.com/watch?v=fUUOX6kAIxI&list=RDfUUOX6kAIxI&start_radio=1' },

        { name: 'Death on Two Legs', album: aNightAtTheOpera._id, trackNumber: 1, duration: '3:43', youtubeLink: 'https://www.youtube.com/watch?v=kqVpk0qxmfA&list=RDkqVpk0qxmfA&start_radio=1' },
        { name: 'Lazing on a Sunday Afternoon', album: aNightAtTheOpera._id, trackNumber: 2, duration: '1:07', youtubeLink: 'https://www.youtube.com/watch?v=OU6EyXcFBxA&list=RDOU6EyXcFBxA&start_radio=1' },
        { name: 'I\'m in Love with My Car', album: aNightAtTheOpera._id, trackNumber: 3, duration: '3:05', youtubeLink: 'https://www.youtube.com/watch?v=oaEM4JYFPfw&list=RDoaEM4JYFPfw&start_radio=1' },
        { name: 'You\'re My Best Friend', album: aNightAtTheOpera._id, trackNumber: 4, duration: '2:52', youtubeLink: 'https://www.youtube.com/watch?v=HaZpZQG2z10&list=RDHaZpZQG2z10&start_radio=1' },
        { name: 'Bohemian Rhapsody', album: aNightAtTheOpera._id, trackNumber: 5, duration: '5:55', youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' },

        { name: 'Play the Game', album: theGame._id, trackNumber: 1, duration: '3:30', youtubeLink: 'https://www.youtube.com/watch?v=6_5O-nUiZ_0' },
        { name: 'Dragon Attack', album: theGame._id, trackNumber: 2, duration: '4:18', youtubeLink: 'https://www.youtube.com/watch?v=spm5-SXo4Do&list=RDspm5-SXo4Do&start_radio=1' },
        { name: 'Another One Bites the Dust', album: theGame._id, trackNumber: 3, duration: '3:35', youtubeLink: 'https://www.youtube.com/watch?v=eqyUAtzS_6M' },
        { name: 'Need Your Loving Tonight', album: theGame._id, trackNumber: 4, duration: '2:50', youtubeLink: 'https://www.youtube.com/watch?v=af4bbLeZvLA&list=RDaf4bbLeZvLA&start_radio=1' },
        { name: 'Crazy Little Thing Called Love', album: theGame._id, trackNumber: 5, duration: '2:42', youtubeLink: 'https://www.youtube.com/watch?v=zO6D_BAuYCI&list=RDzO6D_BAuYCI&start_radio=1' },
    ]);

    console.log('Fixtures loaded successfully!');
    await mongoose.connection.close();
};

run().catch(console.error);