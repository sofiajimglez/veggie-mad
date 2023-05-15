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
  
  const isProfilePage = () => {
    return window.location.href.includes('profile');
  }

  console.log(isProfilePage());



  return (
    <div className="card w-100 mb-4">
      <div className="card-body">
        <h5 className='my-2 fs-5'>{user?.role === 'user' ? review.business?.name :
          `${review.user?.name} (@${review.user?.username})`}</h5>

        <h6>{renderStars(review.rating)}<span className='ms-2 fw-light fs-6'>{review.rating}/5</span></h6>
        <hr className='m-2' />

        <p className='mb-2'>{review.text}</p>

        <p className='fw-lighter fst-italic text-end small-text mb-0'>
          <i className="fa-regular fa-clock fa-xs me-2"></i>
          Publicada {dayjs(review.createdAt).fromNow()}
        </p>

        {review.comments?.length > 0 && review.comments.map(comment => <div className="bg-light p-3 my-2 rounded" key={review.id}>
          <h6>{user?.role === 'user' ? review.business?.name : user.name} <span className='fw-lighter fst-italic small-text'>(propietario)</span></h6>
          <p className='mb-2'>{comment.text}</p>
          {/* <p className='fw-lighter fst-italic text-end mb-0 small-text'>
            <i className="fa-regular fa-clock fa-xs me-2"></i>
            Publicado {dayjs(review.createdAt).fromNow()}
          </p> */}
        </div>)}

        {user?.role === 'business' 
          && isProfilePage()
          && <button className='btn btn-second mb-1' onClick={() => setSeeCommentForm(!seeCommentForm)}>Responder</button>}
        {user?.role === 'business' 
          && isProfilePage()
          && seeCommentForm
          && <CommentForm review={review.id} business={user.id} />}
      </div>
    </div>
  )
}
