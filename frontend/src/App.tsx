import { Container, Typography} from "@mui/material";
import { Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import Albums from "./features/albums/Albums.tsx";
import Tracks from "./features/tracks/Tracks.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import TrackHistory from "./features/trackHistory/TrackHistory.tsx";

const App = () => {

  return (
      <>
          <header>
              <AppToolbar />
          </header>
          <main>
              <Container>
                  <Routes>
                      <Route path="/" element={<Artists/>}/>
                      <Route path="/artists/:id" element={<Albums />}/>
                      <Route path="/albums/:id" element={<Tracks />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/track_history" element={<TrackHistory />} />
                      <Route path="*" element={<Typography variant="h4" textAlign="center">Not Found</Typography>}/>
                  </Routes>
              </Container>
          </main>
      </>
  )
};

export default App
