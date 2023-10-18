module.exports.usuarios = (req, res) => {
    const db = req.db;
    const sqlCargos = 'SELECT IDCargos, Cargos FROM cargos';

    // Realiza la consulta para obtener los datos de la tabla cargos
    db.query(sqlCargos, (err, resultadosCargos) => {
        if (err) {
            console.error('Error en la consulta de cargos: ' + err.message);
            res.status(500).send('Error en la consulta de cargos');
            return;
        }

        const sql = `
            SELECT
                e.IDEmp,
                e.Usuario,
                e.Cargo,
                c.Cargos AS Rango,
                e.Alta
            FROM nomina.empleados AS e
            INNER JOIN nomina.cargos AS c ON e.Cargo = c.IDCargos;
            `;
        
        // Realiza la consulta a la base de datos para obtener los datos de empleados con sus cargos
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error en la consulta: ' + err.message);
                res.status(500).send('Error en la consulta');
                return;
            }
            //console.log(resultadosCargos);
            // Pasa los resultados a la plantilla Pug para su renderización
            res.render('usuarios', {
                userData: req.app.locals.userData,
                empleadosData: results,
                cargosData: resultadosCargos
            });
        });
    });
};
module.exports.guardarCambios = (req, res) => {
    const db = req.db;
    //console.log(req.body);
    const idEmpleado = req.body.idEmpleado;
    const username = req.body.username;
    const role = req.body.role;
    const isActive = req.body.isActive === "on" || false;

    // Realiza las actualizaciones en la base de datos
    // Aquí debes usar la lógica y las consultas SQL necesarias para actualizar los datos

    // Ejemplo (usando módulo mysql para Node.js):
    const sql = "UPDATE empleados SET Usuario = ?, Cargo = ?, Alta = ? WHERE IDEmp = ?";
    const values = [username, role, isActive, idEmpleado];
    //res.json(req.body);
    //console.log(values);
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error al guardar cambios en la base de datos: ' + err.message);
            //res.status(500).send('Error al guardar cambios');
            res.redirect("/usuarios");
        } else {
            console.log('Cambios guardados en la base de datos');
            // Puedes enviar una respuesta de éxito si es necesario
            res.redirect("/usuarios");

        }
    });
};
