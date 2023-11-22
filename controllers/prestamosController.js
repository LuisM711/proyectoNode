const peticionesPrestamosModel = require("../models/PeticionesPrestamosModel");
const EmpleadoModel = require("../models/EmpleadoModel");
const verification = require("../middlewares/verification");

module.exports.prestamos = (req, res) => {
    const userData = verification.getUserData(req, res);
    EmpleadoModel.getSalariosDetalle(req.db, userData.id, (err, results)=>{
        if(err)
        {
            console.log(`Hubo un error ${err}`);
            res.render('principal',
            {
                datos: {
                    error: "Hubo un erro al realizar la consulta"
                }
            })
        }
        const sumatoria = results.reduce((total, row) => total + row.MONTO, 0);
        res.render('prestamos',
            {
                datos: {
                    Nombre : userData.Nombre,
                    deuda: sumatoria
                }
            })
    });
    
    
}
module.exports.requestPrestamo = (req, res) => {
    const userData = verification.getUserData(req, res);
    const datos = {
        idemp: userData.id,
        monto: req.body.monto,
        descripcion: req.body.descripcion
    }
    peticionesPrestamosModel.requestPrestamo(req.db, datos, (err) => {
        if (err) {
            res.status(500).json({ response: 'Hubo un error al solicitar el prestamo' });
        } else {
            res.status(200).json({ response: 'Prestamo solicitado' });
        }
    });
}