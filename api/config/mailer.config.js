const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  },
  tls: {
    rejectUnauthorized: false
  } 
});

module.exports.sendUserConfirmationEmail = (user) => {
  transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: `¡Holi, ${user.name}! Por favor, confirma tu cuenta - VeggieMAD`,
    html: `<h1>${user.name}, gracias por registrarte en VeggieMad</h1>
    <p>Para acceder, confirma tu cuenta haciendo clic en este enlace 
    y descubre tu próximo plan veggie en Madrid</p>
    <a href='${process.env.API_URL}/users/${user.id}/confirm'>Confirmar mi cuenta</a>
    ¡Nos vemos muy pronto! 🐻🥦`
  })
  .then((info) => console.info(info))
  .catch((error) => console.error(error));
};

module.exports.sendBusinessConfirmationEmail = (business) => {
  transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: business.email,
    subject: `¡Holi, ${business.name}! Por favor, confirma tu cuenta - VeggieMAD`,
    html: `<h1>${business.name}, gracias por registrarte en VeggieMad</h1>
    <p>Para acceder, confirma tu cuenta haciendo clic en este enlace, edita tu perfil 
    y comienza a disfrutar de la plataforma</p>
    <a href='${process.env.API_URL}/businesses/${business.id}/confirm'>Confirmar mi cuenta</a>
    ¡Nos vemos muy pronto! 🐻🥦`
  })
  .then((info) => console.info(info))
  .catch((error) => console.error(error));
};