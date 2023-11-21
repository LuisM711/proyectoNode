const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const principalController = require('../controllers/principalController');
const usuariosController = require('../controllers/usuariosController');
const nominaController = require('../controllers/nominaController');
const salariosController = require('../controllers/salariosController');
const prestamosController = require('../controllers/prestamosController');
const verification = require("../middlewares/verification");

module.exports = () => {
  router.get('/', loginController.login);
  //router.get('/principal', principalController.principal);
  router.get('/usuarios', verification.revisarCookie, usuariosController.usuarios);
  router.get('/nomina', verification.revisarCookie, nominaController.nomina);
  router.get('/prestamos', verification.revisarCookie, prestamosController.prestamos);
  router.get('/salarios', verification.revisarCookie, salariosController.salarios);
  router.get('/detallesDeducciones/:idEmpleado',verification.revisarCookie,salariosController.salariosDetalle);
  router.post('/auth', loginController.authenticate);
  router.get('/logout', loginController.logout);
  router.post('/guardarCambios', verification.revisarCookie, usuariosController.guardarCambios);
  router.get('/empleados/:idEmpleado', verification.revisarCookie, usuariosController.getEmpleadoById);
  router.put('/guardarDetallesEmpleado/:idEmpleado',verification.revisarCookie, salariosController.actualizarDatos);

  return router;
};
