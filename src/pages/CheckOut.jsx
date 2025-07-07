import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import HeaderMessage from "../components/HeaderMessage";

const CheckOut = () => {
    const { cart, clearCart, total } = useCart();
    console.log("Carrello:", cart);
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
                const orderNumber = response.data.order_number;

                return axios
                    .post("http://127.0.0.1:3000/api/v1/send-email", {
                        type: "order",
                        email: billing.Email,
                        nome: billing.Nome,
                        cognome: billing.Cognome,
                        order_number: orderNumber,
                        products: cart.map((item) => ({
                            title: item.title,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        total: total.toFixed(2),
                })
                .then(() => {
                    setSuccess(true);
                    clearCart();
                    navigate("/ordersummary", { state: { order_number: orderNumber } });
                });
            })
            .catch((err) => {
                console.error("Errore API:", err.response?.data || err.message);
                setError("Si è verificato un errore durante il checkout. Riprova più tardi.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <HeaderMessage text="Checkout" />
            <div className="container mt-5">
                <div className="row">
                  <div className="col-md-6">
                    <h2>Riepilogo ordine</h2>
                    <ul className="list-group mb-3">
                      {cart.map((item) => (
                        <li className="list-group-item d-flex justify-content-between" key={item.id}>
                          <span>
                            {item.brand} {item.title} {item.model} x{item.quantity}
                          </span>
                          <span>€ {(item.price * item.quantity).toFixed(2)}</span>
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
                      {success && <div className="alert alert-success mt-3">Ordine effettuato con successo!</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                  </div>
                </div>
            </div>
        </>
    );
};
export default CheckOut;