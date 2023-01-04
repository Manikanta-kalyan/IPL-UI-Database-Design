import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import AddDetails from './pages/AddDetails';
import Home from './pages/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Box textAlign="center" fontSize="xl">
        <Router>
          <div>
            <nav>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  width: '100%',
                  justifyContent: 'center',
                  color: 'green',
                }}
              >
                <div>
                  <Link to="/">Home</Link>
                </div>
                <div>
                  <Link to="/add-details">Add Details</Link>
                </div>
              </div>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="add-details" element={<AddDetails />} />
            </Routes>
          </div>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
