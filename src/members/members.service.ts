import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    try {
      await this.prisma.member.create({
        data: createMemberDto,
      });

      return {
        message: 'Successfully created member'
      }
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Failed to create member',
        error: error.message || 'Unexpected error occured',
      });
    }
  }

  async findAll() {
    return this.prisma.member.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async findOne(id: number) {
    try {
      const member = await this.prisma.member.findFirst({
        where: { id, deleted_at: null },
      });

      if (!member) {
        throw new NotFoundException(
          `Member with id ${id} not found or deleted`,
        );
      }

      return member;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Member with id ${id} does not exist`);
      }

      throw new InternalServerErrorException({
        message: 'Failed to retrieve member',
        error: error.message || 'An unexpected error occurred',
      });
    }
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    try {
      const member = await this.prisma.member.findUnique({
        where: { id },
      });

      if (!member) {
        throw new NotFoundException(`Member with id ${id} not found`);
      }

      const updatedMember = await this.prisma.member.update({
        where: { id },
        data: updateMemberDto,
      });

      return {
        message: 'Member updated successfully',
        data: updatedMember,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Member with id ${id} not found`);
        }
      }

      throw new InternalServerErrorException({
        message: 'Failed to update member',
        error: error.message || 'An unexpected error occurred',
      });
    }
  }

  async remove(id: number) {
    try {
      const member = await this.prisma.member.findUnique({
        where: { id },
      });

      if (!member || member.deleted_at) {
        throw new NotFoundException(
          `Member with id ${id} is already deleted or does not exist`,
        );
      }

      const deletedMember = await this.prisma.member.update({
        where: { id },
        data: { deleted_at: new Date() },
      });

      return {
        message: 'Member deleted successfully',
        data: deletedMember,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Member with id ${id} does not exist`);
      }

      throw new InternalServerErrorException({
        message: 'Failed to delete member',
        error: error.message || 'An unexpected error occurred',
      });
    }
  }
}
