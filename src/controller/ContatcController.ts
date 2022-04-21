import { NextFunction, Request, Response } from 'express';
import { Contact } from '../entity/Contact';
import {AppDataSource} from '../connection';

const userRepository = AppDataSource.getRepository(Contact);


export const save = async (request: Request, response: Response, next: NextFunction) => {
	const register = await userRepository.save(request.body);
        
	console.log(register);
	return response.json(register);
};
    
export const update = async (request: Request, response: Response, next: NextFunction) => {
	const {id} = request.params;

	const update = await userRepository.update(id,request.body);
	console.log(id,update);
	if(update.affected===1){
		const findOne = await userRepository.findOneBy({id});
		return response.json(findOne);
	}
	return response.json({message: 'Não foi possível atualizar'});
};

export  const remove = async(request: Request, response: Response, next: NextFunction)=> {
	const {id} = request.params;
	const userToRemove = await userRepository.findOneBy({ id });
	let result;
	if(userToRemove)
		result = await userRepository.remove(userToRemove);
    
	return response.json(result);
};

export const all = async (request: Request, response: Response, next: NextFunction) => {
	const getAll = await userRepository.find();
	console.log(getAll);
	return response.json(getAll);
};