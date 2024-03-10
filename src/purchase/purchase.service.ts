import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseRepository } from './repositories/purchase.repository';
import { Purchase } from './schema/purchase.schema';
import { PurchaseInterface } from './interfaces/purchase.interface';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    @Inject('BOOK_SERVICE') private readonly bookClientProxy: ClientProxy,
    @Inject('USERS_SERVICE') private readonly userClientProxy: ClientProxy,
    @Inject('CART_SERVICE') private readonly cartClientProxy: ClientProxy,
  ) {}

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    try {
      const user = await lastValueFrom(
        this.userClientProxy.send(
          { cmd: 'findOneUser' },
          createPurchaseDto.userId,
        ),
      );

      if (!user) {
        throw new NotFoundException(
          `User with ID ${createPurchaseDto.userId} not found`,
        );
      }

      const cart = await lastValueFrom(
        this.cartClientProxy.send(
          { cmd: 'getCartByUserId' },
          createPurchaseDto.userId,
        ),
      );

      if (!cart) {
        throw new Error('Cart not found');
      }

      let totalPrice = 0;
      const itemsPromises = cart.items.map(async (item) => {
        const book = await lastValueFrom(
          this.bookClientProxy.send({ cmd: 'findOneBook' }, item.bookId),
        );
        totalPrice += book.price * item.quantity;
        return {
          bookId: item.bookId,
          quantity: item.quantity,
        };
      });

      const resolvedItems = await Promise.all(itemsPromises);

      totalPrice += user.membershipType === 'premium' ? 0 : 5;

      const purchaseData: PurchaseInterface = {
        userId: user._id,
        items: resolvedItems,
        totalPrice,
      };

      const purchase = await this.purchaseRepository.create(purchaseData);

      await lastValueFrom(
        this.cartClientProxy.send({ cmd: 'clearCart' }, user._id),
      );

      return purchase;
    } catch (error) {
      console.error('Error creating purchase:', error);
      throw error;
    }
  }

  async getPurchaseById(id: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findById(id);
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return purchase;
  }

  async updatePurchase(
    purchaseId: string,
    data: Partial<UpdatePurchaseDto>,
  ): Promise<Purchase> {
    return this.purchaseRepository.updatePurchase(purchaseId, data);
  }

  async getPurchasesByUserId(userId: string): Promise<PurchaseInterface[]> {
    return this.purchaseRepository.findByUserId(userId);
  }

  async deletePurchaseById(id: string): Promise<Purchase> {
    return this.purchaseRepository.deleteById(id);
  }
}
