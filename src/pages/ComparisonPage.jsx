import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ComparisonPage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [showCartActions, setShowCartActions] = useState({});

  if (compareList.length === 0)
    return (
      <div className="container">
        <p>Nessun prodotto selezionato per il confronto.</p>
        <Link className="btn btn-warning mt-4" to="/shop">
          Torna allo Shop
        </Link>
      </div>
    );

  const EXCLUDED_KEYS = [
    "id",
    "title",
    "thumbnail",
    "create_at",
    "update_at",
    "description",
    "slug",
  ];

  const allKeys = Array.from(
    new Set(compareList.flatMap((product) => Object.keys(product)))
  ).filter((key) => !EXCLUDED_KEYS.includes(key));

  // Trova la quantità di un prodotto nel carrello
  const getCartQuantity = (productId) => {
    const item = cart.find((c) => c.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container">
      <h1 className="my-4">Confronto Prodotti</h1>
      <div className="d-flex gap-3 overflow-auto">
        {compareList.map((product) => {
          const cartQty = getCartQuantity(product.id);
          return (
            <div
              className="card p-3 shadow"
              key={product.id}
              style={{ minWidth: "300px" }}
            >
              <h5>{product.title}</h5>
              {/* Visualizza tutte le info tranne quelle escluse */}
              {allKeys.map((key) => (
                <div key={key}>
                  <span style={{ fontWeight: 600 }}>
                    {key.replace(/_/g, " ")}:
                  </span>{" "}
                  {String(product[key])}
                </div>
              ))}
              <div className="d-flex justify-content-center gap-2 mt-2">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCompare(product.id)}
                  title="Rimuovi dal confronto"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  title="Gestisci carrello"
                  style={{ color: "#ff6543", borderColor: "#ff6543" }}
                  onClick={() =>
                    setShowCartActions((prev) => ({
                      ...prev,
                      [product.id]: !prev[product.id],
                    }))
                  }
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </div>
              {showCartActions[product.id] && (
                <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    style={{ borderRadius: "50%", width: 32, height: 32, padding: 0, fontSize: "1.1rem" }}
                    onClick={() => {
                      if (cartQty > 1) {
                        updateQuantity(product.id, cartQty - 1);
                      } else if (cartQty === 1) {
                        removeFromCart(product.id);
                      }
                    }}
                    disabled={cartQty === 0}
                    title="Rimuovi uno"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span style={{ minWidth: 28, textAlign: "center", fontWeight: 600 }}>
                    {cartQty}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    style={{ borderRadius: "50%", width: 32, height: 32, padding: 0, fontSize: "1.1rem" }}
                    onClick={() => addToCart(product)}
                    title="Aggiungi uno"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="btn btn-warning mt-4" onClick={clearCompare}>
        Svuota confronto
      </button>
    </div>
  );
}
