import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function BestSellerCard({ product }) {
  const { addToCart, cart, removeFromCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsInCart(cart.some((item) => item.id === product.id));
  }, [cart, product.id]);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  return (
    <div
      className="best-seller-showcase-card d-flex border rounded-4 shadow-sm bg-white px-3 py-2 position-relative gap-3 overflow-hidden"
      style={{ minHeight: 100, maxWidth: 250, width: "100%" }}
    >
      {/* Immagine piccola a sinistra */}
      <Link
        to={`/shop/${product.slug}`}
        className="d-flex align-items-center justify-content-center bg-light rounded-3"
        style={{ width: 100, height: 100, flexShrink: 0 }}
      >
        <img
          src={product.image || "/smartphone_placeholder.jpeg"}
          alt={product.title}
          className="img-fluid"
          style={{ maxWidth: "100%", objectFit: "contain" }}
        />
      </Link>
      <div className="d-flex flex-column justify-content-between gap-2">
        {/* Solo titolo */}
        <div className="flex-grow-1 d-flex flex-column justify-content-center">
          <h5
            className="fw-bold mb-0"
            style={{ fontSize: "1.1rem", letterSpacing: 0.5 }}
          >
            {product.title[0].toUpperCase() + product.title.slice(1)}
          </h5>
        </div>
        {/* Azioni minimal a destra */}
        <div className="d-flex align-items-end gap-1 ms-2">
          <button
            className={`btn rounded-circle d-flex align-items-center justify-content-center`}
            style={{
              width: 28,
              height: 28,
              border: isInCart ? "1px solid #ffffff" : "1px solid #ff6543",
              backgroundColor: isInCart ? "#ff6543" : "#ffffff",
            }}
            onClick={() =>
              isInCart
                ? (removeFromCart(product.id),
                  showToast("Prodotto rimosso dal carrello"))
                : (addToCart(product),
                  showToast("Prodotto aggiunto al carrello"))
            }
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{
                fontSize: "1rem",
                color: isInCart ? "#ffffff" : "#ff6543",
              }}
            />
          </button>
          <button
            className={`btn  rounded-circle d-flex align-items-center justify-content-center`}
            style={{
              width: 28,
              height: 28,
              border: isInWishlist ? "1px solid #ffffff" : "1px solid #ff6543",
              backgroundColor: isInWishlist ? "#ff6543" : "#ffffff",
            }}
            onClick={() =>
              isInWishlist
                ? (removeFromWishlist(product.id),
                  showToast("Prodotto rimosso dalla lista desideri"))
                : (addToWishlist(product),
                  showToast("Prodotto aggiunto alla lista desideri"))
            }
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                fontSize: "1rem",
                color: isInWishlist ? "#ffffff" : "#ff6543",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
