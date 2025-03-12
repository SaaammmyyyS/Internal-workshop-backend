import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const member = await this.prisma.projects.create({
        data: createProjectDto,
      });

      return {
        message: 'Member added successfully',
        data: member,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create project',
          error: error.message || 'Unknown error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // findAll() {
  //   return `This action returns all projects`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }

  // TODO: 🔥Implement it yourself
  async getProjectMembers(ProjectId: number) {
    return `This action retrieves all members from project id ${ProjectId}`;
  }
}
