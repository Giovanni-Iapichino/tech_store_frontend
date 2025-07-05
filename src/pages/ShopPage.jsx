import { useEffect, useState } from "react";
import { useProducts } from "../context/GetProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext"; // Importo il contesto per la comparazione dei prodotti
// Hook che serve per leggere/modificare i parametri URL
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCardLight from "../components/ProductCardLight";
import HeaderMessage from "../components/HeaderMessage";

export default function ShopPage() {
  const { products, loading, error, fetchProducts } = useProducts();
  const { compareList, addToCompare, removeFromCompare } = useCompare();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || ""); //cosa scrivi nella barra di ricerca
  const [submittedTerm, setSubmittedTerm] = useState(searchParams.get("q") || ""); //cosa hai effettivamente cercato
  const [filterType, setFilterType] = useState(searchParams.get("type") || "All"); //il tipo di campo cercato
  const [priceRange, setPriceRange] = useState(searchParams.get("price") || "All"); //fascia di prezzo selezionata
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All"); //brand selezionato
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState(searchParams.get("os") || "All"); //sistema operativo selezionato
  const [currentPage, setCurrentPage] = useState(1); //pagina attuale per la paginazione
  const [showPromoOnly, setShowPromoOnly] = useState(searchParams.get("promo") === "true"); // nuovo stato filtro promo
  const [urlError, setUrlError] = useState(null);

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
    setShowPromoOnly(searchParams.get("promo") === "true");
  }, [searchParams]);

  // Controllo errori URL
  useEffect(() => {
    // Parametri e valori validi
    const allowedParams = ["q", "type", "price", "brand", "os", "page", "promo"];
    const validTypes = ["All", "Title", "Model"];
    const validPrices = ["All", "100-200", "200-300", "300-400", "400+"];
    const validBrands = ["All", ...new Set(products.map((p) => p.brand))];
    const validOS = ["All", ...new Set(products.map((p) => p.operating_system))];

    let error = null;

    // Controlla se ci sono parametri non previsti nell'URL
    for (const [key] of searchParams.entries()) {
      if (!allowedParams.includes(key)) {
        error = `Parametro non previsto nell'URL: '${key}'.`;
        break;
      }
    }

    // Controlla i valori dei parametri previsti
    if (!error && searchParams.get("type") && !validTypes.includes(searchParams.get("type"))) {
      error = "Parametro 'type' non valido nell'URL.";
    }
    if (!error && searchParams.get("price") && !validPrices.includes(searchParams.get("price"))) {
      error = "Parametro 'price' non valido nell'URL.";
    }
    if (!error && searchParams.get("brand") && !validBrands.includes(searchParams.get("brand"))) {
      error = "Parametro 'brand' non valido nell'URL.";
    }
    if (!error && searchParams.get("os") && !validOS.includes(searchParams.get("os"))) {
      error = "Parametro 'os' non valido nell'URL.";
    }
    // Correggi: accetta solo "true" o assenza per promo
    if (!error && searchParams.has("promo") && searchParams.get("promo") !== "true") {
      error = "Parametro 'promo' non valido nell'URL.";
    }
    setUrlError(error);
  }, [searchParams, products]);

  // Funzione per aggiornare i parametri URL e mantiene i vecchi parametri
  const updateParams = (newParams) => {
    const updated = {
      q: submittedTerm,
      type: filterType,
      price: priceRange,
      brand: selectedBrand,
      os: selectedOperatingSystem,
      page: currentPage,
      promo: showPromoOnly ? "true" : undefined,
      ...newParams,
    };
    // Rimuovi promo se non serve
    if (!updated.promo) delete updated.promo;
    setSearchParams(updated);
  };

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;
  if (urlError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="alert alert-danger text-center" style={{ maxWidth: 420 }}>
          {urlError} <br />
          <button className="btn btn-orange mt-3" onClick={() => (window.location.href = "/shop")}>
            Torna allo Shop
          </button>
        </div>
      </div>
    );

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
    const matchesPromo = !showPromoOnly || !!product.promotion; // promo attiva solo se richiesto

    return matchesSearch && matchesPrice && matchesBrand && matchesOS && matchesPromo;
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
    <>
      <div className="mb-4">
        <HeaderMessage text="Shop" />
      </div>
      <div className="container">
        <h2 className="mb-4" style={{ color: "#ff6543" }}>
          <strong>Smartphone disponibili</strong>
        </h2>

        {/* Filtri mobile - versione compatta per schermi sotto 576px */}
        <div className="mb-3 d-sm-none">
          <button
            className={`mobile-filter-chip${showPromoOnly ? " selected" : ""}`}
            onClick={() => {
              const newPromo = !showPromoOnly;
              setShowPromoOnly(newPromo);
              updateParams({ promo: newPromo ? "true" : undefined, page: 1 });
            }}
          >
            {showPromoOnly ? "🔴 Solo promo" : "⚪ Tutti"}
          </button>
        </div>
        <div className="d-sm-none mb-4 d-flex gap-2">
          {/* Filtro promo - chip singolo */}

          {/* Filtro brand - chips orizzontali */}
          <div className="mb-3 d-flex flex-column gap-2">
            <div className="mobile-filter-label">Brand:</div>
            <select
              className="mobile-filter-select"
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
                updateParams({ brand: e.target.value, page: 1 });
              }}
            >
              <option value="All">Tutti</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            {/* <div className="mobile-filter-label">Brand:</div>
            <div className="mobile-filter-chips">
              {uniqueBrands.map((brand) => (
                <button
                  key={brand}
                  className={`mobile-filter-chip${selectedBrand === brand ? " selected" : ""}`}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setCurrentPage(1);
                    updateParams({ brand, page: 1 });
                  }}
                >
                  {brand === "All" ? "Tutti" : brand}
                </button>
              ))}
            </div> */}
          </div>

          {/* Filtro sistema operativo - chips orizzontali */}
          <div className="mb-3 d-flex flex-column gap-2">
            <div className="mobile-filter-label">OS:</div>
            <select
              className="mobile-filter-select"
              onChange={(e) => {
                setSelectedOperatingSystem(e.target.value);
                setCurrentPage(1);
                updateParams({ os: e.target.value, page: 1 });
              }}
            >
              <option value="All">Tutti</option>
              {uniqueOperatingSystems.map((os) => (
                <option key={os} value={os}>
                  {os}
                </option>
              ))}
            </select>
            {/* <div className="mobile-filter-chips">
              {uniqueOperatingSystems.map((os) => (
                <button
                  key={os}
                  className={`mobile-filter-chip${selectedOperatingSystem === os ? " selected" : ""}`}
                  onClick={() => {
                    setSelectedOperatingSystem(os);
                    setCurrentPage(1);
                    updateParams({ os, page: 1 });
                  }}
                >
                  {os === "All" ? "Tutti" : os}
                </button>
              ))}
            </div> */}
          </div>

          {/* Filtro prezzo - chips orizzontali */}
          <div className="mb-3 d-flex flex-column gap-2">
            <div className="mobile-filter-label">Prezzo:</div>
            <select
              className="mobile-filter-select"
              onChange={(e) => {
                setPriceRange(e.target.value);
                setCurrentPage(1);
                updateParams({ price: e.target.value, page: 1 });
              }}
            >
              <option value="All">Tutti</option>
              {[
                { label: "Tutti", value: "All" },
                { label: "100-200€", value: "100-200" },
                { label: "200-300€", value: "200-300" },
                { label: "300-400€", value: "300-400" },
                { label: "400+€", value: "400+" },
              ].map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {/* <div className="mobile-filter-chips">
              {[
                { label: "Tutti", value: "All" },
                { label: "100-200€", value: "100-200" },
                { label: "200-300€", value: "200-300" },
                { label: "300-400€", value: "300-400" },
                { label: "400+€", value: "400+" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  className={`mobile-filter-chip${priceRange === value ? " selected" : ""}`}
                  onClick={() => {
                    setPriceRange(value);
                    setCurrentPage(1);
                    updateParams({ price: value, page: 1 });
                  }}
                >
                  {label}
                </button>
              ))}
            </div> */}
          </div>
        </div>

        {/* filtri sopra i 576px */}
        <div className="d-flex gap-4">
          <div className="row gap-4 flex-grow-1 justify-content-center">
            {paginatedProducts.map((product) => {
              const isInCompare = compareList.some((p) => p.id === product.id);
              return (
                <div className="col-5 col-sm-4 col-md-4 col-lg-3">
                  <ProductCardLight key={product.id} product={product} isInCompare={isInCompare} addToCompare={addToCompare} removeFromCompare={removeFromCompare} />
                </div>
              );
            })}

            {paginatedProducts.length === 0 && <p className="mt-3">Nessun prodotto trovato.</p>}
          </div>
          <div className="flex-column mx-3 h-100 d-none d-sm-flex" style={{ minWidth: "180px" }}>
            {/* Filtro promo */}
            <div className="filter-section">
              <h6 className="mt-3">Solo prodotti in promozione</h6>
              <button
                className={`filter-btn${showPromoOnly ? " selected" : ""}`}
                onClick={() => {
                  const newPromo = !showPromoOnly;
                  setShowPromoOnly(newPromo);
                  updateParams({ promo: newPromo ? "true" : undefined, page: 1 });
                }}
              >
                {showPromoOnly ? "Mostra tutti" : "Mostra solo promo"}
              </button>
            </div>
            {/* Filtro brand */}
            <div className="filter-section">
              <h6 className="mt-3">Filtra per brand</h6>
              {uniqueBrands.map((brand) => (
                <div key={brand}>
                  <button
                    className={`filter-btn${selectedBrand === brand ? " selected" : ""}`}
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
            <div className="filter-section">
              <h6 className="mt-3">Filtra per sistema operativo</h6>
              {uniqueOperatingSystems.map((os) => (
                <div key={os}>
                  <button
                    className={`filter-btn${selectedOperatingSystem === os ? " selected" : ""}`}
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
            <div className="filter-section">
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
                    className={`filter-btn${priceRange === value ? " selected" : ""}`}
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
          <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span className="d-none d-sm-block">Pagina </span> <span className="text-orange fw-bold">{currentPage}</span>
          <button className="pagination-btn" onClick={handleNextPage} disabled={isLastPage}>
            Next
          </button>
        </div>

        {/* Bottone fisso per confronto */}
        {compareList.length >= 2 && (
          <button className="btn-compare fixed-compare-btn" onClick={() => navigate("/comparison")}>
            Vai al confronto ({compareList.length} prodotti)
          </button>
        )}
      </div>
    </>
  );
}
