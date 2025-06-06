import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { fetchCategory } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";

export default function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId != itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const setAuthData = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
          setAuthData(token, role);
        }

        const response = await fetchCategory();
        const itemresponse = await fetchItems();

        setCategories(response.data);
        setItems(itemresponse.data);
        console.log(categories);
        console.log(items);
      } catch (error) {
        console.error("Failed to load data", error);
        // Optional: set error state or show notification
      }
    }

    loadData();
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
