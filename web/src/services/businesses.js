import http from './base-api';

const login = (business) => http.post('/login/businesses', business)
  .then(res => res.data);

export default {
  login
}