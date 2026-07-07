import { HelmetProvider } from "react-helmet-async";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')!).render(


<HelmetProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</HelmetProvider>,
)
