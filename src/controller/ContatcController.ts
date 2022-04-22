import { Request, Response } from 'express';
import { Contact } from '../entity/Contact';
import {AppDataSource} from '../connection';

const userRepository = AppDataSource.getRepository(Contact);

export const save = async (request: Request, response: Response) => {
	const registerCreate = userRepository.create(request.body);
	const register = await userRepository.save(registerCreate);
	return response.json(register);
};
    
export const update = async (request: Request, response: Response) => {
	const {id} = request.params;

	const update = await userRepository.update(id,request.body);
	if(update.affected===1){
		const findOne = await userRepository.findOneBy({id});
		return response.json(findOne);
	}
	return response.json({message: 'Não foi possível atualizar'});
};

export  const remove = async(request: Request, response: Response)=> {
	const {id} = request.params;
	const userToRemove = await userRepository.findOneBy({ id });
	let result;
	if(userToRemove)
		result = await userRepository.remove(userToRemove);
    
	return response.json(result);
};

export const all = async (request: Request, response: Response) => {
	const getAll = await userRepository.find();
	console.log(getAll);
	return response.json(getAll);
};