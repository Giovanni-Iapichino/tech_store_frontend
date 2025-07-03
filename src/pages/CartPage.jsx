import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowLeft,
  faCartShopping,
  faCircleCheck,
  faBrush,
} from "@fortawesome/free-solid-svg-icons";
import HeaderMessage from "../components/HeaderMessage";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0)
    return (
      <div className="container text-center mt-5">
        <h3 className="mb-3">
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ color: "#ff6543" }}
            className="me-2"
          />
          Il tuo carrello è vuoto
        </h3>
        <Link to="/shop" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Torna allo Shop
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
       <div className="mb-4">
              <HeaderMessage text="Cart" />
            </div>
      <h2 className="mb-4">
        <FontAwesomeIcon
          icon={faCartShopping}
          style={{ color: "#ff6543" }}
          className="me-2"
        />
        Il tuo Carrello
      </h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="custom-thead text-center">
            <tr>
              <th>Prodotto</th>
              <th>Dettagli</th>
              <th style={{ width: "120px" }}>Quantità</th>
              <th>Totale</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} ${item.model}`}
                    className="img-thumbnail"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <strong>
                    {item.brand.toUpperCase()} {item.title} {item.model}
                  </strong>
                  <br />
                  {item.ram} / {item.memory}
                  <br />
                  {item.operating_system} - {item.megapixel}
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="form-control text-center"
                  />
                </td>
                <td>
                  <strong>€{(item.price * item.quantity).toFixed(2)}</strong>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-4" />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h4 className="mb-3 mb-md-0">
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ color: "#ff6543" }}
            className="me-2"
          />
          Totale: €{total.toFixed(2)}
        </h4>
        <div>
          <Link to="/shop" className="btn btn-orange me-2 mb-2 mb-md-0">
            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
            Continua gli acquisti
          </Link>
          <button
            className="btn btn-orange me-2 mb-2 mb-md-0"
            onClick={clearCart}
          >
            <FontAwesomeIcon icon={faBrush} className="me-1" />
            Svuota carrello
          </button>
          <Link to="/checkout" className="btn btn-orange">
            <FontAwesomeIcon icon={faCircleCheck} className="me-1" />
            Procedi al checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
