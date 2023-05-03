import http from './base-api';

const create = (business) => http.post('/businesses', business);

const login = (business) => http.post('/login/businesses', business);

const list = () => http.get('/businesses');

const get = (id) => http.get(`/businesses/${id}`);

const update = (business, updatedBusiness) => {
  const data = new FormData();
  data.append('username', updatedBusiness.username);
  data.append('name', updatedBusiness.name);
  data.append('email', updatedBusiness.email);
  data.append('location', updatedBusiness.location);
  data.append('imageUrl', updatedBusiness.imageUrl[0]);
  return http.patch(`/businesses/${business.id}`, updatedBusiness);
};

const remove = (id) => http.delete(`/businesses/${id}`);

const fav = (id) => http.post(`/businesses/${id}/fav`);

const visit = (id, visit) => http.post(`/businesses/${id}/visit`, visit);

export default {
  create,
  login, 
  get,
  remove,
  update,
  list,
  fav,
  visit
}