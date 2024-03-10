import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @MessagePattern({ cmd: 'createPurchase' })
  async createPurchase(@Payload() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @MessagePattern({ cmd: 'getPurchaseById' })
  async getPurchaseById(@Payload() id: string) {
    return this.purchaseService.getPurchaseById(id);
  }

  @MessagePattern({ cmd: 'updatePurchase' })
  async updatePurchase(
    @Payload()
    { purchaseId, data }: { purchaseId: string; data: UpdatePurchaseDto },
  ) {
    return this.purchaseService.updatePurchase(purchaseId, data);
  }

  @MessagePattern({ cmd: 'deletePurchaseById' })
  async deletePurchaseById(@Payload() id: string) {
    return this.purchaseService.deletePurchaseById(id);
  }

  @MessagePattern({ cmd: 'getPurchasesByUserId' })
  async getPurchasesByUserId(@Payload() userId: string) {
    return this.purchaseService.getPurchasesByUserId(userId);
  }
}
