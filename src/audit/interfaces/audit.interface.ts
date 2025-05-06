export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
  ipAddress: string;
  createdAt: Date;
} 