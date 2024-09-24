import React from 'react'
import { useCurrentUser } from '../../../users/providers/UserProvider'
import MuiMenu from '@mui/material/Menu';
import { Box } from '@mui/material';
import MenuLink from '../../../routes/components/MenuLink';
import ROUTES from '../../../routes/routesModel';

export default function LeftMenu({ isOpen, anchorEl, onClose }) {
    const { user } = useCurrentUser();
    return (
        <MuiMenu
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <Box>
                {!user && (
                    <>
                        <MenuLink
                            text="About"
                            navigateTo={ROUTES.ABOUT}
                            onClick={onClose}
                        />
                    </>
                )}
                {user && !user.isAdmin && !user.isBusiness && (
                    <>
                        <MenuLink
                            text="About"
                            navigateTo={ROUTES.ABOUT}
                            onClick={onClose}
                        />
                        <MenuLink
                            text="Favorites"
                            navigateTo={ROUTES.FAV_CARDS}
                            onClick={onClose}
                        />
                    </>
                )}
                {user && !user.isAdmin && user.isBusiness && (
                    <>
                        <MenuLink
                            text="About"
                            navigateTo={ROUTES.ABOUT}
                            onClick={onClose}
                        />
                        <MenuLink
                            text="Favorites"
                            navigateTo={ROUTES.FAV_CARDS}
                            onClick={onClose}
                        />
                        <MenuLink
                            text="My cards"
                            navigateTo={ROUTES.MY_CARDS}
                            onClick={onClose} />
                    </>
                )}
                {user && user.isAdmin && (
                    <>
                        <MenuLink
                            text="About"
                            navigateTo={ROUTES.ABOUT}
                            onClick={onClose}
                        />
                        <MenuLink
                            text="Favorites"
                            navigateTo={ROUTES.FAV_CARDS}
                            onClick={onClose}
                        />
                        <MenuLink
                            text="My cards"
                            navigateTo={ROUTES.MY_CARDS}
                            onClick={onClose} />
                        <MenuLink
                            text="Sandbox"
                            navigateTo={ROUTES.SANDBOX}
                            onClick={onClose} />
                    </>
                )}
            </Box>


        </MuiMenu>
    )
}
