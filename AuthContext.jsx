import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("ez_user");
    return raw ? JSON.parse(raw) : null;
  });

  const loginWithGoogleIdToken = (idToken, profile) => {
    // Minimal profile; in production, validate the ID token on your server.
    const u = { email: profile.email, name: profile.name, picture: profile.picture, idToken };
    setUser(u);
    localStorage.setItem("ez_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ez_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, loginWithGoogleIdToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
