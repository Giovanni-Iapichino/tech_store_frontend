import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NewsletterContext = createContext();

export const useNewsletter = () => {
  return useContext(NewsletterContext);
};

export const NewsletterProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [randomClick, setRandomClick] = useState(parseInt(Math.random() * 5) + 1);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [newsletter, setNewsletter] = useState(localStorage.getItem("newsletter") || "false");
  const [alert, setAlert] = useState(null);

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

  const storeNewsletter = (value) => {
    axios
      .post("http://localhost:3000/api/v1/newsletter", {
        email: value.email,
        name: value.name,
        lastname: value.lastname,
      })
      .then((res) => {
        console.log(res);
        setAlert({ type: "success", message: "Iscrizione effettuata con successo" });
      })
      .catch((err) => {
        console.log(err);
        setAlert(
          err.response.data.responseData?.malformatElements
            ? { type: "danger", message: err.response.data.message, malformatElements: err.response.data.responseData.malformatElements }
            : { type: "danger", message: err.response.data.error }
        );
      });
  };

  const sendEmail = (value) => {
    axios
      .post("http://localhost:3000/api/v1/send-email", {
        nome: value.name,
        cognome: value.lastname,
        email: value.email,
        type: "newsletter",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NewsletterContext.Provider
      value={{ open, setOpen, randomClick, setRandomClick, timestamp, setTimestamp, newsletter, setNewsletter, updateRandomClick, storeNewsletter, alert, setAlert, sendEmail }}
    >
      {children}
    </NewsletterContext.Provider>
  );
};
