import http from './base-api';

const create = (businessId, review) => http.post(`/businesses/${businessId}/review`, review);

const comment = (businessId, reviewId, comment) => http.post(`/businesses/${businessId}/review/${reviewId}/comment`, comment);

export default {
  comment,
  create
}