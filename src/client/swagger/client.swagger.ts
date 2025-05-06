import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

// User Service Documentation
export const ApiCreateUser = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email', description: 'User email' },
          password: { type: 'string', description: 'User password' },
          firstName: { type: 'string', description: 'User first name' },
          lastName: { type: 'string', description: 'User last name' },
          phoneNumber: { type: 'string', description: 'User phone number' },
          isExchanger: { type: 'boolean', description: 'Whether user is an exchanger' },
        },
        required: ['email', 'password', 'firstName', 'lastName', 'phoneNumber'],
      },
    }),
    ApiResponse({ status: 201, description: 'User created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiUpdateUser = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update user' }),
    ApiParam({ name: 'id', type: 'string', description: 'User ID' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          firstName: { type: 'string', description: 'User first name' },
          lastName: { type: 'string', description: 'User last name' },
          phoneNumber: { type: 'string', description: 'User phone number' },
          isExchanger: { type: 'boolean', description: 'Whether user is an exchanger' },
          isExchangerActive: { type: 'boolean', description: 'Whether exchanger is active' },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'User updated successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiGetUser = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by ID' }),
    ApiParam({ name: 'id', type: 'string', description: 'User ID' }),
    ApiResponse({ status: 200, description: 'User retrieved successfully' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

// Balance Service Documentation
export const ApiGetBalance = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get user balance' }),
    ApiParam({ name: 'userId', type: 'string', description: 'User ID' }),
    ApiResponse({ status: 200, description: 'Balance retrieved successfully' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiCreateHold = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a hold on funds' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID' },
          cryptocurrency: { type: 'string', description: 'Cryptocurrency code' },
          amount: { type: 'number', description: 'Amount to hold' },
          type: { type: 'string', description: 'Hold type' },
          relatedTransactionId: { type: 'string', description: 'Related transaction ID' },
        },
        required: ['userId', 'cryptocurrency', 'amount', 'type'],
      },
    }),
    ApiResponse({ status: 201, description: 'Hold created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

// Dispute Service Documentation
export const ApiCreateDispute = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a dispute' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          transactionId: { type: 'string', description: 'Transaction ID' },
          initiatorId: { type: 'string', description: 'Initiator user ID' },
          reason: { type: 'string', description: 'Dispute reason' },
        },
        required: ['transactionId', 'initiatorId', 'reason'],
      },
    }),
    ApiResponse({ status: 201, description: 'Dispute created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiResolveDispute = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Resolve a dispute' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          disputeId: { type: 'string', description: 'Dispute ID' },
          moderatorId: { type: 'string', description: 'Moderator user ID' },
          resolution: { type: 'string', description: 'Resolution text' },
          winnerUserId: { type: 'string', description: 'Winner user ID' },
        },
        required: ['disputeId', 'moderatorId', 'resolution', 'winnerUserId'],
      },
    }),
    ApiResponse({ status: 200, description: 'Dispute resolved successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Dispute not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiAddComment = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Add comment to dispute' }),
    ApiParam({ name: 'id', type: 'string', description: 'Dispute ID' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID' },
          text: { type: 'string', description: 'Comment text' },
        },
        required: ['userId', 'text'],
      },
    }),
    ApiResponse({ status: 201, description: 'Comment added successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Dispute not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

// Reviews Service Documentation
export const ApiCreateReview = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a review' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          reviewerId: { type: 'string', description: 'Reviewer user ID' },
          reviewedId: { type: 'string', description: 'Reviewed user ID' },
          rating: { type: 'number', description: 'Rating (1-5)' },
          comment: { type: 'string', description: 'Review comment' },
          exchangeId: { type: 'string', description: 'Exchange ID' },
        },
        required: ['reviewerId', 'reviewedId', 'rating', 'comment', 'exchangeId'],
      },
    }),
    ApiResponse({ status: 201, description: 'Review created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiGetReview = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get review by ID' }),
    ApiParam({ name: 'id', type: 'string', description: 'Review ID' }),
    ApiResponse({ status: 200, description: 'Review retrieved successfully' }),
    ApiResponse({ status: 404, description: 'Review not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

// Exchange Service Documentation
export const ApiCreateListing = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a listing' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID' },
          type: { type: 'string', description: 'Listing type' },
          cryptocurrency: { type: 'string', description: 'Cryptocurrency code' },
          fiatCurrency: { type: 'string', description: 'Fiat currency code' },
          rate: { type: 'number', description: 'Exchange rate' },
          minAmount: { type: 'number', description: 'Minimum amount' },
          maxAmount: { type: 'number', description: 'Maximum amount' },
          availableAmount: { type: 'number', description: 'Available amount' },
          paymentMethods: { type: 'array', items: { type: 'string' }, description: 'Payment methods' },
          terms: { type: 'string', description: 'Exchange terms' },
        },
        required: ['userId', 'type', 'cryptocurrency', 'fiatCurrency', 'rate', 'minAmount', 'maxAmount', 'availableAmount', 'paymentMethods'],
      },
    }),
    ApiResponse({ status: 201, description: 'Listing created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiOpenDispute = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Open a dispute for exchange' }),
    ApiParam({ name: 'id', type: 'string', description: 'Exchange ID' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          initiatorId: { type: 'string', description: 'Initiator user ID' },
          reason: { type: 'string', description: 'Dispute reason' },
        },
        required: ['initiatorId', 'reason'],
      },
    }),
    ApiResponse({ status: 201, description: 'Dispute opened successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Exchange not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

// P2P Service Documentation
export const ApiCreateExchangeOffer = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create an exchange offer' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          customerId: { type: 'string', description: 'Customer user ID' },
          listingId: { type: 'string', description: 'Listing ID' },
          amount: { type: 'number', description: 'Exchange amount' },
          exchangeType: { type: 'string', description: 'Exchange type' },
          conditions: { type: 'string', description: 'Exchange conditions' },
        },
        required: ['customerId', 'listingId', 'amount', 'exchangeType', 'conditions'],
      },
    }),
    ApiResponse({ status: 201, description: 'Offer created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiRespondExchangeOffer = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Respond to an exchange offer' }),
    ApiParam({ name: 'id', type: 'string', description: 'Offer ID' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          exchangerId: { type: 'string', description: 'Exchanger user ID' },
          action: { type: 'string', description: 'Response action' },
        },
        required: ['exchangerId', 'action'],
      },
    }),
    ApiResponse({ status: 200, description: 'Response sent successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Offer not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiGetOffer = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get offer by ID' }),
    ApiParam({ name: 'id', type: 'string', description: 'Offer ID' }),
    ApiResponse({ status: 200, description: 'Offer retrieved successfully' }),
    ApiResponse({ status: 404, description: 'Offer not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

export const ApiGetProfile = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Get user profile' })(target, propertyKey, descriptor);
    ApiResponse({ status: 200, description: 'User profile retrieved successfully' })(target, propertyKey, descriptor);
    ApiResponse({ status: 401, description: 'Unauthorized' })(target, propertyKey, descriptor);
    ApiResponse({ status: 429, description: 'Too many requests' })(target, propertyKey, descriptor);
  };
};

export const ApiSetOnline = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Set user online status' })(target, propertyKey, descriptor);
    ApiResponse({ status: 200, description: 'Online status updated successfully' })(target, propertyKey, descriptor);
    ApiResponse({ status: 401, description: 'Unauthorized' })(target, propertyKey, descriptor);
    ApiResponse({ status: 429, description: 'Too many requests' })(target, propertyKey, descriptor);
  };
};

export const ApiUnfreeze = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Unfreeze user account' })(target, propertyKey, descriptor);
    ApiResponse({ status: 200, description: 'Account unfrozen successfully' })(target, propertyKey, descriptor);
    ApiResponse({ status: 401, description: 'Unauthorized' })(target, propertyKey, descriptor);
    ApiResponse({ status: 429, description: 'Too many requests' })(target, propertyKey, descriptor);
  };
}; 