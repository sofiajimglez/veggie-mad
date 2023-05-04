import React from 'react'

export default function SocialMedia() {
  return (
    <>
      <h4 className='text-center mb-3 mt-5'>Síguenos en redes sociales</h4>
      <section className='row justify-content-center text-center align-items-center gap-4 mb-4'>
        <div className="col-md-1 social-icon py-3">
          <h5 className='mb-0'><i className="fa-brands fa-facebook-f"></i></h5>
        </div>
        <div className="col-md-1 social-icon py-3">
          <h5 className='mb-0'><i className="fa-brands fa-instagram"></i></h5>
        </div>
        <div className="col-md-1 social-icon py-3">
          <h5 className='mb-0'><i className="fa-brands fa-twitter"></i></h5>
        </div>
      </section>
    </>
  )
}
