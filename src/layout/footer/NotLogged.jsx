import React from 'react'
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

export default function NotLogged() {
    const navigate = useNavigate();
    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction
                label="About"
                icon={<InfoIcon />}
                onClick={() => navigate(ROUTES.ABOUT)}
            />
        </BottomNavigation>
    )
}
