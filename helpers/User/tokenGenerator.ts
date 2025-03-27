import jwt from 'jsonwebtoken';


let GenerateToken = (properties: any, key: any, minutes: number) => {
    if (!key) {
        throw new Error('KEY_TOKEN no esta definida en las variables de entorno');
    }
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (minutes * 60),
        data: properties
    }, key);
};

export default GenerateToken;