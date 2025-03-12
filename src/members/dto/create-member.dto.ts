import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';
export class CreateMemberDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the member' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: Role.Backend,
    description: 'The role of the member',
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}
