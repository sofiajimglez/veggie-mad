import http from './base-api';

const create = (business) => http.post('/businesses', business);

const login = (business) => http.post('/login/businesses', business);

const get = (id) => http.get(`/businesses/${id}`);

export default {
  create,
  login, 
  get
}