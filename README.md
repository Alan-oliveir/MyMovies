# MyMovies 🎬  
[![Express](https://img.shields.io/badge/express-4.21.1-brightgreen.svg)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/node.js-v21.6.1-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

MyMovies é uma aplicação web que permite que os usuários pesquisem filmes utilizando a OMDB API e adicionem à sua lista de filmes para assistir. 
Essa aplicação foi construída com o intuito de facilitar a organização dos filmes que você deseja assistir.
Com uma interface simples e intuitiva, você pode buscar por filmes, ver informações detalhadas e salvar os filmes que mais te interessam.

## Funcionalidades
- Pesquisa de Filmes: Busca filmes pela OMDB API com base em títulos.
- Lista de Filmes: Adicione os filmes que você quer assistir.
- Interface Amigável: Interface intuitiva e de fácil uso.

## Tecnologias Utilizadas
- JavaScript (Front-end)
- Node.js (Back-end com Express)
- OMDB API (Para buscar informações dos filmes)
- Vercel (Deploy da aplicação)
- SweetAlert2 (Para exibir alertas e interação)
- dotenv (Para gerenciar variáveis de ambiente)

## Screenshots
![App Screenshot](https://github.com/Alan-oliveir/MyMovies/blob/main/public/images/screenshot.png)  
___

## Deploy
A aplicação está disponível em produção neste [link](https://vercel.live/link/my-movies-green.vercel.app?via=team-dashboard-project-entity&p=1&page=/).

## Dependências
- express: ^4.21.1
- dotenv: ^16.4.5
- node-fetch: ^3.3.2
- sweetalert2: ^11.14.3

## Pré-Requisitos
- Node.js instalado
- NPM instalado

## Rodando localmente

Clone o projeto
```bash
  git clone https://github.com/Alan-oliveir/MyMovies
```

Entre no diretório do projeto
```bash
  cd MyMovies
```

Instale as dependências
```bash
  npm install
```

Crie um arquivo .env na raiz do projeto com sua chave da OMDB API
```bash
  OMDB_API_KEY="sua-chave-api-aqui"
```

Inicie o servidor
```bash
  npm run start
```

Acesse a aplicação no navegador em http://localhost:3000

___
## Agradecimentos
Este projeto foi inspirado no gerenciador de playlist de filmes do curso [JavaScript Impressionador da Hashtag](https://portalhashtag.com/), com algumas modificações como a inclusão do Express, SweetAlert e melhorias na usabilidade.  
<br>
No processo de desenvolvimento, o ChatGPT e Copilot foram utilizados como ferramentas auxiliares, fornecendo sugestões de melhorias e correção de erros através da IA. O uso da IA permitiu acelerar o aprendizado e tornar o desenvolvimento mais eficiente.

## Contribuição  
Se você quiser contribuir com o projeto, sinta-se à vontade para enviar uma pull request ou abrir uma issue.

## Licença
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  
Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE.md](https://github.com/Alan-oliveir/MyMovies/blob/main/LICENSE.md) para mais detalhes.






