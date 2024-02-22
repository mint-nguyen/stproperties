import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  propertyName: string;

  @IsNotEmpty()
  cleaningDate: Date;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  images: string[];
}
