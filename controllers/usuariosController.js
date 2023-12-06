const EmpleadoModel = require('../models/EmpleadoModel');
const verification = require("../middlewares/verification");
module.exports.usuarios = (req, res) => {

    EmpleadoModel.getEmpleadosLight(req.db, (err, empleadosData, cargosData) => {
        if (err) {
            res.status(500).send('Error en la consulta de empleados');
            return;
        }
        //console.log(empleadosData);
        //console.log(cargosData);
        res.render('usuarios', {
            userData: req.app.locals.userData,
            empleadosData,
            cargosData
        });
    });
}



module.exports.agregarUsuario = (req, res) => {
    const userData = verification.getUserData(req, res);
    if (userData.rango === 1) {
        EmpleadoModel.agregarEmpleado(req.db, req.body, (err) => {
            if (err) {
                res.status(500).send('Error en la consulta de empleados');
                return;
            }
            res.redirect("/usuarios");
        });
    }
    else {
        //res.render('principal', { error: 'No tienes permisos'});
        res.render('principal', {
            datos: {
                error: 'No tienes permisos',
                ...userData
            }
        });
    }
}
module.exports.guardarCambios = (req, res) => {
    const userData = verification.getUserData(req, res);
    EmpleadoModel.actualizarEmpleado(req.db, req.body, (err) => {
        if (err) {
            res.redirect("/usuarios");
        } else {
            if (userData.id == req.body.idEmpleado) {
                const cookieName = 'jwt';
                res.clearCookie(cookieName);
                res.render('login', { error: "El usuario ha sido actualizado, por favor inicia sesión de nuevo" });
            }
            else res.redirect("/usuarios");
        }
    });
};
module.exports.getEmpleadoById = (req, res) => {
    const userData = verification.getUserData(req, res);
    //console.log(req.params);
    const idEmpleado = req.params.idEmpleado;

    EmpleadoModel.getEmpleadoById(req.db, idEmpleado, (err, empleado) => {
        if (err) {
            res.status(500).json({ error: 'Error en la consulta de empleado' });
        } else {
            res.json(empleado);
        }
    });
};
