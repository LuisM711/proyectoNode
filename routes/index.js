const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const principalController = require('../controllers/principalController');
const usuariosController = require('../controllers/usuariosController');
const nominaController = require('../controllers/nominaController');

module.exports = () => {
  router.get('/', loginController.login);
  //router.get('/principal', principalController.principal);
  router.get('/usuarios', usuariosController.usuarios);
  router.get('/nomina', nominaController.nomina);

  router.post('/auth', loginController.authenticate);
  router.post('/guardarCambios', usuariosController.guardarCambios);

  return router;
};
