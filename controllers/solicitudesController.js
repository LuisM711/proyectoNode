const peticionesPrestamosModel = require("../models/PeticionesPrestamosModel");
const DescuentosModel = require("../models/DescuentosModel");
const verification = require("../middlewares/verification");
module.exports.solicitudes = (req, res) => {
    const userData = verification.getUserData(req, res);
    if (userData.rango === 1) {

        peticionesPrestamosModel.getAllSolicitudes(req.db, (err, results) => {
            if (err) {
                console.error('Error al guardar cambios en la base de datos: ' + err.message);
            } else {
                res.render('solicitudes',
                    {
                        datos: {
                            ...results
                        }
                    })
            }
        });
    }
    else {
        res.render('principal', {
            datos: {
                error: 'No tienes permisos',
                ...userData
            }
        });
    }
}
module.exports.aprobacionPrestamo = (req, res) => {
    const datos = req.body;
    peticionesPrestamosModel.borrarSolicitud(req.db, datos, (err, results) => {
        if (err) {
            console.error('Error al guardar cambios en la base de datos: ' + err.message);
            res.status(500).json({ response: 'Hubo un error al aprobar el prestamo, los datos fueron modificados' });
        } else {
            if (datos.aprobado) {
                DescuentosModel.agregarPrestamo(req.db, datos, (err, results) => {
                    //console.log(err);
                    if (err) {
                        console.error('Error al guardar cambios en la base de datos: ' + err.message);
                        res.status(500).json({ response: 'Hubo un error al aprobar el prestamo, los datos fueron modificados' });
                    }
                    else {
                        res.status(200).json({ response: 'Prestamo aprobado' });
                    }
                });

            }
            else
                res.status(200).json({ response: 'Prestamo rechazado' });

        }
    });
}