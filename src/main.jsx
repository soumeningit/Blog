import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RootContextProvider from "./contexts/RootContextProvider.jsx";
import { ToastProvider } from "./components/ToastProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RootContextProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </RootContextProvider>
  </BrowserRouter>
);
