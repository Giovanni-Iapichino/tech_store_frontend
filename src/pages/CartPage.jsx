import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowLeft,
  faCartShopping,
  faCircleCheck,
  faBrush,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import HeaderMessage from "../components/HeaderMessage";
import { useNewsletter } from "../context/newsletterContext";
import { useEffect } from "react";
import PopUpNewsletter from "../components/PopUpNewsletter";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { randomClick, updateRandomClick, open, setOpen, newsletter } =
    useNewsletter();

  useEffect(() => {
    if (newsletter === "false") {
      const currentValue = randomClick;
      updateRandomClick(currentValue - 1);
    }
  }, []);

  useEffect(() => {
    if (randomClick === 0) {
      setOpen(true);
    }
  }, [randomClick]);

  if (cart.length === 0)
    return (
      <>
        {open && newsletter === "false" && <PopUpNewsletter />}
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
      </>
    );

  return (
    <>
      {open && newsletter === "false" && <PopUpNewsletter />}
      <HeaderMessage text="Cart" />
      <div className="container mt-5">
        <div className="mb-4"></div>
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
                <th>Prezzo Unitario</th>
                <th style={{ width: "120px" }}>Quantità</th>
                <th>Totale</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link
                      className="w-100"
                      to={`/shop/${item.slug}`}
                      key={item.id}
                    >
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
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="w-100"
                      to={`/shop/${item.slug}`}
                      key={item.id}
                    >
                      <strong>
                        {item.brand.toUpperCase()} {item.title} {item.model}
                      </strong>
                    </Link>
                    <br />
                    {item.ram} / {item.memory}
                    <br />
                    {item.operating_system} - {item.megapixel}
                  </td>
                  <td>
                    {item.promotion?.discount_price &&
                    item.promotion.promo_state !== "futura" ? (
                      <>
                        <strong style={{ color: "#be0909" }}>
                          €
                          {parseFloat(item.promotion.discount_price).toFixed(2)}
                        </strong>
                        <br />
                        <small className="text-decoration-line-through text-muted">
                          €{parseFloat(item.price).toFixed(2)}
                        </small>
                      </>
                    ) : (
                      <strong>€{parseFloat(item.price).toFixed(2)}</strong>
                    )}
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                        style={{ minWidth: "32px" }}
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{ color: "#ff8800" }}
                        />
                      </button>
                      <span
                        className="form-control text-center"
                        style={{
                          width: "60px",
                          background: "#f8f9fa",
                          border: "1px solid #ced4da",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        style={{ minWidth: "32px" }}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "#ff8800" }}
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>
                      {item.promotion?.discount_price &&
                      item.promotion.promo_state !== "futura" ? (
                        <>
                          <span style={{ color: "#be0909" }}>
                            €
                            {(
                              item.promotion.discount_price * item.quantity
                            ).toFixed(2)}
                          </span>
                          <br />
                          <small className="text-decoration-line-through text-muted">
                            €{(item.price * item.quantity).toFixed(2)}
                          </small>
                        </>
                      ) : (
                        <>€{(item.price * item.quantity).toFixed(2)}</>
                      )}
                    </strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#be0909" }}
                      />
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
          <div className="d-flex flex-md-row gap-2 justify-content-center align-items-center">
            <Link
              to="/shop"
              className="btn btn-orange col-3 col-md-4 d-flex justify-content-center align-items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
              <span className="d-none d-md-block">Continua gli acquisti</span>
            </Link>
            <button
              className="btn btn-orange col-3 col-md-4 d-flex justify-content-center align-items-center"
              onClick={clearCart}
            >
              <FontAwesomeIcon icon={faBrush} className="me-1" />
              <span className="d-none d-md-block">Svuota carrello</span>
            </button>
            <Link
              to="/checkout"
              className="btn btn-orange col-3 col-md-4 d-flex justify-content-center align-items-center"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="me-1" />
              <span className="d-none d-md-block">Procedi al checkout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
