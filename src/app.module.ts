import { Module } from '@nestjs/common';
import { PurchaseModule } from './purchase/purchase.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PurchaseModule,
    MongooseModule.forRoot('mongodb://localhost:27017/purchase'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
