import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../interfaces/client.swagger';
import { User } from '../interfaces/grpc.interfaces';
import { CreateListingDto } from '../interfaces/client.swagger';
import { CreateOfferDto } from '../interfaces/client.swagger';
import { CreateDisputeDto, ResolveDisputeDto, AddCommentDto } from '../interfaces/client.swagger';
import { CreateAuditLogDto } from '../interfaces/client.swagger';
import { CreateReviewDto } from '../interfaces/client.swagger';
import { CreateTaskDto } from 'src/scheduler/dto/create-task.dto';

class UserDto {
  id: string;
  email: string;
  role: string;
  isExchangerActive: boolean;
  isFrozen: boolean;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User Service Documentation
export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({ status: 201, description: 'User created successfully', type: UserDto }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 429, description: 'Too many requests' }),
    ApiBody({ type: CreateUserDto })
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user by ID' }),
    ApiResponse({ status: 200, description: 'User updated successfully', type: UserDto }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiBody({ type: UpdateUserDto })
  );
}

export function ApiGetUserProfile() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user profile' }),
    ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 429, description: 'Too many requests' })
  );
}

export function ApiSetOnline() {
  return applyDecorators(
    ApiOperation({ summary: 'Set user online status' }),
    ApiResponse({ status: 200, description: 'Online status updated successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 429, description: 'Too many requests' }),
    ApiBody({ schema: { properties: { isOnline: { type: 'boolean' } } } })
  );
}

export function ApiUnfreeze() {
  return applyDecorators(
    ApiOperation({ summary: 'Unfreeze user account' }),
    ApiResponse({ status: 200, description: 'Account unfrozen successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 429, description: 'Too many requests' })
  );
}

export function ApiGetAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({ status: 200, description: 'Return all users', type: [UserDto] }),
    ApiQuery({ name: 'role', required: false, enum: ['USER', 'ADMIN', 'EXCHANGER'] }),
    ApiQuery({ name: 'isExchangerActive', required: false, type: Boolean })
  );
}

export function ApiGetUserById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user by ID' }),
    ApiResponse({ status: 200, description: 'Return the user', type: UserDto }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiParam({ name: 'id', required: true, description: 'User ID' })
  );
}

export function ApiActivateExchanger() {
  return applyDecorators(
    ApiOperation({ summary: 'Activate user as exchanger' }),
    ApiResponse({ status: 200, description: 'User activated as exchanger successfully', type: UserDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiParam({ name: 'id', required: true, description: 'User ID' })
  );
}

export function ApiDeactivateExchanger() {
  return applyDecorators(
    ApiOperation({ summary: 'Deactivate user as exchanger' }),
    ApiResponse({ status: 200, description: 'User deactivated as exchanger successfully', type: UserDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiParam({ name: 'id', required: true, description: 'User ID' })
  );
}

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
export function ApiCreateDispute() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new dispute' }),
    ApiResponse({ status: 201, description: 'Dispute created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiBody({ type: CreateDisputeDto })
  );
}

export function ApiGetAllDisputes() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all disputes' }),
    ApiResponse({ status: 200, description: 'Return all disputes' }),
    ApiQuery({ name: 'status', required: false, enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] }),
    ApiQuery({ name: 'userId', required: false, type: String })
  );
}

export function ApiGetDisputeById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a dispute by ID' }),
    ApiResponse({ status: 200, description: 'Return the dispute' }),
    ApiResponse({ status: 404, description: 'Dispute not found' }),
    ApiParam({ name: 'id', required: true, description: 'Dispute ID' })
  );
}

export function ApiResolveDispute() {
  return applyDecorators(
    ApiOperation({ summary: 'Resolve a dispute' }),
    ApiResponse({ status: 200, description: 'Dispute resolved successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Dispute not found' }),
    ApiParam({ name: 'id', required: true, description: 'Dispute ID' }),
    ApiBody({ type: ResolveDisputeDto })
  );
}

