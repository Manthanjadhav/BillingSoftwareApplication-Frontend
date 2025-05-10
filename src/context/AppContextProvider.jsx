import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { fetchCategory } from "../service/CategoryService";

export default function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function loadData() {
      const response = await fetchCategory();
      setCategories(response.data);
    }
    loadData();
  }, []);
  const contextValue = {
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
