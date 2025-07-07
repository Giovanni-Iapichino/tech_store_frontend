// import { useCompare } from "../context/CompareContext";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import { useCart } from "../context/CartContext";
// import { useState, useEffect } from "react";
// import { bottom } from "@popperjs/core";
// import { useNewsletter } from "../context/newsletterContext";
// import PopUpNewsletter from "../components/PopUpNewsletter";

// export default function ComparisonPage() {
//   const { compareList, removeFromCompare, clearCompare } = useCompare();
//   const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
//   const [showCartActions, setShowCartActions] = useState({});
//   const { randomClick, updateRandomClick, open, setOpen, newsletter } = useNewsletter();

//   useEffect(() => {
//     if (newsletter === "false") {
//       const currentValue = randomClick;
//       updateRandomClick(currentValue - 1);
//     }
//   }, []);

//   useEffect(() => {
//     if (randomClick === 0) {
//       setOpen(true);
//     }
//   }, [randomClick]);

//   if (compareList.length === 0)
//     return (
//       <>
//         {open && newsletter === "false" && <PopUpNewsletter />}
//         <div className="container">
//           <p>Nessun prodotto selezionato per il confronto.</p>
//           <Link className="btn btn-warning mt-4" to="/shop">
//             Torna allo Shop
//           </Link>
//         </div>
//       </>
//     );

//   const EXCLUDED_KEYS = ["id", "title", "thumbnail", "create_at", "update_at", "description", "slug"];

//   const allKeys = Array.from(new Set(compareList.flatMap((product) => Object.keys(product)))).filter((key) => !EXCLUDED_KEYS.includes(key));

//   // Trova la quantità di un prodotto nel carrello
//   const getCartQuantity = (productId) => {
//     const item = cart.find((c) => c.id === productId);
//     return item ? item.quantity : 0;
//   };

//   return (
//     <>
//       {open && newsletter === "false" && <PopUpNewsletter />}
//       <div className="container">
//         <h1 className="my-4" style={{ color: "#ff6543" }}>
//           <strong>Confronto Prodotti</strong>
//         </h1>
//         <div className="d-flex flex-column flex-sm-row gap-3 overflow-auto">
//           {compareList.map((product) => {
//             const cartQty = getCartQuantity(product.id);
//             return (
//               <div className="card p-3 shadow" key={product.id} style={{ minWidth: "300px" }}>
//                 <h5>{product.title}</h5>
//                 {/* Visualizza tutte le info tranne quelle escluse */}
//                 {allKeys.map((key) => (
//                   <div key={key}>
//                     <span style={{ fontWeight: 600 }}>{key.replace(/_/g, " ")}:</span> {String(product[key])}
//                   </div>
//                 ))}
//                 <div className="d-flex justify-content-center gap-2 mt-2">
//                   <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCompare(product.id)} title="Rimuovi dal confronto">
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                   <button
//                     className="btn btn-outline-primary btn-sm"
//                     title="Gestisci carrello"
//                     style={{ color: "#ff6543", borderColor: "#ff6543" }}
//                     onClick={() =>
//                       setShowCartActions((prev) => ({
//                         ...prev,
//                         [product.id]: !prev[product.id],
//                       }))
//                     }
//                   >
//                     <FontAwesomeIcon icon={faCartShopping} />
//                   </button>
//                 </div>
//                 {showCartActions[product.id] && (
//                   <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
//                     <button
//                       className="btn btn-outline-primary btn-sm"
//                       style={{
//                         borderRadius: "50%",
//                         width: 32,
//                         height: 32,
//                         padding: 0,
//                         fontSize: "1.1rem",
//                         color: "#ff6543",
//                         borderColor: "#ff6543",
//                       }}
//                       onClick={() => {
//                         if (cartQty > 1) {
//                           updateQuantity(product.id, cartQty - 1);
//                         } else if (cartQty === 1) {
//                           removeFromCart(product.id);
//                         }
//                       }}
//                       disabled={cartQty === 0}
//                       title="Rimuovi uno"
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <span
//                       style={{
//                         minWidth: 28,
//                         textAlign: "center",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {cartQty}
//                     </span>
//                     <button
//                       className="btn btn-outline-primary btn-sm"
//                       style={{
//                         borderRadius: "50%",
//                         width: 32,
//                         height: 32,
//                         padding: 0,
//                         fontSize: "1.1rem",
//                         color: "#ff6543",
//                         borderColor: "#ff6543",
//                       }}
//                       onClick={() => addToCart(product)}
//                       title="Aggiungi uno"
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//         <div className="d-flex justify-content-center mt-4">
//           <button className="btn btn-warning mt-4 mx-3" style={{ background: "#ff6543", color: "white", border: "white" }} onClick={clearCompare}>
//             Svuota confronto
//           </button>
//           <Link
//             to="/shop"
//             className="btn btn-warning mt-4 mx-3"
//             style={{
//               background: "#ff6543",
//               color: "white",
//               border: "white",
//               width: 146,
//             }}
//           >
//             Torna allo shop
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }



