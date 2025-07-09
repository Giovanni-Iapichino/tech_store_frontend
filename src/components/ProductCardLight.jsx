import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faTrashCan, faMinus, faPlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCompare } from "../context/CompareContext"; // Importo il contesto per la comparazione dei prodotti
import { useToast } from "../context/ToastContext";

export default function ProductCardLigth({ product, isInCompare, addToCompare, removeFromCompare }) {
  const { addToCart, removeFromCart, cart, updateQuantity } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(cart.find((item) => item.id === product.id)?.quantity || 1);
  const [compareError, setCompareError] = useState("");
  const { compareList, isInCompare: isInCompareContext } = useCompare(); // Uso il contesto per verificare se il prodotto è in comparazione
  const { showToast } = useToast();

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
        className="text-dark col-2 border rounded-3 d-flex flex-column justify-content-around align-items-center promotion-item position-relative text-decoration-none mx-auto"
        to={`/shop/${product.slug}`}
      >
        {/* Image  and Mobile Action Buttons*/}
        <div className="d-flex flex-column align-items-start justify-content-start position-relative">
          <div className="card-content d-flex flex-column align-items-start justify-content-center">
            {/* Image */}
            {window.matchMedia("(pointer: coarse)").matches ? (
              <div className="col-6 col-lg-8">
                <img className="w-100 h-100" src="/smartphone_placeholder.jpeg" alt={product.title[0].toUpperCase() + product.title.slice(1)} />
              </div>
            ) : (
              <div className="col-6 col-md-10 mx-auto">
                <img className="w-100 h-100" src="/smartphone_placeholder.jpeg" alt={product.title[0].toUpperCase() + product.title.slice(1)} />
              </div>
            )}
            {/* Promotion */}
            {product.promotion && (
              <div className="d-flex flex-row align-items-center justify-content-center col-12">
                <div className="promo_state p-1 col-8">
                  {product.promotion.promo_state !== "in_corso" && (
                    <div className="promotion-item-content d-flex align-items-center justify-content-center">
                      <span className="d-none d-sm-block" style={{ fontSize: "10px", marginRight: "5px" }}>
                        dal
                      </span>
                      <span style={{ fontSize: "12px" }}>{product.promotion.start_date}</span>
                    </div>
                  )}
                </div>
                <div className="p-1">
                  <div className="fs-6 bg-danger text-white rounded-3 p-1">
                    <span>-{parseInt(product.promotion.discount)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile Action Buttons */}
          {window.matchMedia("(pointer: coarse)").matches ? (
            <div
              className="d-flex flex-column col-6 flex-column align-items-center justify-content-center gap-2"
              style={{ top: "10px", right: "10px" }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {product.promotion?.promo_state !== "futura" &&
                (isInCart ? (
                  <div className="gap-2 w-100 d-flex flex-column align-items-center justify-content-center">
                    <button
                      className="btn rounded-circle p-2 d-flex align-items-center justify-content-center position-absolute"
                      style={{
                        height: "15px",
                        width: "15px",
                        top: "35px",
                        right: "55px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (quantity === 1) {
                          removeFromCart(product.id);
                          showToast("Prodotto rimosso dal carrello");
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
                            fontSize: "10px",
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
                      className="btn rounded-circle p-2 d-flex align-items-center justify-content-center position-absolute"
                      style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "#ff6543",
                        top: "33px",
                        right: "28px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {quantity}
                    </div>
                    <button
                      className="btn rounded-circle p-2 d-flex align-items-center justify-content-center position-absolute"
                      style={{
                        height: "15px",
                        width: "15px",
                        top: "35px",
                        right: "5px",
                      }}
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
                          fontSize: "10px",
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
                  <button
                    className="btn rounded-circle d-flex p-2 align-items-center justify-content-center position-absolute"
                    style={{
                      height: "35px",
                      width: "35px",
                      backgroundColor: "#ff6543",
                      top: "25px",
                      right: "20px",
                    }}
                  >
                    <FontAwesomeIcon
                      className="btn d-flex align-items-center justify-content-center position-absolute"
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                      icon={faCartShopping}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                        showToast("Prodotto aggiunto al carrello");
                        setIsInCart(true);
                      }}
                    />
                  </button>
                ))}
              {isInWishlist ? (
                <button
                  className="btn rounded-circle d-flex p-2 align-items-center justify-content-center position-absolute"
                  style={{
                    height: "35px",
                    width: "35px",
                    backgroundColor: "#ff6543",
                    top: "65px",
                    right: "20px",
                  }}
                >
                  <FontAwesomeIcon
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      height: "20px",
                      width: "20px",
                    }}
                    icon={faTrashCan}
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product.id);
                      showToast("Prodotto rimosso dalla wishlist");
                      setIsInWishlist(false);
                    }}
                  />
                </button>
              ) : (
                <button
                  className="btn rounded-circle d-flex p-2 align-items-center justify-content-center position-absolute"
                  style={{
                    height: "35px",
                    width: "35px",
                    backgroundColor: "#ff6543",
                    top: "65px",
                    right: "20px",
                  }}
                >
                  <FontAwesomeIcon
                    className="btn d-flex align-items-center justify-content-center position-absolute"
                    style={{
                      height: "20px",
                      width: "20px",
                    }}
                    icon={faHeart}
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishlist(product);
                      showToast("Prodotto aggiunto alla wishlist");
                      setIsInWishlist(true);
                    }}
                  />
                </button>
              )}
            </div>
          ) : (
            <div className="action-buttons gap-2 position-absolute bottom-50% end-50% p-3 d-flex align-items-center justify-content-center">
              {product.promotion?.promo_state !== "futura" &&
                (isInCart ? (
                  <div className="gap-2 w-100 d-flex flex-column align-items-center justify-content-center">
                    <button
                      className="btn rounded-circle p-2 d-flex align-items-center justify-content-center position-absolute"
                      style={{
                        backgroundColor: "#ff6543",
                        height: "30px",
                        width: "30px",
                        top: "-20px",
                        left: "22px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (quantity === 1) {
                          removeFromCart(product.id);
                          showToast("Prodotto rimosso dal carrello");
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
                      style={{
                        backgroundColor: "#ff6543",
                        height: "30px",
                        width: "30px",
                        top: "62px",
                        left: "22px",
                      }}
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
                      showToast("Prodotto aggiunto al carrello");
                      setIsInCart(true);
                    }}
                  />
                ))}
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
                    showToast("Prodotto rimosso dalla wishlist");
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
                    showToast("Prodotto aggiunto alla wishlist");
                    setIsInWishlist(true);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Title and price */}
        <div className="promotion-item-content d-flex flex-column">
          <span className="text-center">{product.title[0].toUpperCase() + product.title.slice(1)}</span>
          {product.promotion ? (
            <span className="d-flex flex-row align-items-center justify-content-center gap-2 w-100">
              <span className="original-price text-decoration-line-through">{product.price}€</span>
              <span className="discounted-price text-danger fw-bold">{product.promotion.discount_price}€</span>
            </span>
          ) : (
            isShopPage && (
              <span className="d-flex flex-row align-items-center justify-content-center gap-2 w-100">
                <span className="original-price">{product.price}€</span>
              </span>
            )
          )}
        </div>

        {/* Compare button */}
        {isShopPage && (
          <div
            className="compare-button position-absolute d-flex align-items-center justify-content-center gap-2"
            style={{ top: "2px", left: "2px" }}
            onClick={(e) => {
              e.preventDefault();
              if (isInCompare) {
                removeFromCompare(product.id);
                showToast("Prodotto rimosso dalla comparazione");
              } else {
                addToCompare(product);
                if (compareList.length >= 3) return;
                showToast("Prodotto aggiunto alla comparazione");
              }
            }}
          >
            {isInCompare ? (
              <FontAwesomeIcon style={{ height: "20px", width: "20px" }} className="text-success" icon={faCircleCheck} />
            ) : (
              <FontAwesomeIcon style={{ height: "20px", width: "20px" }} icon={faCircleCheckRegular} />
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
