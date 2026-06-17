import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter
} from "react-router-dom";

import App from "./App";

import {
  AuthProvider
} from "./context/AuthContext";

import "./styles/global.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <Toaster
          position="top-center"
          toastOptions={{

            duration: 3000,

            style: {

              background: "#0f0f0f",

              color: "#ffffff",

              border:
                "1px solid rgba(212,175,55,0.4)",

              borderRadius: "14px",

              padding: "16px",

              minWidth: "350px",

              boxShadow:
                "0 0 25px rgba(212,175,55,0.15)"

            },

            success: {

              iconTheme: {

                primary: "#22c55e",

                secondary: "#ffffff"

              }

            },

            error: {

              iconTheme: {

                primary: "#ef4444",

                secondary: "#ffffff"

              }

            }

          }}
        />

        <App />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);