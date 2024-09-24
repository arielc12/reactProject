import { useCallback, useEffect, useState } from "react";
import { useSnack } from "../../providers/SnackbarProvider";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import { handleCreate, handleDeleteCard, handleGetAllCards, handleGetCardById, handleLikeCard, handleUpdateCard } from "../services/cardsApiService";


export default function useCards() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [filteredCards, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setSnack = useSnack();
  const { user, token } = useCurrentUser();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (cards) {
      setFilter(
        cards.filter(card => card.title.includes(query) || String(card.bizNumber).includes(query))
      );
    }
  }, [cards, query]);

  const getAllCards = useCallback(async () => {
    try {
      let data = await handleGetAllCards();
      setCards(data);
      setSnack("success", "All cards are here!");
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

  }, []);

  const getCardById = useCallback(async (id) => {
    try {
      const data = await handleGetCardById(id);
      setCard(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const GetFavCards = useCallback(async () => {
    try {
      const cards = await getAllCards();
      const favCards = cards.filter(
        card => !!card.likes.find(id => id === user._id)
      );
      setCards(favCards);
      return favCards;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const GetMyCards = useCallback(async () => {
    try {
      const cards = await getAllCards();
      const myCards = cards.filter(card => card.user_id === user._id);
      setCards(myCards);
      return myCards;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user, getAllCards]);

  const handleDelete = useCallback(async (cardId) => {
    try {
      const data = await handleDeleteCard(cardId, token);
      setSnack("success", "Card deleted!");
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  const handleEdit = useCallback(async (cardId, card) => {
    setIsLoading(true);
    try {
      const normalizedCard = normalizeCard(card);
      const response = await handleUpdateCard(cardId, normalizedCard, token);
      setSnack("success", "Card edited!");

      navigate(ROUTES.MY_CARDS);
      return response;
    } catch (err) {
      setSnack("error", `Failed to edit card: ${err.message}`);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, normalizeCard, handleUpdateCard]);

  const handleLike = useCallback(async (cardId) => {
    try {
      const data = await handleLikeCard(cardId, token);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  const handleCreateCard = useCallback(async (card) => {
    setIsLoading(true);
    try {
      const normalizedCard = normalizeCard(card);
      const data = await handleCreate(normalizedCard, token);
      setSnack("success", "New card created!");
      navigate(ROUTES.MY_CARDS);
      return data;
    } catch (err) {
      setSnack("error", `Failed to create card: ${err.message}`);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, token]);

  return {
    filteredCards,
    cards,
    card,
    error,
    isLoading,
    getAllCards,
    getCardById,
    handleDelete,
    handleLike,
    handleEdit,
    GetFavCards,
    GetMyCards,
    handleCreateCard,
  };
}
