import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  SwitchHorizontalIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";

interface Props {
  file: File | null;
}

const AreaTextInput = ({ file }: Props) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [convertionType, setConversionType] = useState("json");

  useEffect(() => {
    if (file) {
      const getFileText = async () => {
        const text = await file?.text();
        const type = file.name.split(".")[1].toLowerCase();

        if (type === "json") setConversionType("json");
        if (type === "csv") setConversionType("csv");

        setError("");
        setInput(text!);
      };
      getFileText();
    }
  }, [file]);

  const jsonToCsv = () => {
    if (!input.trim().length) {
      setError("JSON input is empty.");
      return;
    }
    try {
      const json: [object] = JSON.parse(input);
      let result = Object.keys(json[0]).join(";");

      Object.values(json).forEach(obj => {
        result += "\n" + Object.values(obj).join(";");
      });
      setResult(result);
    } catch (error) {
      setError("JSON input is not valid.");
      return;
    }
  };

  const csvToJson = () => {
    if (!input.trim().length) {
      setError("CSV input is empty.");
      return;
    }
    const entryValues = input.split("\r");
    const keys = entryValues[0].split(";");

    const result: Object[] = [];

    entryValues.forEach((value, index) => {
      if (index === 0) return;
      const values = value.split(";");

      let object = {};
      keys.forEach((key, index) => {
        object = {
          ...object,
          [key]: values[index].replace(/(\r\n|\n|\r)/gm, ""),
        };
      });
      result.push(object);
    });

    setResult(JSON.stringify(result));
  };

  const converter = () => {
    if (convertionType === "json") return jsonToCsv();
    if (convertionType === "csv") return csvToJson();
  };

  const handleConversionChange = () => {
    if (convertionType === "json") {
      setConversionType("csv");
    } else {
      setConversionType("json");
    }
  };

  const clearTextBoxes = () => {
    setInput("");
    setResult("");
    setError("");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sm={5.5}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography
              variant="h3"
              fontSize={16}
              fontWeight="bold"
              gutterBottom
            >
              {convertionType.toUpperCase()}:
            </Typography>
            <TextField
              multiline
              minRows={15}
              maxRows={15}
              fullWidth
              placeholder="Input..."
              error={!!error}
              onChange={e => {
                setInput(e.target.value);
                setError("");
              }}
              value={input}
            />
            {error && (
              <Alert
                sx={{ position: "fixed", bottom: 10, right: 20 }}
                severity="error"
              >
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item direction="column" container sm={1} alignItems="center">
        <Grid item>
          <Button variant="text" onClick={handleConversionChange}>
            <SwitchHorizontalIcon className="h-auto w-8 text-slate-600" />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" onClick={converter} disabled={!!error}>
            <CheckIcon className="h-auto w-8 text-emerald-500" />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" onClick={clearTextBoxes}>
            <XIcon className="h-auto w-8 text-rose-600" />
          </Button>
        </Grid>
      </Grid>
      <Grid item sm={5.5}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography
              variant="h3"
              fontSize={16}
              fontWeight="bold"
              gutterBottom
            >
              Result:
            </Typography>
            <TextField
              multiline
              minRows={15}
              maxRows={15}
              fullWidth
              placeholder="Output..."
              disabled={!result}
              onChange={e => setResult(e.target.value)}
              value={result}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AreaTextInput;
