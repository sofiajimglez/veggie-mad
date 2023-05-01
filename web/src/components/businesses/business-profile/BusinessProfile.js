import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthUserStore';
import SidebarMenuBusiness from './SidebarMenuBusiness';
import BusinessUpdateForm from './BusinessUpdateForm';
import BusinessReviews from './BusinessReviews';


export default function BusinessProfile() {

  const { user } = useContext(AuthContext);
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div className='row'>
      <div className={expandSidebar ? 'd-none d-md-grid col-md-2 col-lg-1' : 'col-sm-12 col-md-4 col-lg-3'}>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light mx-auto h-auto">
          <button className='btn btn-sm text-end d-none d-md-block' onClick={() => setExpandSidebar(!expandSidebar)}><i className={`fa-solid fa-2xl ${expandSidebar ? 'fa-square-caret-right' : 'fa-square-caret-left'}`}></i></button>
          <hr className='d-none d-md-block' />
          <SidebarMenuBusiness isExpanded={expandSidebar} user={user} />
        </div>
      </div>
      <div className={expandSidebar ? 'col-sm-12 col-md-8 col-lg-11' : 'col-sm-12 col-md-8 col-lg-9'}>
        <BusinessReviews user={user} />
        <BusinessUpdateForm business={user} />
      </div>
    </div>
  )
}
