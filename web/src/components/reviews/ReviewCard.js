import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import es from "dayjs/locale/es";
import CommentForm from './CommentForm';
dayjs.extend(relativeTime);
dayjs.locale('es');

function renderStars(num) {
  let stars = '';
  for (let i = 0; i < num; i++) {
    stars += '⭐️';
  }
  return stars;
}

export default function ReviewCard({ review, user }) {
  const [seeCommentForm, setSeeCommentForm] = useState(false);

  return (
    <div className="card w-100 mb-4">
      <div className="card-body">
        <h4 className='my-2 fs-4'>{user?.role === 'user' ? review.business?.name :
          `${review.user?.name} (@${review.user?.username})`}</h4>

        <h5>{renderStars(review.rating)}<span className='ms-2 fw-light fs-6'>{review.rating}/5</span></h5>
        <hr />

        <p>{review.text}</p>

        <p className='fw-lighter fst-italic text-end fs-6 mb-0'>
          <i className="fa-regular fa-clock fa-xs me-2"></i>
          Publicada {dayjs(review.createdAt).fromNow()}
        </p>

        {review.comments?.length > 0 && review.comments.map(comment => <div className="bg-light p-3 my-4 rounded" key={review.id}>
          <h6>{user?.role === 'user' ? review.business?.name : user.name}</h6>
          <p className='mb-2'>{comment.text}</p>
          <p className='fw-lighter fst-italic text-end fs-6 mb-0'>
            <i className="fa-regular fa-clock fa-xs me-2"></i>
            Publicado {dayjs(review.createdAt).fromNow()}
          </p>
        </div>)}

        {user?.role === 'business'
          && <button className='btn btn-primary mb-3' onClick={() => setSeeCommentForm(!seeCommentForm)}>Responder</button>}
        {user?.role === 'business'
          && seeCommentForm
          && <CommentForm review={review.id} business={user.id} />}
      </div>
    </div>
  )
}
