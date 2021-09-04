import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PickType(PartialType(User), [
  'email',
  'username',
  'language',
  'bio',
  'phoneNumber',
  'address',
]) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
