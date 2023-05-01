import http from './base-api';

const comment = (businessId, reviewId, comment) => http.post(`/businesses/${businessId}/review/${reviewId}/comment`, comment);

export default {
  comment
}