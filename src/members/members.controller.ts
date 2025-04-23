import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 201, description: 'Member successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all members' })
  @ApiResponse({ status: 200, description: 'List of all members returned.' })
  async findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Member ID' })
  @ApiResponse({ status: 200, description: 'Member data returned.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  async findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Member ID' })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ status: 200, description: 'Member successfully updated.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Member ID' })
  @ApiResponse({ status: 200, description: 'Member successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  async remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
