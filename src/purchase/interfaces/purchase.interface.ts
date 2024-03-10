export interface PurchaseInterface {
  userId: string;
  items: Array<{ bookId: any; quantity: number }>;
  totalPrice: number;
}
