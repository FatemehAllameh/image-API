// ELEMENTS
const loadingImage = document.querySelector(".loading-img");
const errorMessage = document.querySelector(".error-message");
const pagination = document.querySelector(".pagination");

// API DATA
const API_KEY = "-YY31AzwG_-O8OwqzNv-sIalvtupZMnQVZenixjoej8";
const API_URL = `https://api.unsplash.com/photos/?client_id=${API_KEY}`;

const getPhotos = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    errorMessage.style.display = "none";
    loadingImage.style.display = "none";
    pagination.style.display = "flex";

    showPhotos(data);
  } catch (err) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = err.message;
    loadingImage.style.display = "none";
    pagination.style.display = "none";
  }
};

const showPhotos = () => {};

getPhotos(API_URL);
