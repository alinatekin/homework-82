import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Box,
    IconButton,
    Dialog,
    DialogTitle, DialogContent
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {fetchTracks, type Track} from './tracksThunks';
import { selectTracks, selectTracksFetching } from './tracksSlice';
import {selectUser} from "../users/usersSlice.ts";
import {addTrackToHistory} from "../trackHistory/trackHistoryThunks.ts";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

const Tracks = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isFetching = useAppSelector(selectTracksFetching);
    const user = useAppSelector(selectUser);

    const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchTracks(id));
    }, [dispatch, id]);

    const albumName = tracks.length > 0 ? tracks[0].album.name : 'Album Tracks';

    const handlePlay = async (track: Track) => {
        await dispatch(addTrackToHistory(track._id));

        if (track.youtubeLink) {
            const match = track.youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
            if (match) {
                setPlayingVideoUrl(`https://www.youtube.com/embed/${match[1]}?autoplay=1`);
            }
        }
    };

    const handleCloseVideo = () => {
        setPlayingVideoUrl(null);
    };

    return (
        <>
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

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {track.duration}
                                </Typography>

                                {user && (
                                    <IconButton onClick={() => handlePlay(track)} color="primary" size="large">
                                        <PlayArrowIcon fontSize="inherit" />
                                    </IconButton>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>

    <Dialog
        open={Boolean(playingVideoUrl)}
        onClose={handleCloseVideo}
        maxWidth="md"
        fullWidth
    >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Now Playing
            <IconButton onClick={handleCloseVideo}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '60vh' }}>
            {playingVideoUrl && (
                <iframe
                    width="100%"
                    height="100%"
                    src={playingVideoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </DialogContent>
    </Dialog>
</>
    );
};

export default Tracks;