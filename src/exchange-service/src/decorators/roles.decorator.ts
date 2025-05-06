import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  EXCHANGER = 'EXCHANGER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN'
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles); 