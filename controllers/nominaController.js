const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const EmpleadoModel = require('../models/EmpleadoModel');
const verification = require("../middlewares/verification");


module.exports.nomina = (req, res) => {
    const datos = verification.getUserData(req, res);
    const empleadoId = datos.id;
    const rutaDirectorio = path.join(__dirname, '../public/pdf/nomina', empleadoId.toString());
    fs.readdir(rutaDirectorio, (err, archivos) => {
        if (err) {
            res.render('nomina', {
                id: empleadoId,
                nominas: [],
                existen: false
            });
            return;
        }
        const nominas = archivos.filter((archivo) => archivo.endsWith('.pdf'));
        const fechaArchivo = (archivo) => {
            const fechaHora = fs.statSync(path.join(rutaDirectorio, archivo)).mtime;
            return fechaHora.toLocaleString();
        };
        const nominaYfecha = nominas.map((archivo) => {
            return {
                nombre: archivo,
                fecha: fechaArchivo(archivo),
            };
        });
        res.render('nomina', {
            id: empleadoId,
            nominas: nominaYfecha,
            existen: true
        });
    });
};
module.exports.calculoDeNomina = (req, res) => {
    const userData = verification.getUserData(req, res);
    if (userData.rango === 1) {
        EmpleadoModel.getNominaCalculada(req.db, (err, results) => {
            if (err) {
                res.status(500).send('Error en la consulta de nomina' + err);
                return;
            }
    
            results.forEach((empleado) => {
                const empleadoId = empleado.idEmp;
                const doc = new PDFDocument();
                const fechaHoraActual = new Date();
                const nombreArchivo = `nomina_${fechaHoraActual.toISOString().replace(/:/g, '-')}.pdf`;
                const carpetaEmpleado = path.join(__dirname, '../public/pdf/nomina', empleadoId.toString());
                if (!fs.existsSync(carpetaEmpleado)) {
                    fs.mkdirSync(carpetaEmpleado, { recursive: true });
                }
                const rutaArchivo = path.join(carpetaEmpleado, nombreArchivo);
                const stream = fs.createWriteStream(rutaArchivo);
                doc.pipe(stream);
                doc.fontSize(14).text(`Nomina Calculada para el empleado ${empleadoId}`, { align: 'center' });
                doc.moveDown(); // Espaciado
                doc.fontSize(12).text(`Nombre Completo: ${empleado.nombreCompleto}`);
                doc.text(`Sueldo Bruto: $${empleado.sueldoBruto.toFixed(2)}`);
                doc.text(`Total Retenciones: $${empleado.totalRetenciones.toFixed(2)}`);
                doc.text(`Abonado a Deuda: $${empleado.abonadoADeuda.toFixed(2)}`);
                doc.text(`Deuda Total: $${empleado.deudaTotal.toFixed(2)}`);
                doc.text(`Sueldo Neto: $${empleado.sueldoNeto.toFixed(2)}`);
                doc.moveDown();
                doc.fontSize(12).text('Impuestos:', { underline: true });
                empleado.impuestos.forEach((impuesto) => {
                    doc.text(`- ${impuesto.nombre}: ${impuesto.porcentaje}% (${impuesto.monto.toFixed(2)})`);
                });
                doc.moveDown();
                doc.fontSize(12).text('Descuentos Restantes:', { underline: true });
                if (empleado.descuentosRestantes.length > 0) {
                    empleado.descuentosRestantes.forEach((descuento) => {
                        doc.text(`- ${descuento.Descripcion}: $${descuento.Monto.toFixed(2)}`);
                    });
                } else {
                    doc.text('- No hay descuentos restantes.');
                }
                doc.moveDown();
                doc.text(`Fecha y hora: ${fechaHoraActual.toLocaleString()}`);
                doc.end();
                // stream.on('finish', () => {
                //     console.log(`Nomina para el empleado ${empleadoId} generada y guardada correctamente.`);
                // });
                stream.on('error', (err) => {
                    console.error('Error al guardar el archivo:', err);
                    res.status(500).send(`Error al guardar el archivo de nomina para el empleado ${empleadoId}`);
                });
            });
    
            res.json({ message: 'Nomina generada y guardada correctamente para todos los empleados.' });
        });
    }
    else {
        res.json({ message: 'No tienes permisos.' });
    }
    
};
