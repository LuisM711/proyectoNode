const EmpleadoModel = require('../models/EmpleadoModel');

module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.authenticate = (req, res) => {
    const { Usuario, Contra } = req.body;

    EmpleadoModel.authenticate(req, Usuario, Contra, (err, results) => {
        if (err) {
            res.status(500).send('Error en la consulta');
            return;
        }

        if (results.length > 0) {
            const userData = {
                usuario: results[0].Usuario,
                nombre: results[0].Nombre,
                rango: results[0].Rango // Reemplaza con el nombre correcto del campo en tu base de datos
            };

            if (results[0].Alta) {
                res.render('principal'); // Cambia "/inicio" a la ruta deseada.
            } else {
                res.render('login', { error: 'El usuario existe pero está dado de baja' });
            }
        } else {
            res.render('login', { error: 'Credenciales incorrectas' });
        }
    });
};
