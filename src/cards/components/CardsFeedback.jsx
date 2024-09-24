import React from "react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { Typography } from "@mui/material";
import Cards from "./Cards";
import { useTheme } from "@emotion/react";

export default function CardsFeedback({
  isLoading,
  cards,
  error,
  handleDelete,
  handleLike,
  handleEdit,
}) {
  const theme = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && cards.length === 0)
    return (
      <Typography m={2} sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}>
        Oops... it seems there are no business cards to display
      </Typography>
    );

  if (cards)
    return (
      <Cards
        cards={cards}
        handleDelete={handleDelete}
        handleLike={handleLike}
        handleEdit={handleEdit}
      />
    );

  return null;
}
