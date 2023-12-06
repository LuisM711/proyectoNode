const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const EmpleadoModel = require('../models/EmpleadoModel');

module.exports.nomina = (req, res) => {
    res.render('nomina');
};

module.exports.calculoDeNomina = (req, res) => {
    EmpleadoModel.getNominaCalculada(req.db, (err, results) => {
        if (err) {
            res.status(500).send('Error en la consulta de nomina' + err);
            return;
        }

        results.forEach((empleado) => {
            const empleadoId = empleado.idEmp;

            // Crear un nuevo documento PDF
            const doc = new PDFDocument();

            // Obtener la fecha y hora actual para usar como nombre del archivo
            const fechaHoraActual = new Date();
            const nombreArchivo = `nomina_${fechaHoraActual.toISOString().replace(/:/g, '-')}.pdf`;

            // Crear la carpeta del empleado si no existe
            const carpetaEmpleado = path.join(__dirname, '../public/pdf/nomina', empleadoId.toString());
            if (!fs.existsSync(carpetaEmpleado)) {
                fs.mkdirSync(carpetaEmpleado, { recursive: true });
            }

            // Construir la ruta del archivo dentro de la carpeta del empleado
            const rutaArchivo = path.join(carpetaEmpleado, nombreArchivo);

            // Pipe el PDF a un archivo en el sistema de archivos
            const stream = fs.createWriteStream(rutaArchivo);
            doc.pipe(stream);

            // Añadir contenido al PDF (puedes personalizar esto según tu estructura de resultados)
            doc.text(`Nomina Calculada para el empleado ${empleadoId}\n\n`);
            doc.text(JSON.stringify(empleado, null, 2));

            // Finalizar y cerrar el stream
            doc.end();
            stream.on('finish', () => {
                console.log(`Nomina para el empleado ${empleadoId} generada y guardada correctamente.`);
            });

            // Manejar errores en el stream
            stream.on('error', (err) => {
                console.error('Error al guardar el archivo:', err);
                res.status(500).send(`Error al guardar el archivo de nomina para el empleado ${empleadoId}`);
            });
        });

        // Enviar algún mensaje de éxito al cliente
        res.send('Nomina generada y guardada correctamente para todos los empleados.');
    });
};
