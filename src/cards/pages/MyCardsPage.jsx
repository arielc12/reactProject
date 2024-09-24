import React, { useCallback, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Container, Fab } from "@mui/material";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import { useCurrentUser } from "../../users/providers/UserProvider";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";


export default function MyCardsPage() {
  const { filteredCards, error, isLoading, GetMyCards, handleDelete, handleLike } =
    useCards();

  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.CARDS);
  }, [user]);

  useEffect(() => {
    GetMyCards();
  }, [GetMyCards]);

  const onDeleteCard = useCallback(async (cardId) => {
    await handleDelete(cardId);
    await GetMyCards();
  }, [handleDelete]);

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader title={"My cards"} subtitle={"Welcome to my cards page"} />{" "}
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
};
