import React, { useContext } from "react";
import "./CartItems.css";
import AppContext from "../../context/AppContext";
export default function CartItems() {
  const { cartItems } = useContext(AppContext);
  console.log("From cart items component", cartItems);
  return <div>CartItems</div>;
}
