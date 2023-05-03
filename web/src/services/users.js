import http from './base-api';

const create = (user) => http.post('/users', user);

const login = (user) => http.post('/login/users', user);

const get = (id) => http.get(`/users/${id}`);

const update = (user, updatedUser) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  const data = new FormData();
  data.append('username', updatedUser.username);
  data.append('name', updatedUser.name);
  data.append('email', updatedUser.email);
  data.append('location', updatedUser.location);
  data.append('imageUrl', updatedUser.imageUrl[0]);
  return http.patch(`/users/${user.id}`, data);
}

const remove = (id) => http.delete(`/users/${id}`);

export default {
  create,
  login,
  get,
  remove,
  update
}