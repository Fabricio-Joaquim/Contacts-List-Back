import { DataSource} from 'typeorm';
import {User} from './entity/User';
import {Contact} from './entity/Contact';
export const AppDataSource = new DataSource({
	url:'postgres://yuwrbiusdjvwog:665548a9ff0df799df2ab690c002008d37730d808ed7d16529055b9ad6de2cd7@ec2-54-80-122-11.compute-1.amazonaws.com:5432/d8qc6n7ap226qn',
	type: 'postgres',
	/* 	host: 'localhost',
	port: 5432,
	username: 'root',
	password: 'root',
	database: 'test', */
	synchronize: true,
	logging: true,
	entities: [User, Contact],
	subscribers: [],
	migrations: [],
});
/* 	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'root',
	password: 'root',
	database: 'test',
	synchronize: true,
	logging: true,
	entities: [User, Contact],
	subscribers: [],
	migrations: [],
}); */