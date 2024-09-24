import React from "react";
import { Typography } from "@mui/material";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";
import { useTheme } from "@emotion/react";

export default function Logo() {
  const theme = useTheme();
  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <Typography
          variant="h4"
          sx={{
            marginRight: 2,
            fontFamily: "fantasy",
            display: { xs: "inline-flex", md: "inline-flex" },
            color: theme.palette.mode === "dark" ? "white" : "black",
          }}
        >
          BCard
        </Typography>
      </NavBarLink>
    </>
  );
}
