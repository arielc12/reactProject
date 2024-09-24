import React from 'react'
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

export default function Business() {
    const navigate = useNavigate();
    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction
                label="About"
                icon={<InfoIcon />}
                onClick={() => navigate(ROUTES.ABOUT)}
            />
            <BottomNavigationAction
                label="Favorites"
                icon={<FavoriteIcon />}
                onClick={() => navigate(ROUTES.FAV_CARDS)}
            />
            <BottomNavigationAction
                label="My Cards"
                icon={<PortraitIcon />}
                onClick={() => navigate(ROUTES.MY_CARDS)}
            />
        </BottomNavigation>
    )
}
