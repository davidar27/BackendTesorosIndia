"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.body.role !== role) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};
exports.checkRole = checkRole;
