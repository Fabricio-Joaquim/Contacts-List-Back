import { DataSource} from 'typeorm';
import {User} from './entity/User';
import {Contact} from './entity/Contact';
export const AppDataSource = new DataSource({
	type: 'postgres',
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
});