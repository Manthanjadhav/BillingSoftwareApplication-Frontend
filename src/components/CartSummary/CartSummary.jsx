import { useContext } from "react";
import "./CartSummary.css";
import AppContext from "../../context/AppContext";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";

export default function CartSummary({
  customerName,
  mobileNumber,
  setMobileNumber,
  setCustomerName,
}) {
  const { cartItems } = useContext(AppContext);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.1;

  const grandTotal = totalAmount + tax;
  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-light">Item:</span>
          <span className="text-light">&#8377;{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span className="text-light">Tax (10%):</span>
          <span className="text-light">&#8377;{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span className="text-light">GrandTotal:</span>
          <span className="text-light">&#8377;{grandTotal.toFixed(2)}</span>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-success flex-grow-1">Cash</button>
          <button className="btn btn-primary flex-grow-1">Upi</button>
        </div>
        <div className="d-flex gap-3 mt-1">
          <button className="btn btn-warning flex-grow-1">Place Order</button>
        </div>
      </div>
    </div>
  );
}
