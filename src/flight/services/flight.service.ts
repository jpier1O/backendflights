import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../entities/flight.entity';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { UpdateFlightDto } from '../dto/update-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  create(createFlightDto: CreateFlightDto) {
    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }

  findAll() {
    return this.flightRepository.find();
  }

  findOne(id: string) {
    return this.flightRepository.findOne({ where: { id } });
  }

  update(id: string, updateFlightDto: UpdateFlightDto) {
    return this.flightRepository.update(id, updateFlightDto);
  }

  remove(id: string) {
    return this.flightRepository.delete(id);
  }
}

