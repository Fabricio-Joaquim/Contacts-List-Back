import { Request, 	Response,	NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
export default function (req: Request, res:Response, next: NextFunction){
interface returnJWT {
    id: string;
    iat: number;
    exp: number;
}

const { authorization } = req.headers;
if(!authorization){
	return res.status(401).json({message: 'Unauthorized'});
}
const token = authorization.replace('Bearer ', '').trim();

try {
	const {id} = jwt.verify(token, process.env.JWT_SECRET || '11') as returnJWT;
	console.log(id);
	req.userId = id;
	next();
} catch (error) {
	return res.status(401).json({message: 'Unauthorized'});
}
}