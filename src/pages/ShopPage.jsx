import { useEffect, useState } from "react";
import { useProducts } from "../context/GetProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
// Hook che serve per leggere/modificare i parametri URL
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCardLight from "../components/ProductCardLight";

export default function ShopPage() {
  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || ""); //cosa scrivi nella barra di ricerca
  const [submittedTerm, setSubmittedTerm] = useState(searchParams.get("q") || ""); //cosa hai effettivamente cercato
  const [filterType, setFilterType] = useState(searchParams.get("type") || "All"); //il tipo di campo cercato
  const [priceRange, setPriceRange] = useState(searchParams.get("price") || "All"); //fascia di prezzo selezionata
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All"); //brand selezionato
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState(searchParams.get("os") || "All"); //sistema operativo selezionato
  const [currentPage, setCurrentPage] = useState(1); //pagina attuale per la paginazione

  const PRODUCTS_PER_PAGE = 4;

  // Richiama i prodotti dal backend con paginazione
  useEffect(() => {
    fetchProducts(currentPage, PRODUCTS_PER_PAGE);
  }, [currentPage]);

  // aggiorna gli stati dei parametri URL
  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
    setSubmittedTerm(searchParams.get("q") || "");
    setFilterType(searchParams.get("type") || "All");
    setPriceRange(searchParams.get("price") || "All");
    setSelectedBrand(searchParams.get("brand") || "All");
    setSelectedOperatingSystem(searchParams.get("os") || "All");
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  // Funzione per aggiornare i parametri URL e mantiene i vecchi parametri
  const updateParams = (newParams) => {
    const updated = {
      q: submittedTerm,
      type: filterType,
      price: priceRange,
      brand: selectedBrand,
      os: selectedOperatingSystem,
      page: currentPage,
      ...newParams,
    };
    setSearchParams(updated);
  };

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;

  const uniqueBrands = ["All", ...new Set(products.map((p) => p.brand))]; //estrae l'elenco dei brand
  const uniqueOperatingSystems = ["All", ...new Set(products.map((p) => p.operating_system))]; //estrae l'elenco dei sistemi operativi

  //determino su cosa cercare
  const getFilteredField = (product) => {
    if (filterType === "Title") return product.title;
    if (filterType === "Model") return product.model;
    return `${product.brand} ${product.title} ${product.model}`;
  };

  // filtro per prezzo
  const isPriceInRange = (price) => {
    if (priceRange === "All") return true;
    if (priceRange === "100-200") return price >= 100 && price <= 200;
    if (priceRange === "200-300") return price > 200 && price <= 300;
    if (priceRange === "300-400") return price > 300 && price <= 400;
    if (priceRange === "400+") return price > 400;
    return true;
  };

  // filtro generale
  const filteredProducts = products.filter((product) => {
    const matchesSearch = submittedTerm.trim() === "" || getFilteredField(product).toLowerCase().includes(submittedTerm.toLowerCase()); //q = ricerca generale
    const matchesPrice = isPriceInRange(product.price); // prezzo
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand; // brand
    const matchesOS = selectedOperatingSystem === "All" || product.operating_system === selectedOperatingSystem; // sistema operativo

    return matchesSearch && matchesPrice && matchesBrand && matchesOS;
  });

  // Usiamo i prodotti ricevuti dal backend come paginati
  const paginatedProducts = filteredProducts;

  // Determino se siamo all'ultima pagina per disabilitare il next
  const isLastPage = products.length < PRODUCTS_PER_PAGE;

  // gestione di invio ricerca
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedTerm(searchTerm);
    setCurrentPage(1);
    updateParams({ q: searchTerm, page: 1 });
  };

  // gestione cambio pagina
  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    updateParams({ page: newPage });
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateParams({ page: newPage });
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">
        <strong>Smartphone disponibili</strong>
      </h2>

      <div className="d-flex h-100 gap-4">
        <div className="row gap-4 flex-grow-1">
          {paginatedProducts.map((product) => (
            <ProductCardLight key={product.id} product={product} />
          ))}
          {paginatedProducts.length === 0 && <p className="mt-3">Nessun prodotto trovato.</p>}
        </div>
        <div className="d-flex flex-column mx-3 h-100" style={{ minWidth: "150px" }}>
          {/* Ricerca */}
          <form onSubmit={handleSearchSubmit} className="input-group shadow mb-4">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" placeholder="Cerca prodotto..." />
            <button className="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {/* Filtro brand */}
          <div className="shadow p-3 mb-4">
            <h6 className="mt-3">Filtra per brand</h6>
            {uniqueBrands.map((brand) => (
              <div key={brand}>
                <button
                  className={`btn my-1 ${selectedBrand === brand ? "btn-primary" : "btn-light"}`}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setCurrentPage(1);
                    updateParams({ brand, page: 1 });
                  }}
                >
                  {brand}
                </button>
              </div>
            ))}
          </div>

          {/* Filtro sistema operativo */}
          <div className="shadow p-3 mb-4">
            <h6 className="mt-3">Filtra per sistema operativo</h6>
            {uniqueOperatingSystems.map((os) => (
              <div key={os}>
                <button
                  className={`btn my-1 ${selectedOperatingSystem === os ? "btn-primary" : "btn-light"}`}
                  onClick={() => {
                    setSelectedOperatingSystem(os);
                    setCurrentPage(1);
                    updateParams({ os, page: 1 });
                  }}
                >
                  {os}
                </button>
              </div>
            ))}
          </div>

          {/* Filtro prezzo */}
          <div className="shadow p-3 mb-4">
            <h6 className="mt-3">Filtra per prezzo</h6>
            {[
              { label: "Tutti i prezzi", value: "All" },
              { label: "100€ – 200€", value: "100-200" },
              { label: "200€ – 300€", value: "200-300" },
              { label: "300€ – 400€", value: "300-400" },
              { label: "Oltre 400€", value: "400+" },
            ].map(({ label, value }) => (
              <div key={value}>
                <button
                  className={`btn my-1 ${priceRange === value ? "btn-primary" : "btn-light"}`}
                  onClick={() => {
                    setPriceRange(value);
                    setCurrentPage(1);
                    updateParams({ price: value, page: 1 });
                  }}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paginazione */}
      <div className="my-3 w-100 mx-auto d-flex justify-content-center align-items-center border rounded p-2">
        <button className="btn btn-outline-primary mx-3" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Pagina {currentPage}</span>
        <button className="btn btn-outline-primary mx-3" onClick={handleNextPage} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
}
