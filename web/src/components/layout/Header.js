import React from 'react'

export default function Header({ title }) {
  return (
    <div className="header container-fluid bg-light">
      <div className="container py-2 mb-4">
        <h1 className="fs-5 fw-light m-0">{title}</h1>
      </div>
    </div>
  )
}
