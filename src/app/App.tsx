import React from "react";
import "../css/app.css";
import Container from "@mui/material/Container";
import { Box, Button, Stack, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h4"}>
            Create React App on Typescript with REDUX
          </Typography>
        </Box>
        <Button variant="contained">CONTAINED</Button>
      </Stack>
    </Container>
  );
}

export default App;
