/*

*/
class EmpleadoModel {
    static actualizarSueldoDeducciones(db,idEmp,sueldo,detalles, callback) {
        console.log("DATOOOOOOOOOOS");
        console.log(idEmp,sueldo,detalles);
        const sql = `
                    update empleados set SueldoMensual = ${sueldo} where IDEmp = ${idEmp};
                `;
                db.query(sql, (err, results) => {
                    if (err) {
                        console.error('Error en la consulta: ' + err.message);
                        callback(err, null, null);
                    } else {
                        callback(null, results);
                    }
                });
    }
    static getEmpleadosLight(db, callback) {
        const sqlCargos = 'SELECT IDCargos, Cargos FROM cargos';
        db.query(sqlCargos, (err, resultadosCargos) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null, null);
            } else {
                const sql = `
                    SELECT
                        e.IDEmp,
                        e.Usuario,
                        e.Nombre,
                        e.ApellidoPaterno,
                        e.ApellidoMaterno,
                        e.Cargo,
                        c.Cargos AS Rango,
                        e.Alta
                    FROM nomina.empleados AS e
                    INNER JOIN nomina.cargos AS c ON e.Cargo = c.IDCargos;
                `;
                db.query(sql, (err, results) => {
                    if (err) {
                        console.error('Error en la consulta: ' + err.message);
                        callback(err, null, null);
                    } else {
                        callback(null, results, resultadosCargos);
                    }
                });
            }
        });
    }
    static getEmpleadoById(db, idEmpleado, callback) {
        const sqlCargos = 'SELECT IDCargos, Cargos FROM cargos';
        db.query(sqlCargos, (err, resultadosCargos) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null, null);
            } else {
                const sql = `
                    SELECT
                    e.IDEmp,
                    e.Usuario,
                    e.Cargo,
                    c.Cargos AS Rango,
                    e.Alta,
                    e.Direccion,
                    e.Celular,
                    e.RFC,
                    e.NSS,
                    e.CURP
                    FROM nomina.empleados AS e
                    INNER JOIN nomina.cargos AS c ON e.Cargo = c.IDCargos
                    WHERE e.IDEmp = ?;
                `;
                db.query(sql, [idEmpleado], (err, results) => {
                    if (err) {
                        console.error('Error en la consulta: ' + err.message);
                        callback(err, null, null);
                    } else {
                        callback(null, results, resultadosCargos);
                    }
                });
            }
        });
    }
    static getSalarios(db, callback) {

        const sql = `
        SELECT
            e.IDEmp,
            e.Usuario,
            e.SueldoMensual,
            getDeudaTotal(e.IDemp) as DeudaTotal
        FROM nomina.empleados AS e
                `;
        db.query(sql, (err, results) => {
            //console.log(results);
            if (err) {
                console.error('Error en la consulta: ' + err.message);
                callback(err, null, null);
            } else {
                callback(null, results);
            }
        });

    }
    static getSalariosDetalle(db,idEmpleado, callback) {

        const sql = `
            CALL getDeudaTotalDetalle(${idEmpleado})
                `;
        db.query(sql, (err, results) => {
            //console.log(results);
            if (err) {
                console.error('Error en la consulta: ' + err.message);
                callback(err, null, null);
            } else {
                callback(null, results[0]);
            }
        });

    }
    static authenticate(req, Usuario, Contra, callback) {
        const sql = 'SELECT * FROM empleados WHERE Usuario = ? AND Contra = ?';

        req.db.query(sql, [Usuario, Contra], (err, results) => {
            if (err) {
                console.error('Error en la consulta: ' + err.message);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
    static actualizarEmpleado(db, datos, callback) {
        //console.log(datos);
        const sql = "UPDATE empleados SET Usuario = ?, Cargo = ?, Alta = ?, Direccion = ?, Celular = ?, RFC = ?, NSS = ?, CURP = ? WHERE IDEmp = ?";
        const values = [datos.username, datos.role, datos.isActive === "on" || false, datos.direccion, datos.celular, datos.RFC, datos.NSS, datos.CURP, datos.idEmpleado];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error al guardar cambios en la base de datos: ' + err.message);
                callback(err);
            } else {
                //console.log('Cambios guardados en la base de datos');
                callback(null);
            }
        });
    }
}

module.exports = EmpleadoModel;
