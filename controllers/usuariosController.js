const EmpleadoModel = require('../models/EmpleadoModel');
const verification = require("../middlewares/verification");
module.exports.usuarios = (req, res) => {
    EmpleadoModel.getEmpleados(req.db, (err, empleadosData, cargosData) => {
        if (err) {
            res.status(500).send('Error en la consulta de empleados');
            return;
        }
        res.render('usuarios', {
            userData: req.app.locals.userData,
            empleadosData,
            cargosData
        });
    });
};


module.exports.guardarCambios = (req, res) => {
    const userData = verification.getUserData(req, res);
    EmpleadoModel.actualizarEmpleado(req.db, req.body, (err) => {
        if (err) {
            res.redirect("/usuarios");
        } else {
            if (userData.id == req.body.idEmpleado) {
                res.render('login', {error: "El usuario ha sido actualizado, por favor inicia sesión de nuevo"});
            }
            else res.redirect("/usuarios");
        }
    });
};