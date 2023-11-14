const EmpleadoModel = require('../models/EmpleadoModel');

module.exports.salarios = (req,res) => {
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