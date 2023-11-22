class peticionesPrestamosModel {
    static requestPrestamo(db, datos, callback) {
        //console.log(datos);
        const sql = "insert into peticionesprestamos values(?,?,?)";
        const values = [datos.idemp, datos.monto, datos.descripcion];
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
    static getAllSolicitudes(db, callback) {
        //console.log(datos);
        const sql = "select idemp, monto, descripcion from peticionesprestamos";
        //const values = [datos.idemp, datos.monto, datos.descripcion];
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error al guardar cambios en la base de datos: ' + err.message);
                callback(err, null);
            } else {
                //console.log('Cambios guardados en la base de datos');
                callback(null, results);
            }
        });
    }
    static borrarSolicitud(db, datos, callback) {
        //console.log(datos);
        const sql = "delete from peticionesprestamos prestamos where idemp = ? and monto = ? and descripcion = ?";
        const values = [datos.idemp, datos.monto, datos.descripcion];
        db.query(sql, values,(err, results) => {
            if (err) {
                console.error('Error al borrar la solicitud en la base de datos: ' + err.message);
                callback(err, null);
            } else {
                //console.log('Cambios guardados en la base de datos');
                callback(null, results);
            }
        });
    }
}
module.exports = peticionesPrestamosModel;