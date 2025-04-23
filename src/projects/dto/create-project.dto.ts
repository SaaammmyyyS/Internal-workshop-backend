import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'AI Research Platform',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'A platform to manage and collaborate on AI research initiatives.',
  })
  @IsNotEmpty()
  description: string;
}
