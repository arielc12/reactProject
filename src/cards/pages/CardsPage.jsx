import React, { useCallback, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import { Container, Fab } from "@mui/material";
import { useCurrentUser } from "../../users/providers/UserProvider";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";



export default function CardsPage() {
  const { error, isLoading, filteredCards, getAllCards, handleDelete, handleLike } =
    useCards();
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  const onDeleteCard = useCallback(async (cardId) => {
    await handleDelete(cardId);
    await getAllCards();
  }, [handleDelete]);

  return (
    <Container>

      <PageHeader
        title="Cards"
        subtitle="On this page you can find all bussines cards from all categories"
      />{" "}
      {user && (user.isBusiness || user.isAdmin) && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 70,
            right: 16,
            zIndex: 1000,
          }}>
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        cards={filteredCards}
        isLoading={isLoading}
        error={error}
        handleDelete={onDeleteCard}
        handleLike={handleLike}
      />
    </Container>
  );
}
