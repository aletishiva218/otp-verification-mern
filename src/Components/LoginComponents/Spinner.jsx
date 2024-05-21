import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = (props) => {
    const theme = createTheme({
        palette: {
          primary: {
            main: orange[500],
          },
        },
      });
    return <div className="app-center back-transparent">
    <ThemeProvider theme={theme}>
      {" "}
      <CircularProgress />
    </ThemeProvider>
  </div>
}

export default Spinner;