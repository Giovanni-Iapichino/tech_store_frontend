import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faTrashCan, faMinus, faPlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCompare } from "../context/CompareContext"; // Importo il contesto per la comparazione dei prodotti

export default function ProductCardLigth({ product, isInCompare, addToCompare, removeFromCompare }) {
  const { addToCart, removeFromCart, cart, updateQuantity } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(cart.find((item) => item.id === product.id)?.quantity || 1);

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
        className="text-dark col-2 border rounded-3 d-flex flex-column justify-content-around align-items-center gap-3 promotion-item position-relative text-decoration-none mx-auto"
        to={`/shop/${product.id}`}
      >
        {/* Promotion */}
        <div className="position-absolute top-0 end-0 p-1">
          {product.promotion && (
            <div className="fs-6 bg-danger text-white rounded-3 p-1">
              <span>{product.promotion.discount}%</span>
            </div>
          )}
        </div>
        {/* {product.promotion && (
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
        )} */}

        {/* Image */}
        <div className="mt-3">
          <img className="w-100 h-100" src="/smartphone_placeholder.jpeg" alt={product.title[0].toUpperCase() + product.title.slice(1)} />
        </div>

        {/* Title and price */}
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

        {/* Action buttons */}
        <div className="action-buttons gap-2 position-absolute bottom-50% end-50% p-3 d-flex align-items-center justify-content-center">
          {isInCart ? (
            <div className="gap-2 w-100 d-flex flex-column align-items-center justify-content-center">
              <button
                className="btn rounded-circle p-2 d-flex align-items-center justify-content-center position-absolute"
                style={{ backgroundColor: "#ff6543", height: "30px", width: "30px", top: "-20px", left: "22px" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (quantity === 1) {
                    removeFromCart(product.id);
                    setIsInCart(false);
                  } else {
                    setQuantity(quantity - 1);
                    updateQuantity(product.id, parseInt(quantity) - 1);
                  }
                }}
              >
                {quantity > 1 ? (
                  <FontAwesomeIcon
                    style={{
                      height: "15px",
                      width: "15px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    icon={faMinus}
                  />
                ) : (
                  <FontAwesomeIcon
                    style={{
                      height: "15px",
                      width: "15px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    icon={faTrashCan}
                  />
                )}
              </button>
              <div
                className="btn rounded-circle p-2 d-flex align-items-center justify-content-center "
                style={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#ff6543",
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {quantity}
              </div>
              <button
                className="btn rounded-circle p-2 d-flex align-items-center justify-content-center position-absolute"
                style={{ backgroundColor: "#ff6543", height: "30px", width: "30px", top: "62px", left: "22px" }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{
                    height: "15px",
                    width: "15px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(quantity + 1);
                    updateQuantity(product.id, parseInt(quantity) + 1);
                  }}
                />
              </button>
            </div>
          ) : (
            <FontAwesomeIcon
              className="btn rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#ff6543",
              }}
              icon={faCartShopping}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                setIsInCart(true);
              }}
            />
          )}
          {isInWishlist ? (
            <FontAwesomeIcon
              className="btn rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#ff6543",
              }}
              icon={faTrashCan}
              onClick={(e) => {
                e.preventDefault();
                removeFromWishlist(product.id);
                setIsInWishlist(false);
              }}
            />
          ) : (
            <FontAwesomeIcon
              className="btn rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#ff6543",
              }}
              icon={faHeart}
              onClick={(e) => {
                e.preventDefault();
                addToWishlist(product);
                setIsInWishlist(true);
              }}
            />
          )}
        </div>

        {/* Compare button */}
        {isShopPage && (
          <div className="compare-button position-absolute d-flex align-items-center justify-content-center gap-2" style={{ top: "10px", left: "10px" }}>
            {isInCompare ? (
              <FontAwesomeIcon
                style={{ height: "20px", width: "20px" }}
                className="text-success"
                icon={faCircleCheck}
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCompare(product.id);
                }}
              />
            ) : (
              <FontAwesomeIcon
                style={{ height: "20px", width: "20px" }}
                icon={faCircleCheckRegular}
                onClick={(e) => {
                  e.preventDefault();
                  addToCompare(product);
                }}
              />
            )}
            <span style={{ fontSize: "10px" }}>Compare</span>
          </div>
        )}

        {/* Scadenza */}
        {/* <div className="position-absolute gap-2" style={{ top: "-50px", left: "10px" }}>
          <span style={{ fontSize: "10px" }}>Scade il 31/12/2025</span>
        </div> */}
      </Link>
    </>
  );
}
