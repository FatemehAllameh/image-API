// ELEMENTS
const loadingImage = document.querySelector(".loading-img");
const errorMessage = document.querySelector(".error-message");
const notFoundImage = document.querySelector(".not-found-img");
const condition = document.querySelector(".condition");
const imagesList = document.querySelector(".images-list");
const pagination = document.querySelector(".pagination");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const pageButtons = document.querySelectorAll(".page-btn");
const headerTitle = document.querySelector(".header-title");

// API DATA
const API_KEY = "-YY31AzwG_-O8OwqzNv-sIalvtupZMnQVZenixjoej8";
const API_URL = `https://api.unsplash.com/photos?page=1&client_id=${API_KEY}`;
const API_SEARCH = `https://api.unsplash.com/search/photos?page=1&client_id=${API_KEY}&query=`;

let currentURL = null;

// Get Photos From API
const getPhotos = async (url) => {
  currentURL = url;
  try {
    const response = await fetch(url);
    const data = await response.json();

    condition.style.display = "none";
    imagesList.style.display = "grid";
    pagination.style.display = "flex";

    showPhotos(data);
  } catch (err) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = err.message;
    loadingImage.style.display = "none";
    pagination.style.display = "none";
  }
};

// Show Photos In DOM
const showPhotos = (data) => {
  imagesList.innerHTML = "";
  const photos = Array.isArray(data) ? data : data.results;
  if (photos.length) {
    photos.forEach((photo) => {
      const { urls } = photo;
      const image = `
        <img src="${urls.regular}" alt="image" class="image" />`;
      imagesList.innerHTML += image;
    });
  } else {
    notFoundImage.style.display = "block";
    pagination.style.display = "none";
  }
};

// Search Photos From API
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // active first page button
  pageButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector("[data-page='1']").classList.add("active");

  const searchValue = searchInput.value;
  if (searchValue) {
    searchInput.value = "";
    loadingImage.style.display = "block";
    notFoundImage.style.display = "none";
    imagesList.style.display = "none";
    pagination.style.display = "none";
    getPhotos(API_SEARCH + searchValue);
  }
});

pageButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    pageButtons.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const splitedURL = currentURL.split("?");
    const params = new URLSearchParams(splitedURL[1]);
    const page = btn.dataset.page;
    params.set("page", page);

    loadingImage.style.display = "block";
    notFoundImage.style.display = "none";
    imagesList.style.display = "none";
    pagination.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });

    getPhotos(splitedURL[0] + "?" + params.toString());
  });
});

headerTitle.addEventListener("click", () => {
  getPhotos(API_URL);
});

// Initial Call API
getPhotos(API_URL);
