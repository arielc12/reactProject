import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import { getUserById, login, signup, updateUser } from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeUser from "../helpers/normalization/normalizeUser";
import normalizedUserForEdit from "../helpers/normalization/normalizedUserForEdit";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { setUser, setToken, token } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();

  const handleGetUserById = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const userData = await getUserById(userId, token);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);



  const handleLogin = useCallback(async (userLogin) => {
    setIsLoading(true);
    try {
      const token = await login(userLogin);
      setTokenInLocalStorage(token);
      setToken(token);
      setUser(getUser());
      navigate(ROUTES.CARDS);
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
    navigate(ROUTES.CARDS);
  }, [setUser])

  const handleSignup = useCallback(async (user) => {
    setIsLoading(true);
    try {
      const normalizedUser = normalizeUser(user);
      await signup(normalizedUser);
      await handleLogin({ email: user.email, password: user.password });
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [handleLogin])

  const handleUpdateUser = useCallback(async (userId, updatedUser) => {
    setIsLoading(true);
    try {
      const normalizedUser = normalizedUserForEdit(updatedUser);
      await updateUser(userId, token, normalizedUser);
      setSnack("success", "user updated");
      navigate(`${ROUTES.USER_PROFILE}/${userId}`);
      setUser(getUser());
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, setUser]);

  return {
    isLoading,
    error,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUserById,
    handleUpdateUser,
  };
}
