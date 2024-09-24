import { useMediaQuery } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { Box } from '@mui/system';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Menu from './Menu';


const MenuContext = createContext(null);

export default function MenuProvider({ children }) {
  const theme = createTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpen, setIsOpen] = useState(true);
  const [anchorEl, setAnchor] = useState(null)
  const anchorRef = useRef();
  useEffect(() => {
    setAnchor(anchorRef.current);
  }, []);
  useEffect(() => {
    setIsOpen(false)
  }, [screenSize]);
  return (
    <>
      <MenuContext.Provider value={setIsOpen}>{children}</MenuContext.Provider>
      <Box
        ref={anchorRef}
        component="span"
        position="fixed"
        top="70px"
        right="20px"
      ></Box>
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          isOpen={isOpen}
          onClose={() => { setIsOpen(false) }}
        ></Menu>
      )}
    </>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
};
