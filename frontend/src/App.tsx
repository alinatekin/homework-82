import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {Link, Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";

const App = () => {

  return (
      <>
          <header>
              <AppBar position="static" sx={{mb: 4}}>
                  <Toolbar>
                      <Typography variant="h6" component={Link} to="/" sx={{color: 'inherit', textDecoration: 'none'}}>
                          Music Catalog 🎵
                      </Typography>
                  </Toolbar>
              </AppBar>
          </header>
          <main>
              <Container>
                  <Routes>
                      <Route path="/" element={<Artists/>}/>
                      <Route path="*" element={<Typography variant="h4" textAlign="center">Not Found</Typography>}/>
                  </Routes>
              </Container>
          </main>
      </>
  )
};

export default App
