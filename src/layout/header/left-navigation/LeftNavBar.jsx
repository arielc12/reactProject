import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ROUTES from "../../../routes/routesModel";
import LogoIcon from "../logo/LogoIcon";
import Logo from "../logo/Logo";
import { useLeftMenu } from "../menu/LeftMenuProvider";
import MenuIcon from '@mui/icons-material/Menu';

export default function LeftNavBar() {
  const setOpen = useLeftMenu();
  return (
    <Box sx={{
      alignItems: "center",
      display: "inline-flex"
    }}>

      <Tooltip title="menu">
        <IconButton sx={{ p: 0, display: "inline-flex", marginLeft: 2 }} onClick={() => setOpen(true)}>
          <MenuIcon alt="Menu Icon" />
        </IconButton>
      </Tooltip>
      <LogoIcon />
      <Logo to={ROUTES.CARDS} />

    </Box>
  );
}
