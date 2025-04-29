export interface IResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResponse<T> extends IResponse<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 