import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/common.entity';
import { Product } from 'src/products/entities/product';
import { Entity, ManyToOne, RelationId } from 'typeorm';
import { Order } from './order.entity';

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  // OrderItem : product

  @Field((type) => Order)
  @ManyToOne((type) => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @RelationId((orderItem: OrderItem) => orderItem.order)
  orderId: number;

  @Field((type) => Product)
  @ManyToOne((type) => Product, { onDelete: 'SET NULL' })
  product: Product;

  @RelationId((orderItem: OrderItem) => orderItem.order)
  productId: number;
}
