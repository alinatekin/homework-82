import { useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from './artistsThunks';
import { selectArtists, selectArtistsFetching } from './artistsSlice';

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isFetching = useAppSelector(selectArtistsFetching);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Grid container spacing={3}>
            {isFetching ? (
                <Grid size={{ xs:12 }} textAlign="center">
                    <CircularProgress />
                </Grid>
            ) : (
                artists.map(artist => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={artist._id}>
                        <Card component={Link} to={`/artists/${artist._id}`} sx={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={artist.photo ? `http://localhost:8000/images/${artist.photo}` : 'https://via.placeholder.com/250'}
                                alt={artist.name}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div" textAlign="center">
                                    {artist.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default Artists;