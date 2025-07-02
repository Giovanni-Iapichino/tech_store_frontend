import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductCardLigth({ product }) {
  return (
    <Link className="col-2 border rounded-3 overflow-hidden d-flex flex-column justify-content-center align-items-center gap-3 promotion-item position-relative" to={`/detailsproduct/${product.id}`}>
      <div className="position-absolute top-0 end-0">
        {product.discount && (
          <div className="promotion-item-content d-flex flex-column gap-2">
            {" "}
            <span>{product.discount}%</span>
          </div>
        )}
      </div>
      {product.discount && (
        <div className="position-absolute top-0 start-0">
          {product.promo_state === "in corso" ? (
            <div className="promotion-item-content d-flex flex-column gap-2">
              <span>in corso</span>
            </div>
          ) : (
            <div className="promotion-item-content d-flex flex-column gap-2">
              <span>dal {product.start_date}</span>
            </div>
          )}
        </div>
      )}
      <div className="">
        <img className="w-100 h-100" src="/smartphone_placeholder.jpeg" alt={product.title} />
      </div>
      <div className="promotion-item-content d-flex flex-column gap-2">
        <span>{product.title}</span>
        {product.discount_price ? (
          <span>
            <span className="text-decoration-line-through">{product.price}€</span> <span>{product.discount_price}€</span>
          </span>
        ) : (
          <span>{product.price}€</span>
        )}
      </div>
      <div className="action-buttons gap-2 position-absolute bottom-50% end-50% p-3">
        <button className="btn btn-warning rounded-circle p-2">
          <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faCartShopping} />
        </button>
        <button className="btn btn-warning rounded-circle p-2">
          <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faHeart} />
        </button>
      </div>
    </Link>
  );
}
