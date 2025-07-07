import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bestSeller, setBestSeller] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [promotionsOnGoing, setPromotionsOnGoing] = useState([]);
  const [promotionsInComing, setPromotionsInComing] = useState([]);

  const fetchProducts = (page, limit) => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/api/v1/products", {
        params: { page, limit },
      })
      .then((response) => {
        setProducts(response.data.products);
        // console.log(response.data.products);
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
      .get("http://127.0.0.1:3000/api/v1/products?promotion=true")
      .then((response) => {
        setPromotions(response.data.products);
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

  const fetchPromotionsOnGoing = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/api/v1/products?promo_state=in_corso&promotion=true")
      .then((response) => {
        setPromotionsOnGoing(response.data.products);
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

  const fetchPromotionsInComing = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/api/v1/products?promo_state=futura&promotion=true")
      .then((response) => {
        setPromotionsInComing(response.data.products);
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

  useEffect(() => {
    fetchProducts();
    fetchBestSeller();
    fetchPromotions();
    fetchPromotionsOnGoing();
    fetchPromotionsInComing();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, bestSeller, fetchBestSeller, promotions, fetchProducts, promotionsInComing, fetchPromotionsInComing, promotionsOnGoing, fetchPromotionsOnGoing }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductsContext);
};

export { useProducts, ProductsProvider };
