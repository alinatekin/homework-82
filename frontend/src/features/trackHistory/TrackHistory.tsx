import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHistory } from './trackHistoryThunks';
import { selectTrackHistory, selectTrackHistoryFetching } from './trackHistorySlice';
import { selectUser } from '../users/usersSlice';

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const history = useAppSelector(selectTrackHistory);
    const isFetching = useAppSelector(selectTrackHistoryFetching);

    useEffect(() => {
        if (user) {
            dispatch(fetchHistory());
        }
    }, [dispatch, user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Track History
                </Typography>
            </Grid>

            {isFetching ? (
                <Grid size={{ xs: 12 }} textAlign="center">
                    <CircularProgress />
                </Grid>
            ) : history.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Your history is empty. Go listen to some music!</Typography>
                </Grid>
            ) : (
                history.map(item => (
                    <Grid size={{ xs: 12 }} key={item._id}>
                        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    {item.artist.name} — {item.track.name}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {new Date(item.datetime).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default TrackHistory;