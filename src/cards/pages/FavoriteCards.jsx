import React, { useCallback, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Container, Fab } from "@mui/material";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../users/providers/UserProvider";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../../routes/routesModel";


export default function FavoriteCards() {
  const { filteredCards, error, isLoading, handleDelete, handleLike, GetFavCards } =
    useCards();
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.CARDS);
  }, [user]);

  useEffect(() => {
    GetFavCards();
  }, [GetFavCards]);

  const onDeleteCard = useCallback(async (cardId) => {
    await handleDelete(cardId);
    await GetFavCards();
  }, [handleDelete]);
  const changeLikeStatus = useCallback(async (cardId) => {
    await handleLike(cardId);
    await GetFavCards();
  }, [handleLike]);
  return (
    <Container>
      <PageHeader
        title={"Favorite cards"}
        subtitle={"Welcome to favorite cards page"}
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
        handleLike={changeLikeStatus}
      />
    </Container>
  );
}
