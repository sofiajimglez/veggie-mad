import React from 'react'

export default function Header({ title }) {
  return (
    <div className="header container-fluid" style={{background: '#A7C565'}}>
      <div className="container py-2 mb-4">
        <h6 className="fs-5 fw-light m-0">{title}</h6>
      </div>
    </div>
  )
}
