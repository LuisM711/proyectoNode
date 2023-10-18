const EmpleadoModel = require('../models/EmpleadoModel');

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
    const idEmpleado = req.body.idEmpleado;
    const username = req.body.username;
    const role = req.body.role;
    const isActive = req.body.isActive === "on" || false;

    EmpleadoModel.actualizarEmpleado(req.db, idEmpleado, username, role, isActive, (err) => {
        if (err) {
            res.redirect("/usuarios");
        } else {
            res.redirect("/usuarios");
        }
    });
};