export function ApiAddComment() {
  return applyDecorators(
    ApiOperation({ summary: 'Add a comment to a dispute' }),
    ApiResponse({ status: 200, description: 'Comment added successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Dispute not found' }),
    ApiParam({ name: 'id', required: true, description: 'Dispute ID' }),
    ApiBody({ type: AddCommentDto })
  );
}

// Reviews Service Documentation
export function ApiCreateReview() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new review' }),
    ApiResponse({ status: 201, description: 'The review has been successfully created.' }),
    ApiResponse({ status: 400, description: 'Bad request.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiBody({ type: CreateReviewDto })
  );
}

export function ApiGetAllReviews() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all reviews' }),
    ApiResponse({ status: 200, description: 'Return all reviews.' })
  );
}

export function ApiGetReviewById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a review by id' }),
    ApiResponse({ status: 200, description: 'Return the review.' }),
    ApiResponse({ status: 404, description: 'Review not found.' }),
    ApiParam({ name: 'id', required: true, description: 'Review ID' })
  );
}

export function ApiGetReviewsByUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all reviews for a user' }),
    ApiResponse({ status: 200, description: 'Return all reviews for the user.' }),
    ApiResponse({ status: 404, description: 'User not found.' }),
    ApiParam({ name: 'userId', required: true, description: 'User ID' })
  );
}

// Exchange Service Documentation
export const ApiCreateExchangeListing = () => {
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

// Listings Service Documentation
export function ApiCreateListing() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new listing' }),
    ApiResponse({ status: 201, description: 'Listing created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiBody({ type: CreateListingDto })
  );
}

export function ApiGetAllListings() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all listings' }),
    ApiResponse({ status: 200, description: 'Return all listings' }),
    ApiQuery({ name: 'type', required: false, enum: ['CRYPTO_TO_FIAT', 'FIAT_TO_CRYPTO'] }),
    ApiQuery({ name: 'cryptocurrency', required: false, type: String }),
    ApiQuery({ name: 'fiatCurrency', required: false, type: String }),
    ApiQuery({ name: 'minRate', required: false, type: Number }),
    ApiQuery({ name: 'maxRate', required: false, type: Number }),
    ApiQuery({ name: 'paymentMethods', required: false, type: [String] }),
    ApiQuery({ name: 'isActive', required: false, type: Boolean })
  );
}

export function ApiGetListingById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a listing by ID' }),
    ApiResponse({ status: 200, description: 'Return the listing' }),
    ApiResponse({ status: 404, description: 'Listing not found' }),
    ApiParam({ name: 'id', required: true, description: 'Listing ID' })
  );
}

export function ApiUpdateListing() {
  return applyDecorators(
    ApiOperation({ summary: 'Update listing status' }),
    ApiResponse({ status: 200, description: 'Listing updated successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Listing not found' }),
    ApiParam({ name: 'id', required: true, description: 'Listing ID' }),
    ApiBody({ schema: { properties: { isActive: { type: 'boolean' } } } })
  );
}

export function ApiDeleteListing() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a listing' }),
    ApiResponse({ status: 200, description: 'Listing deleted successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Listing not found' }),
    ApiParam({ name: 'id', required: true, description: 'Listing ID' })
  );
}

// Offers Service Documentation
export function ApiCreateOffer() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new offer' }),
    ApiResponse({ status: 201, description: 'Offer created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiBody({ type: CreateOfferDto })
  );
}

export function ApiGetAllOffers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all offers' }),
    ApiResponse({ status: 200, description: 'Return all offers' }),
    ApiQuery({ name: 'userId', required: false, type: String }),
    ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'] })
  );
}

export function ApiGetOfferById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get an offer by ID' }),
    ApiResponse({ status: 200, description: 'Return the offer' }),
    ApiResponse({ status: 404, description: 'Offer not found' }),
    ApiParam({ name: 'id', required: true, description: 'Offer ID' })
  );
}

export function ApiAcceptOffer() {
  return applyDecorators(
    ApiOperation({ summary: 'Accept an offer' }),
    ApiResponse({ status: 200, description: 'Offer accepted successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Offer not found' }),
    ApiParam({ name: 'id', required: true, description: 'Offer ID' })
  );
}

