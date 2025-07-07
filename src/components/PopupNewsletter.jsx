import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNewsletter } from "../context/newsletterContext";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import axios from "axios";

export default function PopUpNewsletter() {
  const { open, setOpen, randomClick, setRandomClick, timestamp, setTimestamp, newsletter, setNewsletter, updateRandomClick, storeNewsletter, alert, setAlert, sendEmail } = useNewsletter();
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    localStorage.setItem("newsletter", newsletter);
  }, [newsletter]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("timestamp", Date.now());
    updateRandomClick(parseInt(Math.random() * 5) + 1);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);

    axios
      .post("http://127.0.0.1:3000/api/v1/newsletter", form)
      .then((response) => {
        const message = response.data.message;

        return axios
          .post("http://127.0.0.1:3000/api/v1/send-email", {
            type: "newsletter",
            email: form.email,
            nome: form.name,
            cognome: form.lastname,
          })
          .then(() => {
            localStorage.setItem("newsletter", "true");
            localStorage.removeItem("timestamp");
            localStorage.removeItem("randomClick");
            setForm({
              name: "",
              lastname: "",
              email: "",
            });
            setOpen(false);
          });
      })
      .catch((err) => {
        console.error("Errore API:", err.response?.data || err.message);
        setAlert(
          err.response.data.responseData?.malformatElements
            ? { type: "danger", message: err.response.data.message, malformatElements: err.response.data.responseData.malformatElements }
            : { type: "danger", message: err.response.data.error }
        );
      });
  }

  return (
    <>
      <div className="popup-newsletter d-flex justify-content-center align-items-center bg-dark fixed-top h-100 w-100 z-3 bg-opacity-75">
        <div className="popup-newsletter-content bg-white rounded-3 p-3 m-3">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <div className="popup-newsletter-content-header d-flex gap-2 justify-content-between align-items-start">
            <div className="title">
              <h2>Iscriviti alla nostra newsletter</h2>
              <p>Iscriviti alla nostra newsletter per ricevere le ultime notizie e promozioni</p>
            </div>
            <button className="border-0 bg-white fs-3">
              <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
            </button>
          </div>
          <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <div className="form-group d-flex flex-column gap-2">
              <label htmlFor="name">Nome</label>
              <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              {alert && alert.malformatElements && alert.malformatElements.name && <p className="text-danger">{alert.malformatElements.name.message}</p>}
              <label htmlFor="surname">Cognome</label>
              <input type="text" placeholder="Cognome" value={form.surname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} required />
              {alert && alert.malformatElements && alert.malformatElements.lastname && <p className="text-danger">{alert.malformatElements.lastname.message}</p>}
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              {alert && alert.malformatElements && alert.malformatElements.email && <p className="text-danger">{alert.malformatElements.email.message}</p>}

              <button className="btn rounded-pill mt-2" style={{ backgroundColor: "#ff6543", color: "#fff" }} type="submit">
                Iscriviti
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
