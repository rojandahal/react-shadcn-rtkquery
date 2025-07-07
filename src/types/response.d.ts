export interface Response<T> {
  data: T;
  message: string;
}

export interface MetaData {
  page: number;
  limit: number;
  total: number;
}

export interface PaginationResponse<T> {
  data: T[];
  metadata: MetaData;
}
