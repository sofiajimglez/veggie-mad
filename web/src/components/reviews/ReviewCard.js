import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import es from "dayjs/locale/es";
dayjs.extend(relativeTime);
dayjs.locale('es');

function renderStars(num) {
  let stars = '';
  for (let i = 0; i < num; i++) {
    stars += '⭐️';
  }
  return stars;
}

export default function ReviewCard({ review }) {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h4 className='my-2 fs-4'>{review.business.name}</h4>
        <h5>{renderStars(review.rating)}<span className='ms-2 fw-light fs-6'>{review.rating}/5</span></h5>
        <hr />
        <p>{review.text}</p>
        <p className='fw-lighter fst-italic text-end fs-6 mb-0'><i className="fa-regular fa-clock fa-xs me-2"></i>Publicada {dayjs(review.createdAt).fromNow()}</p>
      </div>
    </div>
  )
}
