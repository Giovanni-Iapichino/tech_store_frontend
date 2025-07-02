import { useState } from "react";
import { useProducts } from "../context/GetProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

export default function ShopPage() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  console.log(products);

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 4;

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;

  const getFilteredField = (product) => {
    if (filterType === "Title") return product.title;
    if (filterType === "Model") return product.model;
    if (filterType === "Brand") return product.brand;
    return `${product.brand} ${product.title} ${product.model}`;
  };

  const filteredProducts = products.filter((product) => {
    if (submittedTerm.trim() === "") return true;
    const field = getFilteredField(product).toLowerCase();
    return field.includes(submittedTerm.toLowerCase());
  });

  // Calcolo totale pagine
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Calcolo prodotti da mostrare nella pagina corrente
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedTerm(searchTerm);
    setCurrentPage(1); // torna alla pagina 1 ad ogni nuova ricerca
    console.log("Ricerca eseguita:", searchTerm, "su", filterType);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container">
      <h2 className="mb-4">
        <strong>Smartphone disponibili</strong>
      </h2>

      <div className="d-flex border p-1 h-100">
        <div className="row g-4">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{`${product.brand} ${product.title} ${product.model}`}</h5>
                  <p className="text-muted mb-2">{product.description}</p>
                  <div className="mt-auto">
                    <strong className="fs-5 text-success">€{product.price}</strong>
                  </div>
                  <button className="mt-auto btn btn-primary" onClick={() => addToCart(product)}>
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          ))}

          {paginatedProducts.length === 0 && <p className="mt-3">Nessun prodotto trovato.</p>}
        </div>

        <div className="d-flex flex-column mx-3 h-100">
          {/* Form di ricerca */}
          <form onSubmit={handleSearchSubmit} className="input-group shadow mb-4">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" placeholder="Cerca prodotto..." aria-label="Search" />
            <button className="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {/* Bottoni di filtro */}
          <div className="shadow p-3 mb-4">
            <h3 className="mt-3">Filtra per campo</h3>
            <button className="btn btn-light my-1" onClick={() => setFilterType("All")}>
              All
            </button>
            <button className="btn btn-light my-1" onClick={() => setFilterType("Title")}>
              Title
            </button>
            <button className="btn btn-light my-1" onClick={() => setFilterType("Model")}>
              Model
            </button>
            <button className="btn btn-light my-1" onClick={() => setFilterType("Brand")}>
              Brand
            </button>
          </div>

          {/* Paginazione */}
          <div className="d-flex justify-content-center align-items-center gap-3 mt-auto"></div>
        </div>
      </div>
      <div className="my-3 w-100 mx-auto d-flex justify-content-center align-items-center">
        <button className="btn btn-outline-primary mx-3" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Pagina {currentPage} di {totalPages}
        </span>
        <button className="btn btn-outline-primary mx-3" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <h1>qui vanno gli "ultimi arrivati"</h1>
    </div>
  );
}
