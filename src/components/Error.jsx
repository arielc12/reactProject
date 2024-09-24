import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

const Error = ({ errorMessage }) => {
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }} variant="h5" >
            Oops... something went wrong: {errorMessage}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            width="100%"
            src="/images/broken-robot-error.png"
            alt="broken robot"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;
