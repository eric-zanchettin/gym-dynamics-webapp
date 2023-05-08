import { ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FavProvider } from "./contexts/FavContext";

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavProvider>
        <ToastContainer />
        <ColorModeScript />
        <App />
      </FavProvider>
    </BrowserRouter>
  </React.StrictMode >,
);