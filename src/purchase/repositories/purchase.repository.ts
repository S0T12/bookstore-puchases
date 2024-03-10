import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseInterface } from '../interfaces/purchase.interface';
import { Purchase, PurchaseDocument } from '../schema/purchase.schema';

@Injectable()
export class PurchaseRepository {
  constructor(
    @InjectModel(Purchase.name)
    private readonly purchaseModel: Model<PurchaseDocument>,
  ) {}

  async create(purchase: PurchaseInterface): Promise<Purchase> {
    const createdPurchase = new this.purchaseModel(purchase);
    return createdPurchase.save();
  }

  async findById(id: string): Promise<Purchase> {
    return this.purchaseModel.findById(id).exec();
  }

  async updatePurchase(
    purchaseId: string,
    data: Partial<PurchaseInterface>,
  ): Promise<Purchase> {
    return this.purchaseModel.findByIdAndUpdate(purchaseId, data, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<Purchase> {
    return this.purchaseModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<PurchaseInterface[]> {
    return this.purchaseModel.find({ userId }).exec();
  }
}
