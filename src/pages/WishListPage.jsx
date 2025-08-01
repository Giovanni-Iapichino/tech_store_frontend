import { Link } from "react-router-dom";
import { faTrash, faArrowLeft, faCartShopping, faCircleCheck, faBrush, faHeart, faPlus, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNewsletter } from "../context/newsletterContext";
import { useEffect } from "react";
import PopUpNewsletter from "../components/PopUpNewsletter";
import { useToast } from "../context/ToastContext";
import HeaderMessage from "../components/HeaderMessage";

export default function WishListPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { randomClick, updateRandomClick, open, setOpen, newsletter } = useNewsletter();
  const { showToast } = useToast();

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
  if (wishlist.length === 0)
    return (
      <>
        {open && newsletter === "false" && <PopUpNewsletter />}
        <HeaderMessage text="Wishlist" />
        <div className="container text-center mt-5">
          <h3 className="mb-3">
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ff6543" }} className="me-2" />
            La tua wishlist è vuota
          </h3>
          <Link to="/shop" className="btn btn-orange">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Torna allo shop
          </Link>
        </div>
      </>
    );

  return (
    <>
      {open && newsletter === "false" && <PopUpNewsletter />}
      <HeaderMessage text="Wishlist" />
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
                    <Link className="w-100" to={`/shop/${item.slug}`} key={item.id}>
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
                    <Link className="w-100" to={`/shop/${item.slug}`} key={item.id}>
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
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          removeFromWishlist(item.id);
                          showToast("Prodotto rimosso dalla wishlist");
                        }}
                      >
                        <FontAwesomeIcon icon={faHeartCrack} style={{ color: "#ff6543" }} />
                      </button>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          {
                            addToCart(item);
                            removeFromWishlist(item.id);
                            showToast("Prodotto aggiunto al carrello");
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ff6543" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
