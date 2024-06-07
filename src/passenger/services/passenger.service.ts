import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from '../entittes/passenger.entity';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  async create(createPassengerDto: CreatePassengerDto) {
    const passenger = this.passengerRepository.create(createPassengerDto);
    await this.passengerRepository.save(passenger);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Passenger created successfully',
      passenger,
    };
  }

  async findAll() {
    const passengers = await this.passengerRepository.find({ relations: ['flight'] });
    return {
      statusCode: HttpStatus.OK,
      passengers,
    };
  }

  async findOne(id: string) {
    const passenger = await this.passengerRepository.findOne({ where: { id }, relations: ['flight'] });
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    return {
      statusCode: HttpStatus.OK,
      passenger,
    };
  }

  async findByFlightId(flightId: string) {
    const passengers = await this.passengerRepository.find({ where: { flight: { id: flightId } }, relations: ['flight'] });
    return {
      statusCode: HttpStatus.OK,
      passengers,
    };
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    const result = await this.passengerRepository.update(id, updatePassengerDto);
    if (result.affected === 0) {
      throw new NotFoundException('Passenger not found');
    }
    const updatedPassenger = await this.passengerRepository.findOne({ where: { id }, relations: ['flight'] });
    return {
      statusCode: HttpStatus.OK,
      message: 'Passenger updated successfully',
      updatedPassenger,
    };
  }

  async remove(id: string) {
    const result = await this.passengerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Passenger not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Passenger deleted successfully',
    };
  }
}
