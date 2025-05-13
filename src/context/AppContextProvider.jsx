import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { fetchCategory } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";

export default function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token") && localStorage.getItem("role")) {
        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("role")
        );
      }
      const response = await fetchCategory();
      const itemresponse = await fetchItems();
      setCategories(response.data);
      setItems(itemresponse.data);
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
    items,
    setItems,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
