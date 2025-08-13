import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
    const data = await res.json();
    if (data.length > 0) {
      setUser(data[0]);
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const register = async (name, email, password) => {
    const res = await fetch(`http://localhost:3001/users?email=${email}`);
    const exists = await res.json();
    if (exists.length > 0) {
      alert("User already exists");
      return;
    }

    await fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
