import { Container, Typography} from "@mui/material";
import { Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import Albums from "./features/albums/Albums.tsx";
import Tracks from "./features/tracks/Tracks.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";

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
                      <Route path="*" element={<Typography variant="h4" textAlign="center">Not Found</Typography>}/>
                  </Routes>
              </Container>
          </main>
      </>
  )
};

export default App
