import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'Project successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get(':id/members')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get members of a project by project ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project members retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async getProjectMembers(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectMembers(id);
  }

  @Get('format-name')
  @ApiOperation({ summary: 'Format a name by capitalizing it' })
  @ApiQuery({ name: 'name', type: String, description: 'Name to format' })
  @ApiResponse({ status: 200, description: 'Formatted name returned.' })
  formatName(@Query('name', CapitalizePipe) name: string) {
    return { formatted: name };
  }
}
