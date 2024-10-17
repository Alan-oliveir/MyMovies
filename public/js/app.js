// Seleciona os elementos necessários do DOM
const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

// Recupera a lista de filmes armazenada no localStorage ou cria uma lista vazia caso não exista
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

// Handler para o evento de clique no botão de busca
async function searchButtonClickHandler() {
  try {
    // Constrói a URL da API com os parâmetros do nome e ano do filme
    let url = `/api/search?movieName=${movieNameParameterGenerator()}${
      movieYear.value ? `&movieYear=${movieYearParameterGenerator()}` : ""
    }`;

    // Faz uma requisição à API para buscar informações sobre o filme
    const response = await fetch(url);
    const data = await response.json();

    // Verifica se houve algum erro na resposta da API
    if (data.error) {
      throw new Error(data.error);
    }

    // Cria e exibe o modal com as informações do filme
    createModal(data);
    overlay.classList.add("open");
  } catch (error) {
    // Exibe um alerta de erro com SweetAlert2 em caso de falha
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: error.message,
      confirmButtonText: "Ok",
    });
  }
}

// Gera o parâmetro do nome do filme para a URL da API
function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}

// Gera o parâmetro do ano do filme para a URL da API
function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }
  // Verifica se o ano tem exatamente 4 dígitos e se é um número válido
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido.");
  }
  return movieYear.value;
}

// Adiciona um filme à lista e atualiza a interface e o armazenamento local
function addToList(data) {
  // Verifica se o filme já está na lista
  if (isFilmAlreadOnList(data.imdbID)) {
    // Exibe um alerta se o filme já estiver na lista
    Swal.fire({
      icon: "warning",
      title: "Aviso",
      text: "Filme já está na lista.",
      confirmButtonText: "Ok",
    });
    return;
  }
  // Adiciona o filme à lista, atualiza o localStorage e a UI
  movieList.push(data);
  updateLocalStorage();
  updateUI(data);
  overlay.classList.remove("open");
}

// Atualiza a interface para exibir o novo filme na lista
function updateUI(data) {
  // Adiciona o novo cartão do filme na interface
  movieListContainer.innerHTML += `<article id='movie-card-${data.imdbID}'>
    <img
      src="${data.Poster}"
      alt="Poster do ${data.Title}."
    />
    <button class="remove-button" onclick='{removeFilmFromList("${data.imdbID}")}'>
      <i class="bi bi-trash"></i> Remover
    </button>
  </article>`;
}

// Verifica se um filme já está na lista de filmes
function isFilmAlreadOnList(imdbID) {
  function isThisIdFromThisMovie(movie) {
    return movie.imdbID === imdbID;
  }
  return movieList.find(isThisIdFromThisMovie);
}

// Remove um filme da lista após a confirmação do usuário
function removeFilmFromList(imdbID) {
  // Exibe um modal de confirmação para o usuário usando SweetAlert2
  Swal.fire({
    title: "Tem certeza?",
    text: "Tem certeza que deseja remover o filme da lista?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, remover!",
    cancelButtonText: "Não",
  }).then((result) => {
    // Se o usuário confirmar, remove o filme da lista
    if (result.isConfirmed) {
      movieList = movieList.filter((movie) => movie.imdbID !== imdbID);
      document.getElementById(`movie-card-${imdbID}`).remove();
      updateLocalStorage();

      // Exibe um modal de sucesso após a remoção
      Swal.fire({
        icon: "success",
        title: "Removido!",
        text: "O filme foi removido da lista.",
        confirmButtonText: "Ok",
      });
    }
  });
}

// Atualiza o localStorage com a lista de filmes atualizada
function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

// Carrega os filmes da lista ao iniciar a página
movieList.forEach(updateUI);

// Adiciona o evento de clique ao botão de busca
searchButton.addEventListener("click", searchButtonClickHandler);
