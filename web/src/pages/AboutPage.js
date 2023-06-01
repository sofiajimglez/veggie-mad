import PageLayout from "../components/layout/PageLayout";
import loginImg from '../assets/img/veggie-mad-login.png';

export default function AboutPage() {
  return (
    <PageLayout title='Desarrollado para el bootcamp de Full-Stack Development de Ironhack'>
      <div className="row">
        <div className="col-sm-12 col-md-3 align-items-center justify-content-center">
          <img className="w-100" src="https://res.cloudinary.com/dorpbnltc/image/upload/v1685641902/veggie-mad/veggie-mad-isotipo_y4aptg.png" alt="veggieMAD" />
        </div>
        <div className="col-sm-12 col-md-9 pt-md-4">
          <p><strong>veggieMAD</strong> es una plataforma web en la que los usuarios pueden <strong>descubrir y explorar</strong> negocios veganos en Madrid. Se dirige principalmente a personas interesadas en <strong>el veganismo y la sostenibilidad</strong>.</p>
          <p>Al proporcionar un <strong>directorio de negocios</strong> veganos, así como funcionalidades adicionales para mejorar la experiencia del usuario, la aplicación ayudaría a los usuarios a descubrir nuevas opciones veganas en Madrid y les animaría a <strong>tomar decisiones más conscientes</strong> con el medio ambiente.</p>
        </div>
      </div>

      <div className="row pt-4 mt-4 align-items-center">
        <div className="col-sm-12 col-md-8 pt-md-4">
        <h3>Sobre el proyecto</h3>
          <p>veggieMAD ha sido desarrollado como proyecto final del tercer módulo del <strong>bootcamp de Full-Stack Development de Ironhack</strong>. El objetivo era desarrollar una API REST (utilizando tecnologías como Nodejs, Express, MongoDB, Mongoose o Postman) y conectarla a una aplicación web desarrollada como SPA (Single Page Application) en React.</p>
          <p>Ironhack es una <strong>reconocida escuela tecnológica</strong>, ocupando el segundo puesto en el ranking global. A través de la impartición de bootcamps, Ironhack está comprometido con las personas que deseen <strong>transformar su trayectoria profesional</strong> y formar parte de una próspera comunidad de profesionales del sector tech apasionados por su trabajo.</p>
          <a href="https://www.ironhack.com/es/en" className="btn btn-second-line"><strong>More info about Ironhack</strong></a>
        </div>
        <div className="col-sm-12 col-md-4">
        <center><img src={loginImg} className='auth-img w-50' alt='VeggieMAD Logo' /></center>
        </div>
      </div>

      <div className="row pt-4 my-4 align-items-center">
        <div className="col-sm-12 col-md-3">
          <img className="rounded-circle mb-4 mt-sm-5" src="https://res.cloudinary.com/dorpbnltc/image/upload/v1685643453/veggie-mad/profile-sofia_qn9jil.png" alt="Ana Gutiérrez Ruiz" />
        </div>
        <div className="col-sm-12 col-md-9 pt-md-4">
          <h3>Sobre mí</h3>
          <p>¡Hola! 😊 Soy una programadora web junior con +5 años de experiencia en diseño gráfico y marketing digital.</p>
          <p>Recientemente, he decidido enfocar mi futuro profesional en el desarrollo web cursando el bootcamp de Desarrollo Web Full-Stack de Ironhack. En estos meses, he aprendido tecnologías como Javascript, HTML, CSS, NodeJS, Express, MongoDB y React. </p>
          <p>Me considero una profesional creativa y con una gran capacidad para aprender rápidamente, enfrentarme a nuevos retos y encontrar soluciones. En estos momentos, estoy buscando oportunidades como junior developer en las que poder seguir creciendo profesionalmente y aportar todos mis conocimientos y entusiasmo.</p>
          <a href="https://github.com/sofiajimglez" className="btn btn-main me-2"><i className="fa-brands fa-github pe-2"></i>GitHub</a>
          <a href="https://www.linkedin.com/in/sofiajimglez/" className="btn btn-main"><i className="fa-brands fa-linkedin-in pe-2"></i>LinkedIn</a>
        </div>
      </div>

    </PageLayout >
  )
};
