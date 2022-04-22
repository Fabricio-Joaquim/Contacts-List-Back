
import { Request, Response } from 'express';
import { Contact } from '../entity/Contact';
import {AppDataSource} from '../connection';
import {removeIdOne} from '../util';

interface IContact {
	name: string;
	id: string | undefined;
	lastname: string;
    phone: string;
    dateBorn: Date;
    address: string;
    email: string;
	
}

const userRepository = AppDataSource.getRepository(Contact);

export const saveContact = async (request: Request, response: Response) => {
	try {
		const {name, lastname, phone, dateBorn, address, email} = request.body;
		if (!name || !lastname || !phone || !dateBorn || !address || !email ) {
			return response.status(400).json({message: 'name, lastname, phone, dateBorn, address, email and user_id are required'});
		}
		
		const findOne = await userRepository.findOne({where:{phone}});
		if(findOne){
			return response.status(404).json({message: 'A contact with this phone number already exists'});
		}
		const registerCreate = userRepository.create({...request.body, user_id:request.userId});
		const register = await userRepository.save(registerCreate);
		return response.json(register);
	} catch (error) {
		return response.status(500).json({
			message: 'An error has occurred'
		});
	}
};
    
export const updateContact = async (request: Request, response: Response) => {
	try{
		const {id } = request.params;
		let {phone} = request.body;
		const findPhoneBody = await userRepository.findOneBy({phone});

		if(findPhoneBody?.phone===phone && findPhoneBody?.id===id){
			
			phone=undefined;
		} else if(findPhoneBody?.phone===phone){
			return response.status(404).json({message: 'A contact with this phone number already exists'});
		}
		
		const update = await userRepository.update(id,request.body);
		if(update.affected===1){
			const findOne = await userRepository.findOneBy({id});
			removeIdOne(findOne);
			return response.json(findOne);
		}
		return response.json({message: 'Not update contact '});
	} catch (error) {
		return response.status(500).json({
			message: 'An error has occurred'
		});
	}
};

export  const removeContact = async(request: Request, response: Response)=> {
	const {id} = request.params;
	const userToRemove = await userRepository.findOneBy({ id });
	let result;
	if(userToRemove)
		result = await userRepository.remove(userToRemove);
    
	return response.json(result);
};

export const getAllContact = async (request: Request, response: Response) => {
	const id:any = request.userId;
	const getAll= await userRepository.findBy({user_id: id});
	return response.json(getAll);
};