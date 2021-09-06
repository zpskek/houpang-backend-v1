import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { FindFavListInput, FindFavListOutput } from './dtos/find-fav-list.dto';
import {
  DipsOnProductInput,
  DipsOnProductOutput,
} from './dtos/dips-on-product.dto';
import {
  RemoveProductInput,
  RemoveProductOutput,
} from './dtos/remove-product.dto';
import { FavList } from './entities/favList.entity';

@Injectable()
export class FavListsService {
  constructor(
    @InjectRepository(FavList)
    private readonly favLists: Repository<FavList>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async findFavList({
    favListId,
  }: FindFavListInput): Promise<FindFavListOutput> {
    try {
      const favList = await this.favLists.findOne({
        where: {
          id: favListId,
        },
        relations: ['products'],
      });

      return {
        ok: true,
        favList,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '찜 할 수가 없습니다.',
      };
    }
  }

  async dipsOnProduct(
    { productId }: DipsOnProductInput,
    consumer: User,
  ): Promise<DipsOnProductOutput> {
    try {
      const product = await this.products.findOne(productId);

      if (!product) {
        return {
          ok: false,
          error: '해당 품목이 없습니다.',
        };
      }

      const favList = await this.favLists.findOne({
        where: {
          createdBy: consumer,
        },
        relations: ['products'],
      });

      favList.products = [...favList.products, { ...product }];

      await this.favLists.save(favList);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '찜 할 수가 없습니다.',
      };
    }
  }

  async removeProduct(
    { productId }: RemoveProductInput,
    consumer: User,
  ): Promise<RemoveProductOutput> {
    try {
      const product = await this.products.findOne(productId);

      if (!product) {
        return {
          ok: false,
          error: '해당 품목이 없습니다.',
        };
      }

      const favList = await this.favLists.findOne({
        where: {
          createdBy: consumer,
        },
        relations: ['products'],
      });

      favList.products = favList.products.filter(
        (aProduct) => aProduct.id !== product.id,
      );

      await this.favLists.save(favList);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '찜 할 수가 없습니다.',
      };
    }
  }
}
