import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import {AppDataSource} from '../connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';       
dotenv.config();


const userRepository = AppDataSource.getRepository(User);

export const all = async (request: Request, response: Response, next: NextFunction) => {
	const getAll = await userRepository.find();
	console.log(getAll);
	return response.json(getAll);
};

export const one = async(request: Request, response: Response, next: NextFunction) => {
	const {id} = request.params;
	const findOne = await userRepository.findOneBy({id});
	if (!findOne) {
		return response.status(404).json({message: 'User not found'});
	}
	return response.json(findOne);
};
export const login = async(request: Request, response: Response, next: NextFunction) => {
	const {email, password} = request.body;
	const findOne = await userRepository.findOne({where:{email}});
	if(!findOne){
		return response.status(404).json({message: 'User not found'});
	}
	const isPasswordMatch = bcrypt.compareSync(password, findOne.password);

	if(!isPasswordMatch){
		return response.status(401).json({message: 'Password not match'});
	}
	console.log(process.env.JWT_SECRET);
	const token = jwt.sign({id: findOne.id}, process.env.JWT_SECRET || '11', {expiresIn: '1d'});

	return response.json({
		token,
		email: findOne.email,
		id: findOne.id
	});

};

export const save = async (request: Request, response: Response, next: NextFunction) => {
	const data = request.body;
	const entity = userRepository.create(data);
	await userRepository.save(entity);
	
	return response.json(entity);
};
export const update = async (request: Request, response: Response, next: NextFunction) => {
	const {id} = request.params;
	const update = await userRepository.update(id,request.body);
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

