import { useTheme } from "@emotion/react";
import { Divider, Typography } from "@mui/material";
import React from "react";

export default function PageHeader({ title, subtitle }) {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h2" component="h1" sx={{
        color: theme.palette.mode === "dark" ? "white" : "black",
      }}>
        {title}
      </Typography>
      <Typography variant="h5" component="h2" sx={{
        color: theme.palette.mode === "dark" ? "white" : "black",
      }}>
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
