import http from './base-api';

const create = (business) => http.post('/businesses', business);

const login = (business) => http.post('/login/businesses', business);

const list = () => http.get('/businesses');

const get = (id) => http.get(`/businesses/${id}`);

const update = (id, business) => http.patch(`/businesses/${id}`, business);

const remove = (id) => http.delete(`/businesses/${id}`);

const fav = (id) => http.post(`/businesses/${id}/fav`);

export default {
  create,
  login, 
  get,
  remove,
  update,
  list,
  fav
}