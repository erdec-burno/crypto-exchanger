export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};

export type ApiError = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};
