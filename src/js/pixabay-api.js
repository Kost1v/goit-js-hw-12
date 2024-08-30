import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchedQuery, page) => {
  const axiosParam = {
    params: {
      key: '45540083-4d95202277f3d237cb6fcfd23',
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  };

  return axios.get(`${BASE_URL}`, axiosParam);
};
