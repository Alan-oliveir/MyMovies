const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

async function searchButtonClickHandler() {
  try {
    let url = `/api/search?movieName=${movieNameParameterGenerator()}${
      movieYear.value ? `&movieYear=${movieYearParameterGenerator()}` : ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    createModal(data);
    overlay.classList.add("open");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: error.message,
      confirmButtonText: "Ok",
    });
  }
}

function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }

  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido.");
  }
  return movieYear.value;
}

function addToList(data) {
  if (isFilmAlreadOnList(data.imdbID)) {
    Swal.fire({
      icon: "warning",
      title: "Aviso",
      text: "Filme já está na lista.",
      confirmButtonText: "Ok",
    });
    return;
  }

  movieList.push(data);
  updateLocalStorage();
  updateUI(data);
  overlay.classList.remove("open");
}

function updateUI(data) {
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

function isFilmAlreadOnList(imdbID) {
  function isThisIdFromThisMovie(movie) {
    return movie.imdbID === imdbID;
  }
  return movieList.find(isThisIdFromThisMovie);
}

function removeFilmFromList(imdbID) {
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
    if (result.isConfirmed) {
      movieList = movieList.filter((movie) => movie.imdbID !== imdbID);
      document.getElementById(`movie-card-${imdbID}`).remove();
      updateLocalStorage();

      Swal.fire({
        icon: "success",
        title: "Removido!",
        text: "O filme foi removido da lista.",
        confirmButtonText: "Ok",
      });
    }
  });
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

movieList.forEach(updateUI);

searchButton.addEventListener("click", searchButtonClickHandler);
