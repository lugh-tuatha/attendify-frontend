export interface ApiResponseWithMeta<T> {
  statusCode: number;
  message: string;
  data: T[];
  meta: {
    total: number;
    totalVips: number;
  };
}