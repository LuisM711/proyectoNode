class ImpuestosModel {
    static getImpuestos(db, callback) {
        const sql = 'SELECT nombre, porcentaje, DATE_FORMAT(ultimaActualizacion, "%Y-%m-%d") as ultimaActualizacion FROM impuestos';        
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null);
            } else {
                callback(null,results);
            }
        });
    }
    static actualizarImpuesto(db, nombre, porcentaje, callback) {
        const sql = 'UPDATE impuestos SET porcentaje = ?, ultimaActualizacion = current_date() WHERE nombre = ?';
        db.query(sql, [porcentaje, nombre], (err, results) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null);
            } else {
                callback(null,results);
            }
        });
    }
    static agregarImpuesto(db, nombre, porcentaje, callback) {
        const sql = 'INSERT INTO impuestos (nombre, porcentaje, ultimaActualizacion) VALUES (?, ?, current_date())';
        db.query(sql, [nombre, porcentaje], (err, results) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null);
            } else {
                callback(null,results);
            }
        });
    }
    static borrarImpuesto(db, nombre, callback) {
        const sql = 'DELETE FROM impuestos WHERE nombre = ?';
        db.query(sql, [nombre], (err, results) => {
            if (err) {
                console.error('Error en la consulta de cargos: ' + err.message);
                callback(err, null);
            } else {
                callback(null,results);
            }
        });
    }
}
module.exports = ImpuestosModel;