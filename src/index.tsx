import { ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </React.StrictMode >,
);