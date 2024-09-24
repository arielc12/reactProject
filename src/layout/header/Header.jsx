import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavbar from "./right-navigation/RightNavbar";
import MenuProvider from "./menu/MenuProvider";
import LeftMenuProvider from "./menu/LeftMenuProvider";

export default function Header() {
  return (
    <MenuProvider>
      <LeftMenuProvider>
        <AppBar position="sticky" color="primary" elevation={10}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <LeftNavBar />
            <RightNavbar />
          </Toolbar>
        </AppBar>
      </LeftMenuProvider>
    </MenuProvider>
  );
}
