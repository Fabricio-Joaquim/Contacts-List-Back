import { Router, Request, Response } from 'express';
import {one, save, all,  update, login, remove} from './controller/UserController';
import * as Contact from './controller/ContatcController';
import authMiddleware from './middleware/authMiddleware';
const routes: Router = Router();

routes.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
}
);

routes.get('/users/:id', one);
routes.post('/users', save);
routes.delete('/users/:id', remove);
routes.get('/users', all);
routes.put('/users/:id', update);
routes.post('/validate', login);
routes.post('/contact',authMiddleware, Contact.save);
routes.put('/contact/:id',authMiddleware, Contact.update);
routes.delete('/contact/:id',authMiddleware, Contact.remove);
routes.get('/contact', Contact.all);

export default routes;
