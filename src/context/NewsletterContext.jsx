import { createContext, useContext, useState, useEffect } from "react";

const NewsletterContext = createContext();

export const useNewsletter = () => {
  return useContext(NewsletterContext);
};

export const NewsletterProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [randomClick, setRandomClick] = useState(parseInt(Math.random() * 5) + 1);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [newsletter, setNewsletter] = useState(localStorage.getItem("newsletter") || "false");

  useEffect(() => {
    const randomClick = localStorage.getItem("randomClick");
    const timestamp = localStorage.getItem("timestamp");
    if (randomClick && timestamp) {
      setRandomClick(parseInt(randomClick));
      setTimestamp(parseInt(timestamp));
    }
  }, []);

  const updateRandomClick = (value) => {
    setRandomClick(value);
    localStorage.setItem("randomClick", value);
  };

  return (
    <NewsletterContext.Provider value={{ open, setOpen, randomClick, setRandomClick, timestamp, setTimestamp, newsletter, setNewsletter, updateRandomClick }}>{children}</NewsletterContext.Provider>
  );
};
