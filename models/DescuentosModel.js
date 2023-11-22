class DescuentosModel {
    static agregarPrestamo(db, datos, callback) {
        //console.log(datos);
        const sql = "insert into descuentos values(?,?,?)";
        const values = [datos.idemp, datos.monto, datos.descripcion];
        db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error al insertar en la base de datos: ' + err.message);
                callback(err, null);
            } else {
                //console.log('Cambios guardados en la base de datos');
                callback(null, results);
            }
        });
    }

}
module.exports = DescuentosModel;