 import { MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";


@Entity()

export class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column("double",{default:0})
    money:number

    @Column({default:null})
    @MinLength(4)
    otp:string

    @CreateDateColumn({ type: 'timestamp',default:null })
    email_verfied:Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}