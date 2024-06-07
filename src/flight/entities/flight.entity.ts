import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Passenger } from 'src/passenger/entittes/passenger.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  flightNumber: string;

  @Column()
  departure: string;

  @Column()
  destination: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @OneToMany(() => Passenger, (passenger) => passenger.flight)
  passengers: Passenger[];
}
