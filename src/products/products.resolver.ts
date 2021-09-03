import { Resolver } from '@nestjs/graphql';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-account.dto';

import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}
  @Mutation((returns) => CreateProductOutput)
  @Roles(['Provider'])
  async createProduct(
    @Args('input') createProductInput: CreateProductInput,
    @AuthUser() provider: User,
  ): Promise<CreateProductOutput> {
    return this.productService.createProduct(createProductInput, provider);
  }
}
