import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { fetchCategory } from "../service/CategoryService";

export default function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  useEffect(() => {
    async function loadData() {
      const response = await fetchCategory();
      setCategories(response.data);
    }
    loadData();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
