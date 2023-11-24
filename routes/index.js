const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const usuariosController = require('../controllers/usuariosController');
const documentosimportantesController = require('../controllers/documentosController');
const nominaController = require('../controllers/nominaController');
const solicitudesController = require('../controllers/solicitudesController');
const impuestosController = require('../controllers/impuestosController');
const salariosController = require('../controllers/salariosController');
const prestamosController = require('../controllers/prestamosController');
const verification = require("../middlewares/verification");

module.exports = () => {
  router.get('/', loginController.login);
  router.get('/documentosimportantes', documentosimportantesController.documentosimportantes);
  router.get('/usuarios', verification.revisarCookie, usuariosController.usuarios);
  router.get('/solicitudes', verification.revisarCookie, solicitudesController.solicitudes);
  router.get('/nomina', verification.revisarCookie, nominaController.nomina);
  router.get('/prestamos', verification.revisarCookie, prestamosController.prestamos);
  router.get('/impuestos', verification.revisarCookie, impuestosController.impuestos);
  router.get('/salarios', verification.revisarCookie, salariosController.salarios);
  router.get('/detallesDeducciones/:idEmpleado',verification.revisarCookie,salariosController.salariosDetalle);
  router.get('/empleados/:idEmpleado', verification.revisarCookie, usuariosController.getEmpleadoById);
  router.get('/logout', loginController.logout);
  

  router.post('/guardarCambios', verification.revisarCookie, usuariosController.guardarCambios);
  router.post('/requestPrestamo', verification.revisarCookie, prestamosController.requestPrestamo);
  router.post('/auth', loginController.authenticate);
  router.post('/agregarImpuesto', verification.revisarCookie, impuestosController.agregarImpuesto);
  router.post('/agregarUsuario', verification.revisarCookie, usuariosController.agregarUsuario);

  router.put('/guardarDetallesEmpleado/:idEmpleado',verification.revisarCookie, salariosController.actualizarDatos);
  router.put('/actualizarImpuesto', verification.revisarCookie, impuestosController.actualizarImpuesto);


  router.delete('/aprobacionPrestamo', verification.revisarCookie, solicitudesController.aprobacionPrestamo);
  router.delete('/borrarImpuesto', verification.revisarCookie, impuestosController.borrarImpuesto);

  return router;
};
