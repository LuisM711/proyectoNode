module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.authenticate = (req, res) => {
    const db = req.db;
    const { Usuario, Contra } = req.body; // Asumiendo que estás enviando estos valores desde un formulario

    // Consulta para verificar las credenciales en la tabla empleados
    const sql = 'SELECT * FROM empleados WHERE Usuario = ? AND Contra = ?';

    db.query(sql, [Usuario, Contra], (err, results) => {
        //console.log([err, results]);
        if (err) {
            console.error('Error en la consulta: ' + err.message);
            res.status(500).send('Error en la consulta');
            return;
        }

        if (results.length > 0) {
            const userData = {
                usuario: results[0].Usuario,
                nombre: results[0].Nombre,
                rango: results[0].Rango // Reemplaza con el nombre correcto del campo en tu base de datos
            };

            //app.locals.userData = userData;
            if(results[0].Alta)
            res.render('principal'); // Cambia "/inicio" a la ruta deseada.
            else res.render('login', { error: 'El usuario existe pero está dado de baja' });
        } else {
            // Credenciales incorrectas, muestra un mensaje de error.
            res.render('login', { error: 'Credenciales incorrectas' });
        }
    });
};
