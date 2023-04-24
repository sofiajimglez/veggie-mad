require('dotenv').config();

const express = require('express');
const logger = require('morgan'); //shows http requests in the terminal
const createError = require('http-errors');
const helmet = require('helmet'); //helps secure by setting various HTTP headers
const secure = require('./middlewares/secure.mid');

/* Load configuration */
require('./config/db.config');

const app = express();

app.use(require('./config/cors.config')); //domains that are allowed to make requests to the api
app.use(express.json());
app.use(logger('dev')); //morgan's middleware
app.use(helmet()); //helmet's middleware 
app.use(secure.cleanBody); //deletes inputs from req.body

app.use('/api/v1', require('./config/routes.config')); //configures the router

/* Error handling */
app.use((req, res, next) => next(createError(404, 'Ruta no encontrada')));
app.use('/api/v1', require('./middlewares/errors.mid'));

/* Port */
const port = process.env.PORT || '3001';
app.listen(port, () => console.info(`Application running at port ${port} 🐻🥦`));