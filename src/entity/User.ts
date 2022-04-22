import { Entity,UpdateDateColumn, PrimaryGeneratedColumn, Column, CreateDateColumn,OneToMany, BeforeInsert, BeforeUpdate
} from 'typeorm';
import bcrypt from 'bcryptjs';
import {Contact} from './Contact';
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    	id: string;

    @Column({unique: true})
    	email: string;
        
    @CreateDateColumn()
    	created_at: Date;
    
    @OneToMany(() => Contact, (contact) => contact.user_id)
    	contacts: Contact[];
   
    @Column()
    	password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
    	this.password = bcrypt.hashSync(this.password, 8);
    }

}
