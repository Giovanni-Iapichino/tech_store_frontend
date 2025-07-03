import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderMessage from "../components/HeaderMessage";

export default function CheckOutPage() {
  const { cart, clearCart, total } = useCart();
  const [billing, setBilling] = useState({
    Nome: "",
    Cognome: "",
    Email: "",
    Città: "",
    Nazione: "",
    Indirizzo: "",
    CAP: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = {
      user_name: billing.Nome,
      user_lastname: billing.Cognome,
      user_email: billing.Email,
      user_city: billing.Città,
      user_country: billing.Nazione,
      user_address: billing.Indirizzo,
      user_postalcode: billing.CAP,
      total,
      productList: cart,
    };

    axios
      .post("http://127.0.0.1:3000/api/v1/orders", payload)
      .then((response) => {
        setSuccess(true);
        clearCart();
        setLoading(false);
        navigate("/ordersummary", {
          state: { order_number: response.data.order_number },
        });
      })
      .catch((err) => {
        console.error("Errore API:", err.response?.data || err.message);
        setError(
          "Si è verificato un errore durante il checkout. Riprova più tardi."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>Il carrello è vuoto</h3>
      </div>
    );
  }

  return (
    <>
      <main>
        <h1 className="my-5">CheckOutPage</h1>
      </main>
    </>
  );
}
