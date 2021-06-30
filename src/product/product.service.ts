import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.repository.create({ ...createProductDto });
    return this.repository.save(product);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const result = await this.repository.update(id, updateProductDto);
    if (!result.affected) throw new EntityNotFoundError(Product, id);
    return this.repository.findOne(id);
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);
    if (!result.affected) throw new EntityNotFoundError(Product, id);
  }
}
