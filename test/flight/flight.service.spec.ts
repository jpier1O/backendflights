import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from 'src/flight/services/flight.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flight } from '../../src/flight/entities/flight.entity';
import { Repository } from 'typeorm';

describe('FlightService', () => {
  let service: FlightService;
  let repository: Repository<Flight>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightService,
        {
          provide: getRepositoryToken(Flight),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FlightService>(FlightService);
    repository = module.get<Repository<Flight>>(getRepositoryToken(Flight));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a flight', async () => {
    const flight: Flight = {
      id: '1',
      flightNumber: 'AB123',
      departure: 'JFK',
      destination: 'LAX',
      departureTime: new Date(),
      arrivalTime: new Date(),
      passengers: []

    };

    jest.spyOn(repository, 'save').mockResolvedValue(flight);

    expect(await service.create(flight)).toEqual(flight);
  });

  it('should find all flights', async () => {
    const flights: Flight[] = [
      {
        id: '1',
        flightNumber: 'AB123',
        departure: 'JFK',
        destination: 'LAX',
        departureTime: new Date(),
        arrivalTime: new Date(),
        passengers: []

      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(flights);

    expect(await service.findAll()).toEqual(flights);
  });

  it('should find one flight', async () => {
    const flight: Flight = {
      id: '1',
      flightNumber: 'AB123',
      departure: 'JFK',
      destination: 'LAX',
      departureTime: new Date(),
      arrivalTime: new Date(),
      passengers: []

    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(flight);

    expect(await service.findOne('1')).toEqual(flight);
  });

  it('should update a flight', async () => {
    const flight: Flight = {
      id: '1',
      flightNumber: 'AB123',
      departure: 'JFK',
      destination: 'LAX',
      departureTime: new Date(),
      arrivalTime: new Date(),
      passengers: []
    };

    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(flight);

    expect(await service.update('1', flight)).toEqual(flight);
  });

  it('should remove a flight', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove('1')).toBeUndefined();
  });
});
