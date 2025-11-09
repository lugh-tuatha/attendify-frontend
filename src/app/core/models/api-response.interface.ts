/**
 * Standard API response wrapper
 * Ensures consistent response structure across all endpoints
 */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}