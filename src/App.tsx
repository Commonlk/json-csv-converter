import { AppBar, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import AreaTextInput from "./features/areaTextInput/AreaTextInput";
import FormFileInput from "./features/formFileInput/FormFileInput";

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <AppBar
        position="relative"
        color="transparent"
        sx={{ mb: 2, p: 1, boxShadow: "none" }}
      >
        <Typography variant="h6">Converter</Typography>
      </AppBar>
      <Container>
        <FormFileInput setFile={setFile} />
        <AreaTextInput file={file} />
      </Container>
    </>
  );
}

export default App;
