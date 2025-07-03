import { use, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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

  function handleChange(e) {}

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
  }

  try {
    axios.post("http://127.0.0.1:3000/api/v1/orders", { billing, cart, total });
    setSuccess(true);
    clearCart();
    setLoading(false);
    navigate("/ordersummary");
  } catch (err) {
    setError(
      "Si è verificato un errore durante il checkout. Riprova più tardi."
    );
  } finally {
    setLoading(false);
  }

  if (cart.length === 0) {
    <div className="container text-center mt-5">
      <h3>Il carrello è vuoto</h3>
    </div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Dati di fatturazione</h2>
          </div>
        </div>
      </div>
    </>
  );
}
