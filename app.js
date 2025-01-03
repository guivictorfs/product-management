const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados em memória
let products = [];

// Rota para carregar a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para listar produtos
app.get('/api/products', (req, res) => {
  const sortedProducts = products.sort((a, b) => a.value - b.value);
  res.json(sortedProducts);
});

// Rota para cadastrar um novo produto
app.post('/api/products', (req, res) => {
  const { name, description, value, available } = req.body;
  products.push({
    name,
    description,
    value: parseFloat(value),
    available: available === 'sim',
  });
  res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
