const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const principalController = require('../controllers/principalController');
const usuariosController = require('../controllers/usuariosController');
const nominaController = require('../controllers/nominaController');
const verification = require("../middlewares/verification");

module.exports = () => {
  router.get('/', loginController.login);
  //router.get('/principal', principalController.principal);
  router.get('/usuarios', verification.revisarCookie, usuariosController.usuarios);
  router.get('/nomina', verification.revisarCookie, nominaController.nomina);

  router.post('/auth', loginController.authenticate);
  router.post('/guardarCambios', verification.revisarCookie, usuariosController.guardarCambios);
  //router.get('/getUsuario', verification.getUserData);

  return router;
};
