// importo il contesto
import { createContext, useContext, useState } from "react";

// creo il contesto
const LoaderContext = createContext();

// funzione che definisce i dati (provider)
function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </LoaderContext.Provider>
    </>
  );
};

// funzione che fa consumare i dati
function useLoaderProvider() {
  const loader = useContext(LoaderContext);
  return loader;
};

export { LoaderProvider, useLoaderProvider };
