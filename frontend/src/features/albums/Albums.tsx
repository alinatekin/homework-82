import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from './albumsThunks';
import { selectAlbums, selectAlbumsFetching } from './albumsSlice';

const Albums = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const isFetching = useAppSelector(selectAlbumsFetching);

    useEffect(() => {
        dispatch(fetchAlbums(id));
    }, [dispatch, id]);

    const artistName = albums.length > 0 ? albums[0].artist.name : 'Unknown Artist';

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    {artistName}'s Albums
                </Typography>
            </Grid>

            {isFetching ? (
                <Grid size={{ xs: 12 }} textAlign="center">
                    <CircularProgress />
                </Grid>
            ) : albums.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">No albums found.</Typography>
                </Grid>
            ) : (
                albums.map(album => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={album._id}>
                        <Card component={Link} to={`/albums/${album._id}`} sx={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={album.image ? `http://localhost:8000/images/${album.image}` : 'https://via.placeholder.com/250'}
                                alt={album.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {album.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Released: {album.year}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default Albums;