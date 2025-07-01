import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0)
    return (
      <div className="container mt-4">
        <h4>Il carrello è vuoto</h4>
        <Link to="/shop" className="btn btn-primary">
          Torna allo Shop
        </Link>
      </div>
    );

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Il tuo Carrello</h2>
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Prodotto</th>
              <th>Dettagli</th>
              <th>Quantità</th>
              <th>Totale</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td></td>
                <td>
                  <strong>
                    {item.brand.toUpperCase()} {item.title} {item.model}
                  </strong>
                  <br />
                  {item.ram} / {item.memory}
                  <br />
                  {item.operating_system}
                  <br />
                  {item.megapixel}
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="form-control w-50 mx-auto"
                  />
                </td>
                <td>€{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Rimuovi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4>Totale carrello: €{total.toFixed(2)}</h4>
          <div>
            <Link to="/shop" className="btn btn-outline-secondary me-2">
              ← Continua gli acquisti
            </Link>
            <button className="btn btn-danger me-2" onClick={clearCart}>
              Svuota carrello
            </button>
            <Link to="/checkout" className="btn btn-success">
              Procedi al checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
