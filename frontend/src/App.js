const API_URL = process.env.REACT_APP_API_URL;

axios.get(`${API_URL}/api/despesas`).then((res) => setDespesas(res.data));
axios.get(`${API_URL}/api/receitas`).then((res) => setReceitas(res.data));
