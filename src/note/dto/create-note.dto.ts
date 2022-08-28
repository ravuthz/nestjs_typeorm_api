import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  public tag: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public content: string;
}
