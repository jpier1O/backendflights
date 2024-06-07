import { IsString, IsUUID } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  name: string;

  @IsString()
  passportNumber: string;

  @IsUUID()
  flightId: string;
}
