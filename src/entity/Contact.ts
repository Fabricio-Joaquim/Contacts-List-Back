import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    	id: string;

    @Column({nullable: false})
    	name: string;

    @Column({nullable: false})
    	lastname: string;

    @Column({nullable: false, unique: true,})
    	phone: string;
    
    @Column({nullable: false})
    	dateBorn: Date;
    
    @Column({nullable: false})
    	address: string;

    @Column({nullable: false})
    	email: string;

    @ManyToOne(() => User, (user) => user.contacts,{nullable: false})
    	user_id: User;
            
    @CreateDateColumn()
    	created_at: Date;

    @UpdateDateColumn()
    	updated_at: Date;
}
