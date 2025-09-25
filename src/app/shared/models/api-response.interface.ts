export interface ApiResponse<T> {
  status: number;
  message: string;
  results: number;
  data: T;
}