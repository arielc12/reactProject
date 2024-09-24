import React from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useTheme } from "@emotion/react";

export default function ErrorPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div>
      <PageHeader title="Error 404" subtitle="page not found" />

      <Button sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }} onClick={() => navigate(ROUTES.ROOT)}>Return to Home page</Button>

      <Link sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }} to={ROUTES.ROOT}>Home</Link>
    </div>
  );
}
