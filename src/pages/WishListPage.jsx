import { Link } from "react-router-dom";
import { faTrash, faArrowLeft, faCartShopping, faCircleCheck, faBrush, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishListPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  if (wishlist.length === 0)
    return (
      <div className="container text-center mt-5">
        <h3 className="mb-3">
          <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ff6543" }} className="me-2" />
          La tua wishlist è vuota
        </h3>
        <Link to="/shop" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Torna allo shop
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        <FontAwesomeIcon icon={faHeart} style={{ color: "#ff6543" }} className="me-2" />
        La tua wishlist
      </h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="custom-thead text-center">
            <tr>
              <th>Prodotto</th>
              <th>Dettagli</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {wishlist.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link className="w-100" to={`/shop/${item.id}`} key={item.id}>
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
                  <Link className="w-100" to={`/shop/${item.id}`} key={item.id}>
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
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromWishlist(item.id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#ff6543" }} />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} style={{ color: "#ff6543" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
