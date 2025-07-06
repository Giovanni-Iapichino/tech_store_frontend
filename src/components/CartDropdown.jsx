import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartDropdown({ onClose }) {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0)
    return (
      <div className="cart-dropdown bg-white shadow p-3 mt-2 rounded cart-dropdown-animate">
        <p className="text-center">Il carrello è vuoto</p>
      </div>
    );

  if (location.pathname === "/cart") {
    return null;
  }

  return (
    <div className="cart-dropdown bg-white shadow p-3 mt-2 rounded cart-dropdown-animate">
      <h5 className="text-center">Il tuo Carrello</h5>
      <ul className="list-unstyled cart-dropdown-list">
        {cart.map((item) => (
          <li key={item.id} className="mb-2">
            <strong>{item.title}</strong> x {item.quantity}
            <br />
            <span>€ {(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.id)} className="btn btn-sm float-end">
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
