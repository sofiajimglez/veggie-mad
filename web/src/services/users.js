import http from './base-api';

const create = (user) => http.post('/users', user);

const login = (user) => http.post('/login/users', user);

const get = (id) => http.get(`/users/${id}`);

const remove = (id) => http.delete(`/users/${id}`);

export default {
  create,
  login,
  get,
  remove
}