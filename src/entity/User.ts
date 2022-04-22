import { Entity,UpdateDateColumn, PrimaryGeneratedColumn, Column, CreateDateColumn,OneToMany, BeforeInsert, BeforeUpdate
} from 'typeorm';
import bcrypt from 'bcryptjs';
import {Contact} from './Contact';
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    	id: string;

    @Column({unique: true, nullable: false})
    	email: string;
        
    @CreateDateColumn()
    	created_at: Date;
    
    @OneToMany(() => Contact, (contact) => contact.user_id)
    	contacts: Contact[];
   
    @Column({nullable: false})
    	password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
    	this.password = bcrypt.hashSync(this.password, 8);
    }

}
