import axios from 'axios';

const API_KEY = '19462317-9864fc13c2867a4042c7cafcd';
const repPage = 12;
export const FetchQuery = async (query, page) => {
  const responce = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${repPage}`
  );
  return responce.data;
};
