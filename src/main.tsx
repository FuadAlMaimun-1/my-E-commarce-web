import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { ToastContainer} from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
    <ToastContainer />
  </CartProvider>,
);
