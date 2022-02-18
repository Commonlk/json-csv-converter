import { Alert, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FormFileInput = ({ setFile }: Props) => {
  const [error, setError] = useState(false);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    hiddenFileInput.current!.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileUploaded = e.target.files[0];
      const type = fileUploaded.name.split(".")[1].toLowerCase();

      if (type === "json" || type === "csv") {
        setFile(fileUploaded);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  return (
    <Grid container mb={2} columnSpacing={1} alignItems="center">
      <Grid item>
        <Typography variant="h6" fontSize={16} display="inline" mr={2}>
          Select a file to convert, JSON or CSV:
        </Typography>
        <input
          className="hidden"
          type="file"
          onChange={e => handleChange(e)}
          ref={hiddenFileInput}
          name="file"
          id="file"
        />
        <ButtonGroup>
          <Button size="small" onClick={e => handleClick(e)} variant="outlined">
            Select
          </Button>
          <Button size="small" variant="contained" type="submit">
            Confirm
          </Button>
        </ButtonGroup>
      </Grid>
      {error && (
        <Grid item>
          <Alert
            severity="error"
            sx={{ position: "fixed", bottom: 10, right: 20 }}
          >
            Invalid file type, only JSON or CSV accepted.
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default FormFileInput;
