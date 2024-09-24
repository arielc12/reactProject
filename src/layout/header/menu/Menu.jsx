import React from 'react'
import { useCurrentUser } from '../../../users/providers/UserProvider'
import useUsers from '../../../users/hooks/useUsers';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import MenuLink from '../../../routes/components/MenuLink';
import ROUTES from '../../../routes/routesModel';

export default function Menu({ isOpen, anchorEl, onClose }) {
    const { user } = useCurrentUser();
    const { handleLogout } = useUsers();
    const onLogout = () => {
        handleLogout();
        onClose();
    };
    return (
        <MuiMenu
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Box>
                {!user && (
                    <>
                        <MenuLink
                            text="login"
                            navigateTo={ROUTES.LOGIN}
                            onClick={onClose}
                        />
                        <MenuLink
                            text="signup"
                            navigateTo={ROUTES.SIGNUP}
                            onClick={onClose}
                        />
                    </>
                )}
                {user && (
                    <>
                        <MenuLink
                            text="profile"
                            navigateTo={`${ROUTES.USER_PROFILE}/${user._id}`}
                            onClick={onClose} />
                        <MenuLink
                            text="edit account"
                            navigateTo={ROUTES.EDIT_USER}
                            onClick={onClose}
                            styles={{ display: "none" }} />
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </>
                )}

            </Box>


        </MuiMenu>
    )
}
