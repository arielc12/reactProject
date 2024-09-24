import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialEditProfileForm from "../helpers/initialForms/initialEditProfileForm";
import editProfileSchema from "../models/editProfileSchema";
import { Container } from "@mui/material";
import useUsers from "../hooks/useUsers";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import EditProfileForm from "../components/EditProfileForm";

export default function EditProfilePage() {
    const { handleGetUserById, handleUpdateUser } = useUsers();
    const { user } = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);

    const {
        data,
        setData,
        errors,
        handleChange,
        handleReset,
        isFormValid,
        onSubmit,
        setIsFormValid,
    } = useForm(initialEditProfileForm, editProfileSchema, async (updatedUser) => {
        if (user) await handleUpdateUser(user._id, updatedUser);
    });

    useEffect(() => {
        const fetchAndInitializeUserData = async () => {
            setIsLoading(true);
            let profile;
            try {
                if (user && user._id) {
                    profile = await handleGetUserById(user._id);
                }
                const mappedUserData = mapUserToModel(profile);
                setData(mappedUserData);
                setIsFormValid(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndInitializeUserData();
    }, [handleGetUserById]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <EditProfileForm
                onSubmit={onSubmit}
                onReset={handleReset}
                isFormValid={isFormValid}
                title={"Edit Profile"}
                errors={errors}
                data={data}
                onInputChange={handleChange}
            />
        </Container>
    );
}