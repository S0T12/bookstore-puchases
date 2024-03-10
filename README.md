### Purchase Microservice

This project is a microservice application built with NestJS that provides message pattern endpoints for managing purchases. It utilizes MongoDB for data storage and RabbitMQ for message queuing. Additionally, it interacts with other microservices for user, book, and cart management.

## How to Run

### Local Development

1. Clone this repository to your local machine.
2. Install dependencies using npm:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start:dev
   ```

## Endpoints

### Purchase Management

- **createPurchase**: Create a new purchase.
- **getPurchaseById**: Get a purchase by ID.
- **updatePurchase**: Update a purchase by ID.
- **deletePurchaseById**: Delete a purchase by ID.
- **getPurchasesByUserId**: Get all purchases of a user.

## Integration with Other Microservices

The Purchase Microservice interacts with the following microservices:

- **User Microservice**: Retrieves user information based on user ID.
- **Book Microservice**: Retrieves book information based on book ID.
- **Cart Microservice**: Retrieves cart information based on user ID.

## Functionality

### Creating a Purchase

To create a new purchase, use the `createPurchase` endpoint. This endpoint accepts a request containing the user ID and the items to be purchased. It interacts with the User, Book, and Cart microservices to validate user and item information, calculates the total price, and creates the purchase record.

### Updating a Purchase

The `updatePurchase` endpoint allows updating the details of an existing purchase. It accepts a purchase ID and the data to be updated, such as the status or delivery information.

### Retrieving Purchases

- Use the `getPurchaseById` endpoint to retrieve a purchase by its ID.
- Use the `getPurchasesByUserId` endpoint to retrieve all purchases of a specific user.

### Deleting a Purchase

To delete a purchase, use the `deletePurchaseById` endpoint, providing the ID of the purchase to be deleted.

## Error Handling

If any error occurs during the purchase creation process, such as invalid user or item information, the microservice returns an appropriate error response.

## Integration with External Services

This microservice can be integrated with external services such as payment gateways or shipping providers to handle payment processing and order fulfillment.
