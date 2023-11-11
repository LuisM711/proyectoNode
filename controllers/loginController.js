const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const EmpleadoModel = require('../models/EmpleadoModel');
module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.logout = (req, res) => {
    const cookieName = 'jwt';
    res.clearCookie(cookieName);
    res.render('login', { error: 'Sesión cerrada' });
}
module.exports.authenticate = (req, res) => {
    const { Usuario, Contra } = req.body;

    EmpleadoModel.authenticate(req, Usuario, Contra, (err, results) => {
        if (err) {
            res.status(500).send('Error en la consulta');
            return;
        }

        if (results.length > 0) {


            if (results[0].Alta) {
                //console.log(results);
                const token = jsonwebtoken.sign(
                    {
                        id: results[0].IDEmp,
                        user: results[0].Usuario,
                        rango: results[0].Cargo
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION });


                const cookieOption = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    path: "/"
                }
                //console.log(token);
                res.cookie("jwt", token, cookieOption);
                res.render('principal');
            } else {
                res.render('login', { error: 'El usuario existe pero está dado de baja' });
            }
        } else {
            res.render('login', { error: 'Credenciales incorrectas' });
        }
    });
};
