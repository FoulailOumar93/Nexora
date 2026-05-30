import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Support() {

  const [openFAQ, setOpenFAQ] = useState(null);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [ticketMessage, setTicketMessage] = useState("");

  const faqs = [

    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Les commandes sont livrées entre 3 et 7 jours ouvrés."
    },

    {
      question: "Puis-je retourner un article ?",
      answer:
        "Oui, vous avez 14 jours pour retourner un produit."
    },

    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer:
        "Visa, Mastercard, PayPal et Apple Pay."
    },

    {
      question: "Comment suivre ma commande ?",
      answer:
        "Un email de suivi est envoyé après expédition."
    }

  ];

  const generateTicketId = () => {

    const random =
      Math.floor(Math.random() * 9000) + 1000;

    return `NEX${random}`;

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !message) {

      setTicketMessage(
        "Veuillez remplir tous les champs."
      );

      return;

    }

    const ticketId = generateTicketId();

    setTicketMessage(
      `Ticket #${ticketId} créé avec succès. Notre équipe vous répondra sous 24h.`
    );

    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {

      setTicketMessage("");

    }, 6000);

  };

  return (
    <>

      <Navbar
        cartCount={0}
        setIsCartOpen={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
      />

      <main className="support-page">

        {/* HERO */}

        <section className="support-hero">

          <h1>
            Comment pouvons-nous vous aider ?
          </h1>

          <p>
            Support premium NEXORA 24/7
          </p>

        </section>

        {/* SUPPORT CARDS */}

        <section className="support-grid">

          <div className="support-card">

            <h3>
              Livraison
            </h3>

            <p>
              Informations sur les expéditions et délais.
            </p>

          </div>

          <div className="support-card">

            <h3>
              Retours
            </h3>

            <p>
              Politique de remboursement et échanges.
            </p>

          </div>

          <div className="support-card">

            <h3>
              Paiement
            </h3>

            <p>
              Moyens de paiement et sécurité.
            </p>

          </div>

          <div className="support-card">

            <h3>
              Compte
            </h3>

            <p>
              Gestion du compte et connexion.
            </p>

          </div>

        </section>

        {/* FAQ */}

        <section className="faq-section">

          <h2>
            Questions fréquentes
          </h2>

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="faq-item"
            >

              <div
                className="faq-question"
                onClick={() =>
                  setOpenFAQ(
                    openFAQ === index
                      ? null
                      : index
                  )
                }
              >

                <h3>
                  {faq.question}
                </h3>

                <span>
                  {openFAQ === index ? "−" : "+"}
                </span>

              </div>

              {openFAQ === index && (

                <p className="faq-answer">
                  {faq.answer}
                </p>

              )}

            </div>

          ))}

        </section>

        {/* CONTACT */}

        <section className="contact-support">

          <h2>
            Contactez-nous
          </h2>

          <form
            className="support-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <textarea
              placeholder="Votre message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            ></textarea>

            <button type="submit">

              Envoyer

            </button>

          </form>

          {/* TICKET MESSAGE */}

          {ticketMessage && (

            <div className="ticket-success">

              {ticketMessage}

            </div>

          )}

        </section>

      </main>

      <Footer />

    </>
  );
}

export default Support;