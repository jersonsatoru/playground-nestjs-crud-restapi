import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
