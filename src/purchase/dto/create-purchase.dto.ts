import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
