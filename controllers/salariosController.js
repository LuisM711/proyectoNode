const EmpleadoModel = require('../models/EmpleadoModel');

module.exports.salarios = (req, res) => {
    EmpleadoModel.getSalarios(req.db, (err, empleadosData) => {
        if (err) {
            res.status(500).send('Error en la consulta de empleados');
            return;
        }
        //console.log(empleadosData);
        //console.log(cargosData);
        res.render('salarios', {
            userData: req.app.locals.userData,
            empleadosData
        });
    });
}
module.exports.salariosDetalle = (req, res) => {
    const idEmpleado = req.params.idEmpleado;

    EmpleadoModel.getSalariosDetalle(req.db, idEmpleado, (err, empleadosDataDetalle) => {
        if (err) {
            res.status(500).send('Error en la consulta de empleados');
            return;
        }
        //console.log(empleadosData);
        //console.log(cargosData);
        res.json(empleadosDataDetalle);
    });
}
module.exports.actualizarDatos = (req, res) => {
    //actualizarSueldo(db,idEmp,sueldo, callback)
    const idEmpleado = req.params.idEmpleado;
    //console.log(req.body);
    // res.json(req.body);

    EmpleadoModel.actualizarSueldoDeducciones(req.db, idEmpleado,req.body.sueldoMensual,req.body.detalles, (err, empleadosDataDetalle) => {
        if (err) {
            res.status(500).send('Error en la consulta de empleados');
            return;
        }
        
    });



    res.redirect("/salarios");
}