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
routes.put('/users',authMiddleware, update);
routes.delete('/users/:id', remove);
routes.get('/users', all);

routes.post('/login', login);

routes.get('/contact', Contact.getAllContact);
routes.post('/contact',authMiddleware, Contact.saveContact);
routes.put('/contact/:id',authMiddleware, Contact.updateContact);
routes.delete('/contact/:id',authMiddleware, Contact.removeContact);

export default routes;

