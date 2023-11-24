class ImpuestosModel {
    static getImpuestos(db, callback) {
        const sql = 'SELECT nombre, porcentaje, DATE_FORMAT(ultimaActualizacion, "%Y-%m-%d") as ultimaActualizacion FROM impuestos';        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null);
            } else {
                console.log(results);
                callback(null,results);
            }
        });
    }
}
module.exports = ImpuestosModel;