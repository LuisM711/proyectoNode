class EmpleadoModel {
    static agregarEmpleado(db, datos, callback) {
        console.log(datos);
        const isActive = datos.isActive === '' ? 'on' : datos.isActive;
        console.log(isActive);
        const sql = `INSERT INTO empleados (Nombre, ApellidoPaterno, ApellidoMaterno, Usuario, Contra, Cargo, Alta, Direccion, Celular, RFC, NSS, CURP, SueldoMensual) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [datos.nombreEmpleado, datos.apellidoPaterno, datos.apellidoMaterno, datos.username, datos.password, datos.role, isActive === "on" ? true : false , datos.direccion, datos.celular, datos.RFC, datos.NSS, datos.CURP, datos.sueldo];
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
    static actualizarSueldoDeducciones(db, idEmp, sueldo, detalles, callback) {
        let sql = `UPDATE empleados SET SueldoMensual = ? WHERE IDEmp = ?;`;

        db.query(sql, [sueldo, idEmp], (err, results) => {
            if (err) {
                console.error('Error en la consulta: ' + err.message);
                callback(err, null);
                return;
            } else {
                // Llamada a la eliminación de descuentos
                sql = "DELETE FROM descuentos WHERE IDEmp = ?;";
                db.query(sql, [Number(idEmp)], (err, results) => {
                    if (err) {
                        console.error('Error en la consulta: ' + err.message);
                        callback(err, null);
                    } else {
                        // Lógica de inserción de nuevos descuentos
                        if (detalles.length > 0) {
                            const insertPromises = detalles.map(element => {
                                sql = "INSERT INTO descuentos (IDEmp, Monto, Descripcion) VALUES (?, ?, ?);";
                                return db.query(sql, [idEmp, element.MONTO, element.DESCRIPCION]);
                            });

                            Promise.all(insertPromises)
                                .then(() => {
                                    // Todas las inserciones de descuentos fueron exitosas
                                    callback(null, results);
                                })
                                .catch(insertErr => {
                                    console.error('Error en la consulta de inserción de descuentos: ' + insertErr.message);
                                    callback(insertErr, null);
                                });
                        } else {
                            // No hay detalles para insertar
                            callback(null, results);
                        }
                    }
                });
            }
        });
    }


    // static authenticate(req, Usuario, Contra, callback) {
    //     const sql = 'SELECT * FROM empleados WHERE Usuario = ? AND Contra = ?';

    //     req.db.query(sql, [Usuario, Contra], (err, results) => {
    //         if (err) {
    //             console.error('Error en la consulta: ' + err.message);
    //             callback(err, null);
    //         } else {
    //             callback(null, results);
    //         }
    //     });
    // }
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
                    *
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
    static getSalariosDetalle(db, idEmpleado, callback) {

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
        console.log(datos);
        const sql = "UPDATE empleados SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Usuario = ?, Contra = ?, Cargo = ?, Alta = ?, Direccion = ?, Celular = ?, RFC = ?, NSS = ?, CURP = ?, SueldoMensual = ? WHERE IDEmp = ?";
        const values = [datos.nombreEmpleado, datos.apellidoPaterno, datos.apellidoMaterno, datos.username, datos.password, datos.role, datos.isActive === "on" ? true : false , datos.direccion, datos.celular, datos.RFC, datos.NSS, datos.CURP, datos.sueldo, datos.idEmpleado];
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
