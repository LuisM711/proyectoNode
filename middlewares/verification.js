const jwt = require("jsonwebtoken");



function revisarCookie(req, res, next) {
    try {
        const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET);
        //console.log(decodificada);
        return next();
        //return true;
    } catch (error) {
        //console.log("Errorrrrrrr");
        //return res.status(403).send({ status: "Error", message: "La cookie no pudo ser validada" });
        return res.render('login', { error: 'Cookie inválida' });

        //return false;
    }
}
function revisarCookiePermisos(req, res, next) {
    try {
        const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET);
        if (decodificada.rango == 1) {
            return next();
        } else {
            res.render('principal', {
                datos: {
                    error: 'No tienes permisos',
                    ...decodificada
                }
            });
        }
    } catch (error) {
        return res.render('login', { error: error });
    }
}

//verification.js
function getUserData(req, res) {
    try {
        const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET);
        //console.log("Datos del usuario:", decodificada); // Muestra los datos en el console.log
        return decodificada; // Retorna los datos del usuario sin enviarlos al cliente
    } catch (error) {
        return null; // En caso de error, retorna null
    }
}


module.exports = {
    revisarCookie,
    revisarCookiePermisos,
    getUserData
};
