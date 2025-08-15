import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context";
import axios from "axios";
import { useState } from "react";
const userapi = "http://localhost:3000/users";

export function AuthProvider({ children }) {
  const[state,setState]=useState("")
  const navigate = useNavigate();


  const register = (data) => {
  const check = validateForm(data.email, data.password);
  console.log(check);

  if (check) {
    axios.post(userapi, data)
      .then((res) => {
        console.log("User registered:", res.data);
        navigate("/login"); 
      })
      .catch((err) => {
        console.error("Error registering user:", err);
      });
  } else {
    console.log("Invalid email or password");
  }
};



  const login = async (formData) => {
    console.log(formData);

    const check = validateForm(formData.email, formData.password);
    console.log(check);

    if (check) {
      try {
        const response = await axios.get(
          `${userapi}?email=${formData.email}&password=${formData.password}`
        );
        console.log(response.data);

        if (response.data.length > 0) {
          console.log("Login successful ✅");
          navigate("/"); 
          // navigate("/dashboard"); // If you want to redirect after login
        } else {
          setState("Error")
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  

  function validateForm(email, password) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) && password.length >= 8) {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ register, login,state }}>
      {children}
    </AuthContext.Provider>
  );
}
