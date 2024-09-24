import React from 'react'
import NavBarLink from './NavBarLink'
import { MenuItem } from '@mui/material'
import { makeFirstLetterCapital } from '../../forms/utils/algoMethods'
import { useTheme } from '@emotion/react';

export default function MenuLink({ text, navigateTo, onClick, styles }) {
    const theme = useTheme();
    return (
        <NavBarLink to={navigateTo}>
            <MenuItem sx={{ ...styles, color: theme.palette.mode === "dark" ? "white" : "black" }} onClick={onClick}>
                {makeFirstLetterCapital(text)}
            </MenuItem>
        </NavBarLink>
    );
};

