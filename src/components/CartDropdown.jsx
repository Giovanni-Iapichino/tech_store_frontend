import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../context/ToastContext";

export default function CartDropdown({ onClose }) {
  const { cart, removeFromCart, total } = useCart();
  const { showToast } = useToast();

  if (cart.length === 0)
    return (
      <div className="cart-dropdown bg-white shadow p-3 mt-2 rounded cart-dropdown-animate">
        <div className="float-end">
          <button onClick={onClose} className="btn btn-sm w-100">
            <FontAwesomeIcon icon={faXmark} style={{ color: "#be0909" }} />
          </button>
        </div>
        <p className="text-center">Il carrello è vuoto</p>
      </div>
    );

  if (location.pathname === "/cart") {
    return null;
  }

  return (
    <div className="cart-dropdown bg-white shadow p-3 mt-2 rounded cart-dropdown-animate">
      <div className="float-end">
        <button onClick={onClose} className="btn btn-sm w-100">
          <FontAwesomeIcon icon={faXmark} style={{ color: "#be0909" }} />
        </button>
      </div>
      <h5 className="text-center">Il tuo Carrello</h5>

      <ul className="list-unstyled cart-dropdown-list">
        {cart.map((item) => (
          <li key={item.id} className="mb-2">
            <strong>{item.title}</strong> x {item.quantity}
            <br />
            <span>
              €{" "}
              {item.promotion?.discount_price &&
              item.promotion.promo_state !== "futura" ? (
                <>
                  <strong style={{ color: "#be0909" }}>
                    €{parseFloat(item.promotion.discount_price).toFixed(2)}
                  </strong>
                  <br />
                  <small className="text-decoration-line-through text-muted">
                    €{parseFloat(item.price).toFixed(2)}
                  </small>
                </>
              ) : (
                <strong>€{parseFloat(item.price).toFixed(2)}</strong>
              )}
            </span>
            <button
              onClick={() => {
                removeFromCart(item.id);
                showToast("Prodotto rimosso dal carrello");
              }}
              className="btn btn-sm float-end"
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: "#be0909" }} />
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <p>Totale: € {total.toFixed(2)}</p>
      <Link to="/cart" className="btn btn-orange w-100" onClick={onClose}>
        Vai al carrello
      </Link>
    </div>
  );
}
