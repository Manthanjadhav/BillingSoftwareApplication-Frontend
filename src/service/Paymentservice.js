import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1.0/payments";

export const createRazerPayOrder = async (data) => {
  return axios.post(`${API_BASE_URL}/create_order`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const verifyPayment = async (paymentData) => {
  return axios.post(`${API_BASE_URL}/verify`, paymentData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
