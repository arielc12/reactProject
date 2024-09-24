import axios from "axios";

// const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";
const apiUrl = "http://127.0.0.1:8181/users";

export const login = async (userLogin) => {
  try {
    const response = await axios.post(apiUrl + "/login", userLogin);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(apiUrl, normalizedUser);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (userId, token) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${userId}`,
      {
        headers: {
          'x-auth-token': token,
        }
      });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateUser = async (userId, token, updatedUser) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${userId}`, updatedUser, {
      headers: {
        'x-auth-token': token,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

