import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url"; // Para manipular o caminho corretamente no ESM

// Configura dotenv para carregar as variáveis de ambiente
dotenv.config();

// Para substituir o __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Endpoint para buscar o filme via OMDB API
app.get("/api/search", async (req, res) => {
  const { movieName, movieYear } = req.query;
  if (!movieName) {
    return res.status(400).json({ error: "O nome do filme é obrigatório." });
  }

  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}${
    movieYear ? `&y=${movieYear}` : ""
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filme." });
  }
});

// Roda o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
