import axios from "axios";

export const api = axios.create({
  // Tenta usar a URL do Render; se não existir, usa a do localhost para testes
  baseURL: "https://denilson-finance-app.onrender.com/api",
});
