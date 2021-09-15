import { Controller, Get, Param, Put } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { FindLikeListOutput } from './dtos/find-like-list.dto';
import { LikeProductInput, LikeProductOutput } from './dtos/like-product.dto';
import {
  UnlikeProductInput,
  UnlikeProductOutput,
} from './dtos/unlike-product.dto';
import { LikesService } from './likes.service';

@Controller('/likes')
export class LikesController {
  constructor(private readonly LikesService: LikesService) {}

  @Get('')
  @Roles(['Consumer'])
  async findLikeList(@AuthUser() user: User): Promise<FindLikeListOutput> {
    return this.LikesService.findLikeList(user);
  }

  @Put('/products/:productId/add')
  @Roles(['Consumer'])
  async likeProduct(
    @Param() likeProductInput: LikeProductInput,
    @AuthUser() consumer: User,
  ): Promise<LikeProductOutput> {
    return this.LikesService.likeProduct(likeProductInput, consumer);
  }

  @Put('/products/:productId/remove')
  @Roles(['Consumer'])
  async unlikeProduct(
    @Param() removeProductInput: UnlikeProductInput,
    @AuthUser() consumer: User,
  ): Promise<UnlikeProductOutput> {
    return this.LikesService.unlikeProduct(removeProductInput, consumer);
  }
}
