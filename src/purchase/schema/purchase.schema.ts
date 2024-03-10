import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PurchaseDocument = Purchase & Document;

@Schema()
export class Purchase {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ bookId: String, quantity: Number }], default: [] })
  items: { bookId: string; quantity: number }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
