const ImpuestosModel = require('../models/ImpuestosModel');
const verification = require("../middlewares/verification");

module.exports.impuestos = (req, res) => {

    ImpuestosModel.getImpuestos(req.db, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        res.render('impuestos', {
            datos: results
        });
    });
}



module.exports.actualizarImpuesto = (req, res) => {
    const nombre = req.body.nombre;
    const porcentaje = req.body.porcentaje;
    ImpuestosModel.actualizarImpuesto(req.db, nombre, porcentaje, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en la actualizacion del impuesto');
            return;
        }
        res.status(200).send('Prestamo actualizado');
    });
};
module.exports.agregarImpuesto = (req, res) => {
    const nombre = req.body.nombre;
    const porcentaje = req.body.porcentaje;
    ImpuestosModel.agregarImpuesto(req.db, nombre, porcentaje, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en la actualizacion del impuesto');
            return;
        }
        res.status(200).send('Prestamo actualizado');
    });
}
module.exports.borrarImpuesto = (req, res) => {
    const nombre = req.body.nombre;
    ImpuestosModel.borrarImpuesto(req.db, nombre, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en la actualizacion del impuesto');
            return;
        }
        res.status(200).send('Prestamo actualizado');
    });
}