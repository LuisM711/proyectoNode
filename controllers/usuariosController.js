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
    const userData = verification.getUserData(req, res); // Obtén los datos del usuario sin enviarlos al cliente

    // if (userData) {
    //     console.log('Datos del usuario:', userData); // Muestra los datos en el console.log del servidor

    //     // Puedes tomar decisiones basadas en userData aquí
    // }
    const idEmpleado = req.body.idEmpleado;
    const username = req.body.username;
    const role = req.body.role;
    const isActive = req.body.isActive === "on" || false;

    EmpleadoModel.actualizarEmpleado(req.db, idEmpleado, username, role, isActive, (err) => {
        if (err) {
            res.redirect("/usuarios");
        } else {
            if(userData.id == idEmpleado)res.render('login', { error: 'El usuario ha sido modifiado' });
            else res.redirect("/usuarios");
        }
    });
};