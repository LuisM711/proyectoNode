const EmpleadoModel = require('../models/EmpleadoModel');
module.exports.nomina = (req, res) => {
    res.render('nomina');
}
module.exports.calculoDeNomina = (req, res) => {
    let nomina = {};

    // nomina = {
    //     id: "ID",
    //     nombre: "Nombre",
    //     sueldoFinal: 10000
    // }
    EmpleadoModel.getNominaCalculada(req.db, 1, (err, results) => {
        if (err) {
            res.status(500).send('Error en la consulta de nomina');
            return;
        }
        //console.log(empleadosData);
        //console.log(empleadosDataDetalle);
        res.json(results);
    });

}