import { useCompare } from "../context/CompareContext";
import { useCart } from "../context/CartContext";
import { useNewsletter } from "../context/newsletterContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import PopUpNewsletter from "../components/PopUpNewsletter";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function ComparisonPage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { randomClick, updateRandomClick, open, setOpen, newsletter } = useNewsletter();

  // Controllo newsletter
  useEffect(() => {
    if (newsletter === "false") {
      updateRandomClick(randomClick - 1);
    }
  }, []);

  useEffect(() => {
    if (randomClick === 0) {
      setOpen(true);
    }
  }, [randomClick]);

  // Ritorno in caso di confronto vuoto
  if (compareList.length === 0)
    return (
      <>
        {open && newsletter === "false" && <PopUpNewsletter />}
        <div className="container text-center my-5">
          <p>Nessun prodotto selezionato per il confronto.</p>
          <Link className="btn btn-warning mt-4" to="/shop">
            Torna allo Shop
          </Link>
        </div>
      </>
    );

  const EXCLUDED_KEYS = ["id", "title", "thumbnail", "create_at", "update_at", "description", "slug"];
  const allKeys = Array.from(
    new Set(compareList.flatMap((product) => Object.keys(product)))
  ).filter((key) => !EXCLUDED_KEYS.includes(key));

  const getCartQuantity = (productId) => {
    const item = cart.find((c) => c.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      {open && newsletter === "false" && <PopUpNewsletter />}
      <div className="container overflow-auto">
        <h1 className="my-4 text-center" style={{ color: "#ff6543" }}>
          <strong>Confronto Prodotti</strong>
        </h1>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th style={{ width: "180px" }}>Nome</th>
                {compareList.map((product) => (
                  <th key={product.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{product.title}</span>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        title="Rimuovi dal confronto"
                        onClick={() => removeFromCompare(product.id)}
                      >
                        <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <img
                      src={product.thumbnail || "/placeholder.jpg"}
                      alt={product.title}
                      style={{ maxWidth: "100px" }}
                    />
                  </td>
                ))}
              </tr>

              {allKeys.map((key) => (
                <tr key={key}>
                  <th style={{ textTransform: "capitalize" }}>
                    {key.replace(/_/g, " ")}
                  </th>
                  {compareList.map((product) => (
                    <td key={product.id}>{String(product[key])}</td>
                  ))}
                </tr>
              ))}

              <tr>
                <th>Quantità nel carrello</th>
                {compareList.map((product) => {
                  const cartQty = getCartQuantity(product.id);
                  return (
                    <td key={product.id}>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          style={{ color: "#ff6543", borderColor: "#ff6543" }}
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
                        <span style={{ minWidth: 20 }}>{cartQty}</span>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          style={{ color: "#ff6543", borderColor: "#ff6543" }}
                          onClick={() => addToCart(product)}
                          title="Aggiungi uno"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-4 flex-wrap gap-3">
          <button
            className="btn btn-warning"
            style={{ background: "#ff6543", color: "white", border: "white" }}
            onClick={clearCompare}
          >
            Svuota confronto
          </button>
          <Link
            to="/shop"
            className="btn btn-warning"
            style={{ background: "#ff6543", color: "white", border: "white" }}
          >
            Torna allo shop
          </Link>
        </div>
      </div>
    </>
  );
}
