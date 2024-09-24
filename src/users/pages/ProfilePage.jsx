import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Avatar, Box, CircularProgress } from "@mui/material";
import { useCurrentUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import { useTheme } from "@emotion/react";
import Spinner from "../../components/Spinner";

export default function ProfilePage() {
    const { user } = useCurrentUser();
    const { handleGetUserById, isLoading, handleLogout } = useUsers();
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                await handleGetUserById(id);
            }
            if (user) {
                const modeledUser = mapUserToModel(user);
                setProfile(modeledUser);
            } else {
                navigate(ROUTES.LOGIN);
            }
        };

        fetchUser();
    }, [id, handleGetUserById, navigate]);

    if (isLoading) {
        return <Spinner size={60} height="100vh" />;
    }

    return (
        <Container >
            {profile ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Avatar
                        src={profile.avatarUrl || "/images/default-avatar.png"}
                        alt={profile.avatarAlt}
                        sx={{ mt: 4, width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }} >
                        {`${profile.first} ${profile.middle} ${profile.last}`}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {profile.email}
                    </Typography>
                    {profile.phone && (
                        <Typography variant="body1" color="textSecondary" paragraph>
                            Phone: {profile.phone}
                        </Typography>
                    )}
                    {profile.street && profile.houseNumber && profile.city && profile.country && (
                        <Typography variant="body1" color="textSecondary" paragraph>
                            Address: {`${profile.street} ${profile.houseNumber}, ${profile.city}, ${profile.country}`}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`${ROUTES.EDIT_USER}/${user._id}`)}
                        sx={{ mt: 2 }}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLogout}
                        sx={{ mt: 2 }}
                    >
                        Log Out
                    </Button>
                </Box>
            ) : (
                <Typography variant="h6" color="textSecondary">
                    Loading profile...
                </Typography>
            )}
        </Container>
    );
}