import React from 'react'
import Header from './Header'

export default function PageLayout({ title, children }) {
  return (
    <div className='page-layout'>
      <Header title={title} />
      <div className="container">
        {children}
      </div>
    </div>
  )
}
