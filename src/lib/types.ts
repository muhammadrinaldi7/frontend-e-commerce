import { CartItem } from "@/store/useCartStore";

export interface ResponseDefault<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaymentResponse {
  invoice_url: string;
  invoice_id: string;
}

export interface OrdersPayload {
  user_id: string;
  shipping_address: string;
  items: CartItem[];
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

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface CategoryResponse {
  id: string;
  category_name: string;
}
export interface ProductResponse {
  id: string;
  category_id: string;
  product_name: string;
  price: number;
  qty: number;
  image_product: string;
  gallery_product: string[];
  description: string;
  category: CategoryResponse;
}

export interface OrdersResponse {
  id: string;
  user_id: string;
  shipping_address: string;
  status: string;
  total_price: number;
  order_date: string;
}
