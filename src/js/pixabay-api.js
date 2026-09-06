import axios from 'axios';


const API_KEY = '57443063-5f386e005ea466bbe0c4b67c4';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

 
  const response = await axios.get(BASE_URL, { params });
  

  return response.data;
}