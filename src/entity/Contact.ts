import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    	id: string;

    @Column()
    	nome: string;

    @Column()
    	sobrenome: string;

    @Column()
    	telefone: string;
    
    @Column()
    	dataDeNascimento: Date;
    
    @Column()
    	endereco: string;

    @Column()
    	email: string;

    @ManyToOne(() => User, (user) => user.contacts,{nullable: false})
    	user_id: User;
    
    @CreateDateColumn()
    	created_at: Date;

    @UpdateDateColumn()
    	updated_at: Date;
}
