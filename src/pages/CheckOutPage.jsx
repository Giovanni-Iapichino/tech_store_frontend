import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderMessage from "../components/HeaderMessage";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CheckOutPage() {
  const { slug } = useParams();
  const { cart, clearCart, total, setCart } = useCart();
  console.log("Carrello:", cart);
  const filteredCart = cart.filter((item) => item.slug === slug);
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
      productList: slug ? filteredCart : cart,
    };

    localStorage.setItem("order", JSON.stringify(payload));
    localStorage.setItem("slug", slug || false);

    const createPricePromises = slug
      ? filteredCart.map((item) => {
          return axios
            .post("http://127.0.0.1:3000/api/v1/payment/create-price", {
              product_data: { name: item.title, metadata: { slug: item.slug } },
              unit_amount: item.promotion ? item.promotion.discount_price * 100 : item.price * 100,
              currency: "eur",
            })
            .then((response) => {
              console.log(response.data);
              return {
                price: response.data.id,
                quantity: item.quantity,
              };
            });
        })
      : cart.map((item) => {
          return axios
            .post("http://127.0.0.1:3000/api/v1/payment/create-price", {
              product_data: { name: item.title, metadata: { slug: item.slug } },
              unit_amount: item.promotion ? item.promotion.discount_price * 100 : item.price * 100,
              currency: "eur",
            })
            .then((response) => {
              console.log(response.data);
              return {
                price: response.data.id,
                quantity: item.quantity,
              };
            });
        });

    // Aspetta che tutte le Promise vengano risolte
    Promise.all(createPricePromises)
      .then((price_list) => {
        console.log(price_list);

        // Ora fai la chiamata per creare la sessione di checkout
        return axios.post("http://127.0.0.1:3000/api/v1/payment/create-checkout-session", price_list);
      })
      .then((response) => {
        console.log("Checkout session created:", response.data);
        window.location.href = response.data.url;
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        setError("Errore durante il processo di pagamento. Riprova.");
        setLoading(false);
      });
  }

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>Il carrello è vuoto</h3>
        <Link to="/shop" className="btn btn-orange">
          {/* <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> */}
          Torna allo shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <HeaderMessage text="Checkout" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Riepilogo ordine</h2>
            <ul className="list-group mb-3">
              {slug
                ? filteredCart.map((item) => (
                    <li className="list-group-item d-flex justify-content-between" key={item.id}>
                      <span>
                        {item.brand} {item.title} {item.model} x{item.quantity}
                      </span>
                      <span>
                        {" "}
                        {item.promotion?.discount_price && item.promotion.promo_state !== "futura" ? (
                          <>
                            <strong style={{ color: "#be0909" }}>€{(parseFloat(item.promotion.discount_price) * item.quantity).toFixed(2)}</strong>
                            <br />
                            <small className="text-decoration-line-through text-muted">€{parseFloat(item.price * item.quantity).toFixed(2)}</small>
                          </>
                        ) : (
                          <strong>€{parseFloat(item.price * item.quantity).toFixed(2)}</strong>
                        )}
                      </span>
                    </li>
                  ))
                : cart.map((item) => (
                    <li className="list-group-item d-flex justify-content-between" key={item.id}>
                      <span>
                        {item.brand} {item.title} {item.model} x{item.quantity}
                      </span>
                      <span>
                        {" "}
                        {item.promotion?.discount_price && item.promotion.promo_state !== "futura" ? (
                          <>
                            <strong style={{ color: "#be0909" }}>€{(parseFloat(item.promotion.discount_price) * item.quantity).toFixed(2)}</strong>
                            <br />
                            <small className="text-decoration-line-through text-muted">€{parseFloat(item.price * item.quantity).toFixed(2)}</small>
                          </>
                        ) : (
                          <strong>€{parseFloat(item.price * item.quantity).toFixed(2)}</strong>
                        )}
                      </span>
                    </li>
                  ))}

              <li className="list-group-item d-flex justify-content-between">
                <strong>Totale</strong>
                <strong>€ {total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2>Dati di fatturazione</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input name="Nome" type="text" onChange={handleChange} value={billing.Nome} className="form-control" required></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Cognome</label>
                <input name="Cognome" type="text" onChange={handleChange} value={billing.Cognome} className="form-control" required></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="Email" type="email" onChange={handleChange} value={billing.Email} className="form-control" required></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Città</label>
                <input name="Città" type="text" onChange={handleChange} value={billing.Città} className="form-control" required></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Nazione</label>
                <input name="Nazione" type="text" onChange={handleChange} value={billing.Nazione} className="form-control" required></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Indirizzo</label>
                <input name="Indirizzo" type="text" onChange={handleChange} value={billing.Indirizzo} className="form-control" required></input>
              </div>

              <div className="mb-3">
                <label className="form-label">CAP</label>
                <input name="CAP" type="text" onChange={handleChange} value={billing.CAP} className="form-control" required></input>
              </div>

              <button type="submit" className="btn btn-orange" disabled={loading}>
                {loading ? "Invio in corso..." : "Procedi al pagamento"}
              </button>
              {/* {success && <div className="alert alert-success mt-3">Ordine effettuato con successo!</div>} */}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
