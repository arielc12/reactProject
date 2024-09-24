import { useMediaQuery } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { Box } from '@mui/system';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import LeftMenu from './LeftMenu';


const MenuContext = createContext(null);

export default function LeftMenuProvider({ children }) {
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
                left="20px"
            ></Box>
            {anchorEl && (
                <LeftMenu
                    anchorEl={anchorEl}
                    isOpen={isOpen}
                    onClose={() => { setIsOpen(false) }}
                ></LeftMenu>
            )}
        </>
    );
};

export const useLeftMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useMenu must be used within a MenuProvider");
    return context;
};
