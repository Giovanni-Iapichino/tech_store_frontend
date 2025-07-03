import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ProductCardLigth({ product }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const location = useLocation();
  const isShopPage = location.pathname === "/shop";

  useEffect(() => {
    setIsInCart(cart.some((item) => item.id === product.id));
  }, [cart]);

  useEffect(() => {
    setIsInCart(cart.some((item) => item.id === product.id));
  }, [cart]);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  }, [wishlist]);

  return (
    <>
      <Link
        className="text-dark col-2 border rounded-3 overflow-hidden d-flex flex-column justify-content-around align-items-center gap-3 promotion-item position-relative text-decoration-none"
        to={`/shop/${product.id}`}
      >
        <div className="position-absolute top-0 end-0 p-1">
          {product.promotion && (
            <div className="fs-6 bg-danger text-white rounded-3 p-1">
              <span>{product.promotion.discount}%</span>
            </div>
          )}
        </div>
        {product.promotion && (
          <div className="promo_state position-absolute top-0 start-0 p-1">
            {product.promotion.promo_state === "in corso" ? (
              <div className="promotion-item-content d-flex flex-column gap-2">
                <span>in corso</span>
              </div>
            ) : (
              <div className="promotion-item-content d-flex flex-column gap-2">
                <span>dal {new Date(product.promotion.start_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
        <div className="mt-3">
          <img className="w-100 h-100" src="/smartphone_placeholder.jpeg" alt={product.title[0].toUpperCase() + product.title.slice(1)} />
        </div>
        <div className="promotion-item-content d-flex flex-column gap-2">
          <span className="text-center">{product.title[0].toUpperCase() + product.title.slice(1)}</span>
          {product.promotion && (
            <span className="d-flex flex-row align-items-center justify-content-center gap-2 w-100">
              <span className="original-price text-decoration-line-through">{product.price}€</span>
              <span className="discounted-price text-danger fw-bold">{product.promotion.discount_price}€</span>
            </span>
          )}
          {isShopPage && (
            <span className="d-flex flex-row align-items-center justify-content-center gap-2 w-100">
              <span className="original-price">{product.price}€</span>
            </span>
          )}
        </div>
        <div className="action-buttons gap-2 position-absolute bottom-50% end-50% p-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isInCart) {
                removeFromCart(product.id);
                setIsInCart(false);
              } else {
                addToCart(product);
                setIsInCart(true);
              }
            }}
            className="btn rounded-circle p-2"
            style={{ backgroundColor: "#ff6543" }}
          >
            {isInCart ? (
              <FontAwesomeIcon
                className="fs-3 cursor-pointer "
                style={{ height: "20px", width: "20px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                icon={faTrashCan}
              />
            ) : (
              <FontAwesomeIcon
                className="fs-3 cursor-pointer"
                style={{ height: "20px", width: "20px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                icon={faCartShopping}
              />
            )}
          </button>
          <button
            className="btn rounded-circle p-2"
            style={{ backgroundColor: "#ff6543" }}
            onClick={(e) => {
              e.preventDefault();
              if (isInWishlist) {
                removeFromWishlist(product.id);
                setIsInWishlist(false);
              } else {
                addToWishlist(product);
                setIsInWishlist(true);
              }
            }}
          >
            {isInWishlist ? (
              <FontAwesomeIcon
                className="fs-3 cursor-pointer"
                style={{ height: "20px", width: "20px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                icon={faTrashCan}
              />
            ) : (
              <FontAwesomeIcon
                className="fs-3 cursor-pointer"
                style={{ height: "20px", width: "20px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                icon={faHeart}
              />
            )}
          </button>
        </div>
      </Link>
    </>
  );
}
