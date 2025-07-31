import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword = BcryptEncryption.encrypt(createAdminDto.password)

      const admin = await this.prisma.admin.create({
        data: {
          ...createAdminDto,
          password: hashedPassword
        }
      })
      return {
        status_code: 201,
        message: 'success',
        data: admin
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.admin.findMany()
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    };
  }

  async findOne(id: string) {
    try {
      const findone = await this.prisma.admin.findFirst({ where: { id }})
      if(!findone) throw new BadRequestException('Admin not found')
      return findone
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    };
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const findone = await this.prisma.admin.findFirst({ where: { id }})
      if(!findone) throw new BadRequestException('admin not found')
      let password = findone.password
      if(updateAdminDto.password) {
        password = BcryptEncryption.encrypt(updateAdminDto.password)
      }
      const updated = await this.prisma.admin.update({ where: { id }, data: { ...updateAdminDto, password }})
      return {
        status_code: 200,
        message: 'success',
        data: updated
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    };
  }

  async remove(id: string) {
    try {
      const findone = await this.prisma.admin.findFirst({ where: { id }})
      if(!findone) throw new BadRequestException('Admin not found')
      const deleted = await this.prisma.admin.delete({ where: { id }})
      return {
        status_code: 200,
        message: 'deleted',
        data: deleted
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    };
  }
}
