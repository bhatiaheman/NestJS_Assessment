import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';

@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price
      }
    })
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product =  await this.prisma.product.findUnique({
      where : {
        id: id
      }
    })

    if(!product) {
      throw new Error('Product not found');
    }

    return product;
    
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
      const product = await this.prisma.product.update({
        where: {
          id: id
        },

        data: {
          name: updateProductDto.name,
          price: updateProductDto.price
        }
      })

      if(!product) {
        throw new Error('Product not found');
      }

      return product;
  }

  async remove(id: string) {
   await this.prisma.product.delete({
      where: {
        id: id
      }
    })

    return {
      message: 'Product deleted successfully'
    }
  }
}
