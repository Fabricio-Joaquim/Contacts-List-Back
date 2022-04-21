import 'reflect-metadata';
import app from './App'; 
import {AppDataSource} from './connection';

async function main() {
	await AppDataSource.initialize();
	app.listen(3000, () => {
		console.log('Server is running on port 3000');
	});
}

main();