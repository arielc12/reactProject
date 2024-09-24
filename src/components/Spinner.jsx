import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";

const Spinner = ({ size = 40, height = "50vh" }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: { height },
      }}
    >
      <CircularProgress
        size={size}
        sx={{ alignSelf: "center", color: theme.palette.mode === "dark" ? "white" : "black" }}
      />
    </Box>
  );
};

export default Spinner;
