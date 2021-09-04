import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { LikeProductInput, LikeProductOutput } from './dtos/like-product.dto';
import { FavListsService } from './fav-lists.service';

@Resolver()
export class FavListsResolver {
  constructor(private readonly favListsService: FavListsService) {}

  @Mutation((returns) => LikeProductOutput)
  @Roles(['Consumer'])
  async likeProduct(
    @Args('input') likeProductInput: LikeProductInput,
    @AuthUser() consumer: User,
  ): Promise<LikeProductOutput> {
    return this.favListsService.likeProduct(likeProductInput, consumer);
  }
}
