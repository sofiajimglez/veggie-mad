import React from 'react';

export default function UserFavs({ user }) {

  const businesses = user.favs.map(business => business.business);

  return (
    <div>
      {businesses.map(business => business.name)}


    </div>
  )
}
