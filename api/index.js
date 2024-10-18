import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/search", async (req, res) => {
  const { movieName, movieYear } = req.query;
  if (!movieName) {
    return res.status(400).json({ error: "O nome do filme é obrigatório." });
  }

  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}${
    movieYear ? `&y=${movieYear}` : ""
  }`;

  try {
    console.log("Fetching movie data from:", url);
    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      console.log("Movie not found:", data.Error);
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    res.status(500).json({ error: "Erro ao buscar filme." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
