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
  message: string | "error";
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
  is_admin: number;
  avatar: string;
}

export interface DashboardResponse {
  product: number;
  order: number;
  user: number;
  notDelivered: number;
  category: number;
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
  gallery_product: string;
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
  details: DetailResponse[];
  payment: PaymentResponse;
}

export interface PaymentResponse {
  external_id: string;
  id: string;
  order_id: string;
  payment_method: string;
  payment_status: string | null;
  payment_date: string;
}

export interface DetailResponse {
  id: string;
  product_id: string;
  order_id: string;
  quantity: number;
  product: ProductResponse;
}

export interface ProductPayload {
  category_id: string;
  product_name: string;
  price: number;
  qty: number;
  image_product: File | null;
  gallery_product: string | null;
  description: string;
}
