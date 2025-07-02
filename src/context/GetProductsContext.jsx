import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bestSeller, setBestSeller] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/api/v1/products")
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
        setError(null);
      })

      .catch((err) => {
        console.error("Errore nel recupero dei prodotti:", err);
        setError("Impossibile caricare i prodotti");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  const fetchBestSeller = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/api/v1/products/best-seller")
      .then((response) => {
        setBestSeller(response.data.products);
        // console.log(response.data.products);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei prodotti:", err);
        setError("Impossibile caricare i prodotti");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPromotions = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/api/v1/products/promo")
      .then((response) => {
        setPromotions(response.data.products);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei prodotti:", err);
        setError("Impossibile caricare i prodotti");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchBestSeller();
    fetchPromotions();
  }, []);

  return <ProductsContext.Provider value={{ products, loading, error, bestSeller, fetchBestSeller, promotions }}>{children}</ProductsContext.Provider>;
};

const useProducts = () => {
  return useContext(ProductsContext);
};

export { useProducts, ProductsProvider };
