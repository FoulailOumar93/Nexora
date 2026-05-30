import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const savedUser =
      localStorage.getItem("nexoraUser");

    if (savedUser) {

      setUser(JSON.parse(savedUser));

    }

  }, []);

  const login = (email) => {

    const fakeUser = {
      name: "Oumar",
      email
    };

    setUser(fakeUser);

    localStorage.setItem(
      "nexoraUser",
      JSON.stringify(fakeUser)
    );

  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("nexoraUser");

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export function useAuth() {
  return useContext(AuthContext);
}