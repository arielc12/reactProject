import React, { useEffect } from 'react'
import { useCurrentUser } from '../../users/providers/UserProvider'
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../forms/hooks/useForm';
import initialCardForm from '../helpers/initialForms/initialCardForm';
import CardSchema from '../models/CardSchema';
import useCards from '../hooks/useCards';
import ROUTES from '../../routes/routesModel';
import { Container } from '@mui/material';
import mapCardToModel from '../helpers/normalization/mapCardToModel';
import CardForm from '../components/CardForm';


export default function EditCardPage() {
    const { handleEdit, getCardById } = useCards();
    const { user } = useCurrentUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data,
        setData,
        errors,
        isFormValid,
        handleChange,
        handleReset,
        onSubmit, setIsFormValid, } = useForm(initialCardForm, CardSchema, () => {
            handleEdit(id, data)
        });

    useEffect(() => {
        (async () => {
            const cardData = await getCardById(id);
            if (!user || (user._id !== cardData.user_id)) {
                navigate(ROUTES.CARDS);
                return;
            }
            const modeledCard = mapCardToModel(cardData);
            setData(modeledCard);
            setIsFormValid(true);
        })();
    }, [id, user, getCardById, navigate, setData]);

    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <CardForm
                onSubmit={onSubmit}
                onReset={handleReset}
                isFormValid={isFormValid}
                title={"Edit card form"}
                errors={errors}
                data={data}
                onInputChange={handleChange} />

        </Container>
    )
}
