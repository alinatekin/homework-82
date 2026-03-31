import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Typography, CircularProgress, Card, CardContent, Box, IconButton} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracks } from './tracksThunks';
import { selectTracks, selectTracksFetching } from './tracksSlice';
import {selectUser} from "../users/usersSlice.ts";
import {addTrackToHistory} from "../trackHistory/trackHistoryThunks.ts";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Tracks = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isFetching = useAppSelector(selectTracksFetching);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchTracks(id));
    }, [dispatch, id]);

    const albumName = tracks.length > 0 ? tracks[0].album.name : 'Album Tracks';

    const handlePlay = async (trackId: string) => {
        await dispatch(addTrackToHistory(trackId));
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    {albumName}
                </Typography>
            </Grid>

            {isFetching ? (
                <Grid size={{ xs: 12 }} textAlign="center">
                    <CircularProgress />
                </Grid>
            ) : tracks.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">No tracks found in this album.</Typography>
                </Grid>
            ) : (
                tracks.map(track => (
                    <Grid size={{ xs: 12 }} key={track._id}>
                        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', '&:last-child': { pb: 2 } }}>
                                <Typography variant="h6" color="text.secondary" sx={{ minWidth: '30px' }}>
                                    {track.trackNumber}.
                                </Typography>
                                <Typography variant="h6">
                                    {track.name}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {track.duration}
                                </Typography>
                            </CardContent>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {track.duration}
                                </Typography>

                                {user && (
                                    <IconButton onClick={() => handlePlay(track._id)} color="primary" size="large">
                                        <PlayArrowIcon fontSize="inherit" />
                                    </IconButton>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default Tracks;