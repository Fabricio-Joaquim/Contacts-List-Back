import { DataSource} from 'typeorm';
import {User} from './entity/User';
import {Contact} from './entity/Contact';
export const AppDataSource = new DataSource({
	url: process.env.DATABASE_URL,
	type: 'postgres',
	synchronize: true,
	logging: true,
	entities: [User, Contact],
	subscribers: [],
	migrations: [],
});
