import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function ProductCardLigth() {
  return (
    <div className="col-2 border rounded-3 overflow-hidden d-flex flex-column justify-content-center align-items-center gap-3 promotion-item position-relative">
      <div className="">
        <img className="w-100 h-100" src="/smartphone_placeholder.jpeg" alt="Promotion 1" />
      </div>
      <div className="promotion-item-content">
        <span>Promotion 1</span>
      </div>
      <div className="action-buttons gap-2 position-absolute bottom-50% end-50% p-3">
        <button className="btn btn-warning rounded-circle p-2">
          <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faCartShopping} />
        </button>
        <button className="btn btn-warning rounded-circle p-2">
          <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faHeart} />
        </button>
      </div>
    </div>
  );
}
