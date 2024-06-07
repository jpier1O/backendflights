import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerService } from './services/passenger.service';
import { PassengerController } from './controller/passenger.controller';
import { Passenger } from './entittes/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