export function ApiRejectOffer() {
  return applyDecorators(
    ApiOperation({ summary: 'Reject an offer' }),
    ApiResponse({ status: 200, description: 'Offer rejected successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Offer not found' }),
    ApiParam({ name: 'id', required: true, description: 'Offer ID' }),
    ApiBody({ schema: { properties: { reason: { type: 'string' } } } })
  );
}

export function ApiCancelOffer() {
  return applyDecorators(
    ApiOperation({ summary: 'Cancel an offer' }),
    ApiResponse({ status: 200, description: 'Offer cancelled successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'Offer not found' }),
    ApiParam({ name: 'id', required: true, description: 'Offer ID' })
  );
}

// Audit Service Documentation
export function ApiCreateAuditLog() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new audit log' }),
    ApiResponse({ status: 201, description: 'The audit log has been successfully created.' }),
    ApiResponse({ status: 400, description: 'Bad request.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiBody({ type: CreateAuditLogDto })
  );
}

export function ApiGetAllAuditLogs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all audit logs' }),
    ApiResponse({ status: 200, description: 'Return all audit logs.' }),
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number })
  );
}

export function ApiGetAuditLogById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get an audit log by id' }),
    ApiResponse({ status: 200, description: 'Return the audit log.' }),
    ApiResponse({ status: 404, description: 'Audit log not found.' }),
    ApiParam({ name: 'id', required: true, description: 'Audit log ID' })
  );
}

// Exchange Service Documentation
export function ApiGetActiveExchanges() {
  return applyDecorators(
    ApiOperation({ summary: 'Get active exchanges' }),
    ApiResponse({ status: 200, description: 'Return active exchanges' }),
    ApiQuery({ name: 'userId', required: false, type: String }),
    ApiQuery({ name: 'status', required: false, type: String }),
    ApiQuery({ name: 'type', required: false, enum: ['CRYPTO_TO_FIAT', 'FIAT_TO_CRYPTO'] })
  );
}

export function ApiConfirmExchangeStep() {
  return applyDecorators(
    ApiOperation({ summary: 'Confirm exchange step' }),
    ApiResponse({ status: 200, description: 'Step confirmed successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiParam({ name: 'id', required: true, description: 'Exchange ID' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          step: { type: 'string', enum: ['PAYMENT', 'RECEIPT'] },
          evidence: { type: 'string' }
        },
        required: ['step']
      }
    })
  );
}

export function ApiGetExchangeById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get exchange by ID' }),
    ApiResponse({ status: 200, description: 'Exchange retrieved successfully' }),
    ApiResponse({ status: 404, description: 'Exchange not found' }),
    ApiResponse({ status: 429, description: 'Too many requests' }),
    ApiParam({ name: 'id', required: true, description: 'Exchange ID' })
  );
}

// Scheduler Service Documentation
export function ApiCreateScheduledTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new scheduled task' }),
    ApiResponse({ status: 201, description: 'The task has been successfully created.' }),
    ApiResponse({ status: 400, description: 'Bad request.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiBody({ type: CreateTaskDto })
  );
}

export function ApiGetAllScheduledTasks() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all scheduled tasks' }),
    ApiResponse({ status: 200, description: 'Return all scheduled tasks.' })
  );
}

export function ApiGetScheduledTaskById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a scheduled task by id' }),
    ApiResponse({ status: 200, description: 'Return the scheduled task.' }),
    ApiResponse({ status: 404, description: 'Task not found.' }),
    ApiParam({ name: 'id', required: true, description: 'Task ID' })
  );
}

export function ApiCancelScheduledTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Cancel a scheduled task' }),
    ApiResponse({ status: 200, description: 'The task has been successfully cancelled.' }),
    ApiResponse({ status: 404, description: 'Task not found.' }),
    ApiParam({ name: 'id', required: true, description: 'Task ID' })
  );
} 