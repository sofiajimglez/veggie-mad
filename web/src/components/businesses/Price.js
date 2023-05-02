import React from 'react'

export default function Price({ price }) {

  function renderPrice(num) {
    let stars = '';
    for (let i = 0; i < num; i++) {
      stars += '€';
    }
    return stars;
  }

  return (
    <>{renderPrice(price)}</>
  )
}
