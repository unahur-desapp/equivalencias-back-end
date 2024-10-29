const path = require('path');
const debug = require('debug');
const parse = require('pg-connection-string').parse;
const dotenv = require('dotenv');

function getEnvironment() {
  return process.env.NODE_ENV || 'development';
}

function initializeEnv() {
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${getEnvironment()}`),
  });
}

function parseHerokuUrlIfPresent() {
  const url = process.env.DATABASE_URL;

  if (url === undefined) {
    return {};
  }

  const config = parse(url);

  // Heroku necesita sí o sí SSL, y para eso hay que habilitar el driver nativo.
  return {
    ...config,
    username: config.user,
    native: true,
  };
}

function normalizePort(val) {
  const portNum = parseInt(val, 10);

  if (Number.isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}

function initializeConfig() {
  var environment = getEnvironment();
  console.log("NODE_ENV:", process.env.NODE_ENV); // <-- Verifica aquí
  console.log("Environment detected by getEnvironment:", environment); // <-- Verifica aquí
  let dbConfig = {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST || 'localhost',
    port: process.env.SQL_PORT || '5432',
    dialect: 'postgresql',
    logging: debug('sequelize'),
  };
  if 
  (environment === 'test') {
    dbConfig.database = process.env.SQL_TEST_DATABASE; // Base de datos de prueba
    environment = "test";
  }
  else if (environment === 'development') {
    dbConfig.database = process.env.SQL_DATABASE; // Base de datos de desarrollo
    dbConfig.seederStorage = 'sequelize';
    environment = "development";
  } else if (environment === 'production') {
    dbConfig = { ...dbConfig, ...parseHerokuUrlIfPresent() }; // falta la configuración para producción
  }


  console.log(`Conectado a la base: ${dbConfig.database} `);

  return {
    db: dbConfig,
    port: normalizePort(process.env.PORT || '3001'),
  };
}
initializeEnv();

module.exports = initializeConfig();
