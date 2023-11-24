impuestosModel = require('../models/ImpuestosModel.js');
module.exports.impuestos = (req, res) => {
    impuestosModel.getImpuestos(req.db, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        // res.render('impuestos', {
        //     datos:{
        //         ...results
        //     }
        // });
        res.render('impuestos', {
            datos: results
        });
    });
};
