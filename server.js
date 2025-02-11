import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();

// Verificar variáveis de ambiente
if (!process.env.JWT_SECRET) {
  console.error('⚠️ ERRO: JWT_SECRET não está definido no arquivo .env.');
  process.exit(1);
}
if (!process.env.DB_URI) {
  console.error('⚠️ ERRO: DB_URI não está definido no arquivo .env.');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => {
    console.error('❌ Erro na conexão com o MongoDB:', err.message);
    process.exit(1);
  });

// Habilitar CORS e JSON
app.use(cors());
app.use(express.json());

// Middleware de autenticação (JWT)
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(403).json({ error: 'Token de autenticação ausente' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
};

// Rota de login (gera um JWT para o usuário)
app.post('/login', (req, res) => {
  if (!req.body || !req.body.username) {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }
  const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Endpoint para criação de bot (protegido)
app.post('/api/bots', authenticateJWT, (req, res) => {
  const { name, exchange } = req.body;
  if (!name || !exchange) {
    return res.status(400).json({ error: 'Nome e exchange são obrigatórios' });
  }
  // Lógica real para criar e salvar o bot no banco de dados deve ser implementada aqui
  res.status(201).json({ message: 'Bot criado com sucesso', bot: { name, exchange } });
});

// Endpoint para criação de Bot (usado pelo front-end via /createBot)
app.post('/createBot', (req, res) => {
  console.log("Criando Bot com configuração:", req.body);
  // Insira aqui a lógica real (por exemplo, chamada para funções de trading e persistência)
  res.json({ success: true, message: "Bot criado com sucesso!" });
});

// Endpoint para criação de Bot DeFi
app.post('/createDefiBot', (req, res) => {
  console.log("Criando Bot DeFi com configuração:", req.body);
  // Insira a lógica real para criação do Bot DeFi
  res.json({ success: true, message: "Bot DeFi criado com sucesso!" });
});

// Endpoint para cadastro de corretora
app.post('/api/register-broker', (req, res) => {
  const { name, apiKey, apiSecret, mode } = req.body;
  if (!name || !apiKey || !apiSecret) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios' });
  }
  // Lógica real para salvar a corretora no banco de dados
  res.status(201).json({ success: true, message: 'Corretora cadastrada com sucesso' });
});

// Endpoint para geração de relatórios
app.get('/api/reports', authenticateJWT, (req, res) => {
  // Implemente a lógica real para gerar relatórios (consultar banco, processar dados, etc.)
  const reports = [
    { type: 'Configurações', content: 'Relatório detalhado de configurações...' },
    { type: 'Logs Operações', content: 'Relatório de logs de operações...' }
  ];
  res.json({ success: true, reports });
});

// Endpoint de teste para verificar se a API está ativa
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando corretamente' });
});

// Evitar erro para favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Servir arquivos estáticos do frontend (supondo que o build do Vue esteja em ../frontend/dist)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err.message);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
