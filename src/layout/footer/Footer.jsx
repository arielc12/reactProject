import React from "react";
import { Paper } from "@mui/material";
import { useCurrentUser } from "../../users/providers/UserProvider";
import NotLogged from "./NotLogged";
import Logged from "./Looged";
import Business from "./Business";

export default function Footer() {
  const { user } = useCurrentUser();

  return (
    <Paper
      elevation={3}
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
    >
      {!user && <NotLogged />}
      {user && !user.isAdmin && !user.isBusiness && <Logged />}
      {user && (user.isAdmin || user.isBusiness) && <Business />}
    </Paper>
  );
}
