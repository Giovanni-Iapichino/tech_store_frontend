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

  function handleChange(e) {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  }

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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  name="Nome"
                  type="text"
                  onChange={handleChange}
                  value={billing.Nome}
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Cognome</label>
                <input
                  name="Cognome"
                  type="text"
                  onChange={handleChange}
                  value={billing.Cognome}
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="Email"
                  type="email"
                  onChange={handleChange}
                  value={billing.Email}
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Città</label>
                <input
                  name="Città"
                  type="text"
                  onChange={handleChange}
                  value={billing.Città}
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Nazione</label>
                <input
                  name="Nazione"
                  type="text"
                  onChange={handleChange}
                  value={billing.Nazione}
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Indirizzo</label>
                <input
                  name="Indirizzo"
                  type="text"
                  onChange={handleChange}
                  value={billing.Indirizzo}
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">CAP</label>
                <input
                  name="CAP"
                  type="text"
                  onChange={handleChange}
                  value={billing.CAP}
                  className="form-control"
                  required
                ></input>
              </div>

              <button
                type="submit"
                className="btn btn-orange"
                disabled={loading}
              >
                {loading ? "Invio in corso..." : "Procedi al pagamento"}
              </button>
              {success && (
                <div className="alert alert-success mt-3">
                  Ordine effettuato con successo!
                </div>
              )}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
