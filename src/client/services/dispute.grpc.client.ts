import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { DISPUTE_SERVICE } from '../constants';
import { CreateDisputeDto, ResolveDisputeDto } from '../interfaces/client.swagger';
import {
  GetOpenDisputesResponse,
  GetDisputeCommentsResponse,
  GetDisputeChatRequest,
  GetDisputeCommentsRequest,
  AddDisputeCommentRequest,
  GetOpenDisputesRequest,
  GetDisputesByUserRequest,
  GetDisputesByUserResponse,
  Dispute,
  Chat,
  Comment,
  DisputeServiceClient
} from '../../proto/generated/disputes.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DisputeGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(DISPUTE_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'DisputeService');
  }

  /**
   * Creates a new dispute
   * @param dto - Data for creating a dispute
   * @returns {Promise<Dispute>} Created dispute
   */
  async createDispute(dto: CreateDisputeDto): Promise<Dispute> {
    const service = this.getService<any>('DisputeService');
    return firstValueFrom(service.createDispute(dto));
  }

  /**
   * Resolves a dispute
   * @param dto - Data for resolving a dispute
   * @returns {Promise<Dispute>} Resolved dispute
   */
  async resolveDispute(dto: ResolveDisputeDto): Promise<Dispute> {
    const service = this.getService<any>('DisputeService');
    return firstValueFrom(service.resolveDispute(dto));
  }

  /**
   * Gets a dispute by ID
   * @param disputeId - ID of the dispute
   * @returns {Promise<Dispute>} Dispute
   */
  async getDispute(disputeId: string): Promise<Dispute> {
    const service = this.getService<any>('DisputeService');
    return firstValueFrom(service.getDispute({ disputeId }));
  }

  /**
   * Gets user's disputes
   * @param userId - ID of the user
   * @returns {Promise<GetDisputesByUserResponse>} List of disputes
   */
  async getUserDisputes(userId: string): Promise<GetDisputesByUserResponse> {
    const service = this.getService<any>('DisputeService');
    const request: GetDisputesByUserRequest = { userId };
    return firstValueFrom(service.getDisputesByUser(request));
  }

  /**
   * Gets open disputes
   * @returns {Promise<GetOpenDisputesResponse>} List of open disputes
   */
  async getOpenDisputes(): Promise<GetOpenDisputesResponse> {
    const service = this.getService<any>('DisputeService');
    const request: GetOpenDisputesRequest = {};
    return firstValueFrom(service.getOpenDisputes(request));
  }

  /**
   * Gets dispute chat
   * @param request - Request data
   * @returns {Promise<Chat>} Chat
   */
  async getDisputeChat(request: GetDisputeChatRequest): Promise<Chat> {
    const service = this.getService<any>('DisputeService');
    return firstValueFrom(service.getDisputeChat(request));
  }

  /**
   * Gets dispute comments
   * @param request - Request data
   * @returns {Promise<GetDisputeCommentsResponse>} Comments
   */
  async getDisputeComments(request: GetDisputeCommentsRequest): Promise<GetDisputeCommentsResponse> {
    const service = this.getService<any>('DisputeService');
    return firstValueFrom(service.getDisputeComments(request));
  }

  /**
   * Adds a comment to a dispute
   * @param request - Request data
   * @returns {Promise<Comment>} Created comment
   */
  async addComment(request: AddDisputeCommentRequest): Promise<Comment> {
    const service = this.getService<any>('DisputeService');
    return firstValueFrom(service.addDisputeComment(request));
  }
} 