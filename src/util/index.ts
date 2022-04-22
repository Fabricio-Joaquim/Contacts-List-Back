import { Contact } from '../entity/Contact';

const removeIdList = (Data:Contact[])=>{
	Data.map((item:any) => {
		item.id = undefined;
		return item;
	});    
};

const removeIdOne = (Data:Contact |any)=>{
	Data.id = undefined as any;
	return Data;
};
    

export {removeIdList, removeIdOne};