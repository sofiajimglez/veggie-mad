import http from './base-api';

const create = (user) => http.post('/users', user);

const login = (user) => http.post('/login/users', user);

const get = (id) => http.get(`/users/${id}`);

const update = (user, id) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  const data = new FormData();
  data.append('name', user.name);
  data.append('name', user.name);
  data.append('image', user.image[0]);
  return http.patch(`/users/${id}`, data)
}

const remove = (id) => http.delete(`/users/${id}`);

export default {
  create,
  login,
  get,
  remove,
  update
}