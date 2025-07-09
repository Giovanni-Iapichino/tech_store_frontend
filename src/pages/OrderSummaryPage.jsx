import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderSummaryPage() {
  const location = useLocation();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(location.state?.order_number);

  useEffect(() => {
    const payload = {
      user_name: "Thomas",
      user_lastname: "Raimondi",
      user_email: "thomas.raimondi14@gmail.com",
      user_city: "Milano",
      user_country: "Italia",
      user_address: "Via Roma 1",
      user_postalcode: "20100",
      total: 100,
      productList: cart,
    };

    axios
      .post("http://127.0.0.1:3000/api/v1/orders", payload)
      .then((response) => {
        const orderNumber = response.data.order_number;
        setOrderNumber(orderNumber); // Aggiorniamo lo state con l'orderNumber ricevuto dall'API

        // Ora procediamo con la seconda chiamata API solo dopo aver ottenuto l'orderNumber
        return axios.post("http://127.0.0.1:3000/api/v1/send-email", {
          type: "order",
          email: "thomas.raimondi14@gmail.com",
          nome: "Thomas",
          cognome: "Raimondi",
          order_number: orderNumber,
          products: cart.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.promotion?.discount_price && item.promotion.promo_state !== "futura" ? item.promotion.discount_price : item.price,
          })),
          total: 100,
        });
      })
      .then(() => {
        setSuccess(true);
        clearCart();
      })
      .catch((err) => {
        console.error("Errore API:", err.response?.data || err.message);
        setError("Si è verificato un errore durante il checkout. Riprova più tardi.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Grazie per il tuo ordine!</h2>
      {orderNumber && (
        <div className="alert alert-success">
          Il tuo numero d'ordine è: <strong>{orderNumber}</strong>
        </div>
      )}
      <h4>A breve riceverai una email di conferma!</h4>
      <Link to="/shop" className="btn btn-orange mt-3">
        Torna allo shop
      </Link>
    </div>
  );
}
