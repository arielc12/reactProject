import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, CardActions } from "@mui/material";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

export default function CardActionBar({
  card,
  cardId,
  handleDelete,
  handleLike
}) {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [isLiked, setIsLiked] = useState(false);
  const [isDialogOpen, setDialog] = useState(false);

  const handleDialog = term => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  }

  const handleDeleteCard = () => {
    handleDialog();
    handleDelete(cardId);
  }


  const handleLikeCard = async () => {
    setIsLiked(prev => !prev);
    await handleLike(cardId);
  };

  const handleCall = () => {
    if (card.phone) {
      window.location.href = `tel:${card.phone}`;
    } else {
      console.warn("Phone number is not provided");
    }
  };

  useEffect(() => {
    if (card && user && user._id) {
      setIsLiked(card.likes.includes(user._id));
    }
  }, [card, user]);



  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Box>
        {user && (user.isAdmin || user._id === card.user_id) && (
          <IconButton
            aria-label="delete card"
            onClick={() => handleDialog("open")}>
            <DeleteIcon />
          </IconButton>)}
        <CardDeleteDialog
          isDialogOpen={isDialogOpen}
          onChangeDialog={handleDialog}
          onDelete={handleDeleteCard} />

        {user && user._id === card.user_id &&
          <IconButton onClick={() => navigate(`${ROUTES.EDIT_CARD}/${card._id}`)}>
            <ModeEditIcon />
          </IconButton>}


      </Box>
      <Box>
        <IconButton onClick={handleCall}>
          <CallIcon />
        </IconButton>
        <IconButton onClick={handleLikeCard}>
          <FavoriteIcon color={isLiked ? "error" : "inherit"} />
        </IconButton>
      </Box>
    </CardActions>
  );
}
