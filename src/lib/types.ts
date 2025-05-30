export interface ResponseDefault<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
export interface LinkResponse {
  url: string;
  label: string;
  active: boolean;
}
export interface PaginateResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkResponse[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
