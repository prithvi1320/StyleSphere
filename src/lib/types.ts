export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  imageIds: string[];
  rating: number;
  reviewCount: number;
};

export type Category = {
  id: string;
  name: string;
  imageId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: string;
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  itemCount: number;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  imageId: string;
  quantity: number;
  size: string;
  color: string;
};
