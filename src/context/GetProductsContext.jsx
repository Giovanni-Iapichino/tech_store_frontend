import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
