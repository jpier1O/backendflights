import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Flight } from '../../flight/entities/flight.entity';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  passportNumber: string;

  @ManyToOne(() => Flight, (flight) => flight.passengers)
  flight: Flight;
}
