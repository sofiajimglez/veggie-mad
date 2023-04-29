import http from './base-api';

const create = (business) => http.post('/businesses', business)
  .then(res => res.data);

const login = (business) => http.post('/login/businesses', business)
  .then(res => res.data);

export default {
  create,
  login
}