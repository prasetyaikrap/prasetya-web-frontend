import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "utils/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  //Check current user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  //Login Handler
  async function login(email, password) {
    let response = {};
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      response = {
        status: "OK",
      };
    } catch (error) {
      response = {
        status: error.code,
      };
    }
    return response;
  }

  //Logout Handler
  async function logout() {
    await signOut(auth);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
