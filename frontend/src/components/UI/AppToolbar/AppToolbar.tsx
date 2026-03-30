import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
                        Music Catalog 🎵
                    </Typography>

                    <Grid>
                        {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;