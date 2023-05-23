import React from 'react'

export default function Footer() {
  return (
    <footer className="p-2 fixed-bottom w-100 bottom-0" data-bs-theme="dark">
      <div className="container d-flex justify-content-center align-items-baseline gap-2">
        <p className="mb-0">2023 © veggieMAD 🐻🥦 Sofía Jiménez González</p>
        <a href='https://github.com/sofiajimglez' className='mb-0 text-reset'><i className="fa-brands fa-github"></i></a>
        <a href='https://www.linkedin.com/in/sofiajimglez/' className='mb-0 text-reset'><i className="fa-brands fa-linkedin"></i></a>
      </div>
    </footer>
  )
}
