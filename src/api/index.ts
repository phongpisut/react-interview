import axios from 'axios'

export const Axios = axios.create({
    baseURL: 'https://cdn.contentful.com/spaces/vveq832fsd73/entries',
  });

Axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_TOKEN}`;
