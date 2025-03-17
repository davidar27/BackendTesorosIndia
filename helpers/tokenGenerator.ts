import jwt from 'jsonwebtoken';

let tokenGenerator = (properties: any, key: any, minutes: number) => jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (minutes * 60),
    data: properties}, key
)

export default tokenGenerator;