import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import axios from "axios";

const AuthContext =
  createContext();

const API_URL =
  "https://nexora-1e3z.onrender.com";

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "nexoraToken"
      );

    if (!token) {

      setLoading(false);

      return;

    }

    axios
      .get(
        `${API_URL}/auth/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )
      .then((response) => {

        setUser(
          response.data
        );

      })
      .catch(() => {

        localStorage.removeItem(
          "nexoraToken"
        );

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  const register =
    async (
      firstName,
      lastName,
      email,
      password
    ) => {

      try {

        await axios.post(
          `${API_URL}/auth/register`,
          {
            firstName,
            lastName,
            email,
            password
          }
        );

        return {
          success: true
        };

      } catch (error) {

        return {

          success: false,

          message:
            error.response?.data
              ?.message ||
            "Erreur lors de l'inscription."

        };

      }

    };

  const login =
    async (
      email,
      password
    ) => {

      try {

        const response =
          await axios.post(
            `${API_URL}/auth/login`,
            {
              email,
              password
            }
          );

        const {
          token,
          user
        } =
          response.data;

        localStorage.setItem(
          "nexoraToken",
          token
        );

        setUser(user);

       return {
        success: true,
        user
       };

      } catch (error) {

        return {

          success: false,

          message:
            error.response?.data
              ?.message ||
            "Email ou mot de passe incorrect."

        };

      }

    };

  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "nexoraToken"
    );

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(
    AuthContext
  );

}