import { useContext, useState } from "react";
import "./CartSummary.css";
import AppContext from "../../context/AppContext";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";
import { createOrder, deleteOrder } from "../../service/OrderService";
import toast from "react-hot-toast";
import { AppConstants } from "../../Util/constants";
import {
  createRazerPayOrder,
  verifyPayment,
} from "../../service/Paymentservice";

export default function CartSummary({
  customerName,
  mobileNumber,
  setMobileNumber,
  setCustomerName,
}) {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const tax = totalAmount * 0.1;

  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js"; // ✅ Use the correct versioned URL
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName.trim() || customerName.trim().length < 3) {
      toast.error("Customer name must be at least 3 characters long!");
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileNumber.trim() || !mobileRegex.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number!");
      return;
    }

    if (cartItems.length == 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName: customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subTotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);
    try {
      const response = await createOrder(orderData);
      const savedData = response.data;
      if (response.status == 201 && paymentMode == "cash") {
        toast.success("Cash received");
        setOrderDetails(savedData);
      } else if (response.status == 201 && paymentMode == "upi") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error("Unable to load razorpay");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        const razorpayResponse = await createRazerPayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          name: "Retail Shop",
          description: "Order payment",
          order_id: razorpayResponse.data.id,
          handler: async function (response) {
            console.log("Razorpay Response:", response);
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (response) => {
          console.error(response.error);
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment Failed");
        });
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status == 200) {
        toast.success("Payment Successfull");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error("Payment processing failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

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
          <button
            className="btn btn-success flex-grow-1"
            onClick={() => completePayment("cash")}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Cash"}
          </button>
          <button
            className="btn btn-primary flex-grow-1"
            onClick={() => completePayment("upi")}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Upi"}
          </button>
        </div>
        <div className="d-flex gap-3 mt-1">
          <button
            className="btn btn-warning flex-grow-1"
            onClick={placeOrder}
            disabled={isProcessing || !orderDetails}
          >
            Place Order
          </button>
          <div>
            {showPopup && (
              <ReceiptPopup
                orderDetails={{
                  ...orderDetails,
                  razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
                  razorpayPaymentId:
                    orderDetails.paymentDetails?.razorpayPaymentId,
                }}
                onClose={() => setShowPopup(false)}
                onPrint={handlePrintReceipt}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
