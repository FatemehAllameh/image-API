const API_KEY = "-YY31AzwG_-O8OwqzNv-sIalvtupZMnQVZenixjoej8";
const API_URL = `https://api.unsplash.com/photos/?client_id=${API_KEY}`;

const getPhotos = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};
getPhotos(API_URL);
