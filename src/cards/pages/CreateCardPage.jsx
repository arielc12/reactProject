import React, { useEffect } from 'react'
import CardSchema from '../models/CardSchema';
import initialCardForm from '../helpers/initialForms/initialCardForm';
import CardForm from '../components/CardForm';
import useForm from '../../forms/hooks/useForm';
import { Container } from '@mui/material';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import useCards from '../hooks/useCards';

export default function CreateCardPage() {
  const { handleCreateCard } = useCards();
  const {
    data,
    errors,
    handleChange,
    handleReset,
    onSubmit,
    isFormValid,
  } = useForm(initialCardForm, CardSchema, handleCreateCard);
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || (user && !user.isBusiness && !user.isAdmin)) navigate(ROUTES.CARDS);
  }, [user]);
  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        onSubmit={onSubmit}
        onReset={handleReset}
        isFormValid={isFormValid}
        title={"create card form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
      />
    </Container>
  )
}
