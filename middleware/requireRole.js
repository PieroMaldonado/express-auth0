// requireRole.js

const requireRole = (role) => {
    return (req, res, next) => {
        // Verificar si el usuario tiene el rol requerido
        if (req.oidc.user?.rol?.includes(role)) {
            // El usuario tiene el rol requerido, permitir el acceso
            next();
        } else {
            // El usuario no tiene el rol requerido, redirigir o enviar una respuesta de error
            res.status(403).send('Acceso denegado');
        }
    };
};

module.exports = requireRole;
