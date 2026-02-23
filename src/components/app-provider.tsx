'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { categories, orders as seedOrders, products as seedProducts, users as seedUsers } from '@/lib/placeholder-data';
import type { CartItem, Order, Product, User } from '@/lib/types';

type Credentials = Record<string, string>;

type StoredState = {
  products: Product[];
  users: User[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  currentUserId: string | null;
  credentials: Credentials;
};

type ProductDraft = {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
};

type PlaceOrderInput = {
  fullName: string;
  address: string;
  city: string;
  zip: string;
};

type AppContextValue = {
  ready: boolean;
  products: Product[];
  users: User[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  categories: typeof categories;
  currentUser: User | null;
  isAdmin: boolean;
  cartCount: number;
  cartSubtotal: number;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (name: string, email: string) => { success: boolean; error?: string };
  updatePassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
  addToCart: (productId: string, size: string, color: string, quantity?: number) => void;
  updateCartItem: (index: number, quantity: number) => void;
  removeCartItem: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  createProduct: (draft: ProductDraft) => { success: boolean; error?: string };
  deleteProduct: (productId: string) => { success: boolean; error?: string };
  updateOrderStatus: (orderId: string, status: Order['status']) => { success: boolean; error?: string };
  placeOrder: (input: PlaceOrderInput) => { success: boolean; error?: string; orderId?: string };
};

const STORAGE_KEY = 'stylesphere_state_v1';

const seedCredentials: Credentials = {
  'alice@example.com': 'admin123',
  'bob@example.com': 'password123',
  'charlie@example.com': 'password123',
  'diana@example.com': 'password123',
};

const AppContext = createContext<AppContextValue | null>(null);

function cloneSeedProducts(): Product[] {
  return seedProducts.map((item) => ({ ...item, sizes: [...item.sizes], colors: [...item.colors], imageIds: [...item.imageIds] }));
}

function cloneSeedUsers(): User[] {
  return seedUsers.map((item) => ({ ...item }));
}

function cloneSeedOrders(): Order[] {
  return seedOrders.map((item) => ({ ...item }));
}

function initialState(): StoredState {
  return {
    products: cloneSeedProducts(),
    users: cloneSeedUsers(),
    orders: cloneSeedOrders(),
    cart: [],
    wishlist: [],
    currentUserId: null,
    credentials: { ...seedCredentials },
  };
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function toMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState<Product[]>(cloneSeedProducts());
  const [users, setUsers] = useState<User[]>(cloneSeedUsers());
  const [orders, setOrders] = useState<Order[]>(cloneSeedOrders());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Credentials>({ ...seedCredentials });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredState;
        setProducts(Array.isArray(parsed.products) ? parsed.products : cloneSeedProducts());
        setUsers(Array.isArray(parsed.users) ? parsed.users : cloneSeedUsers());
        setOrders(Array.isArray(parsed.orders) ? parsed.orders : cloneSeedOrders());
        setCart(Array.isArray(parsed.cart) ? parsed.cart : []);
        setWishlist(Array.isArray(parsed.wishlist) ? parsed.wishlist : []);
        setCurrentUserId(typeof parsed.currentUserId === 'string' ? parsed.currentUserId : null);
        setCredentials(parsed.credentials && typeof parsed.credentials === 'object' ? parsed.credentials : { ...seedCredentials });
      }
    } catch {
      const fallback = initialState();
      setProducts(fallback.products);
      setUsers(fallback.users);
      setOrders(fallback.orders);
      setCart(fallback.cart);
      setWishlist(fallback.wishlist);
      setCurrentUserId(fallback.currentUserId);
      setCredentials(fallback.credentials);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const payload: StoredState = {
      products,
      users,
      orders,
      cart,
      wishlist,
      currentUserId,
      credentials,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [ready, products, users, orders, cart, wishlist, currentUserId, credentials]);

  const currentUser = useMemo(() => users.find((user) => user.id === currentUserId) ?? null, [users, currentUserId]);
  const isAdmin = currentUser?.role === 'admin';

  const cartSubtotal = useMemo(() => {
    return toMoney(
      cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        if (!product) {
          return sum;
        }
        return sum + product.price * item.quantity;
      }, 0)
    );
  }, [cart, products]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const register: AppContextValue['register'] = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail || !password.trim()) {
      return { success: false, error: 'All fields are required.' };
    }
    const exists = users.some((user) => user.email.toLowerCase() === normalizedEmail);
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const id = `${Date.now()}`;
    const nextUser: User = {
      id,
      name: name.trim(),
      email: normalizedEmail,
      role: 'customer',
      createdAt: formatDate(new Date()),
    };
    setUsers((prev) => [nextUser, ...prev]);
    setCredentials((prev) => ({ ...prev, [normalizedEmail]: password }));
    setCurrentUserId(id);
    return { success: true };
  };

  const login: AppContextValue['login'] = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find((user) => user.email.toLowerCase() === normalizedEmail);
    if (!matchedUser) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const storedPassword = credentials[normalizedEmail];
    const defaultPassword = matchedUser.role === 'admin' ? 'admin123' : 'password123';
    const validPassword = storedPassword ? storedPassword === password : password === defaultPassword;
    if (!validPassword) {
      return { success: false, error: 'Invalid email or password.' };
    }
    setCurrentUserId(matchedUser.id);
    return { success: true };
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const updateProfile: AppContextValue['updateProfile'] = (name, email) => {
    if (!currentUser) {
      return { success: false, error: 'Please sign in first.' };
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail) {
      return { success: false, error: 'Name and email are required.' };
    }
    const conflict = users.some((user) => user.id !== currentUser.id && user.email.toLowerCase() === normalizedEmail);
    if (conflict) {
      return { success: false, error: 'Email is already in use.' };
    }
    setUsers((prev) => prev.map((user) => (user.id === currentUser.id ? { ...user, name: name.trim(), email: normalizedEmail } : user)));
    setCredentials((prev) => {
      const copy = { ...prev };
      const oldKey = currentUser.email.toLowerCase();
      const currentPassword = copy[oldKey];
      if (oldKey !== normalizedEmail) {
        delete copy[oldKey];
      }
      if (currentPassword) {
        copy[normalizedEmail] = currentPassword;
      }
      return copy;
    });
    return { success: true };
  };

  const updatePassword: AppContextValue['updatePassword'] = (currentPassword, newPassword) => {
    if (!currentUser) {
      return { success: false, error: 'Please sign in first.' };
    }
    const email = currentUser.email.toLowerCase();
    const existing = credentials[email] ?? (currentUser.role === 'admin' ? 'admin123' : 'password123');
    if (existing !== currentPassword) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (!newPassword.trim() || newPassword.trim().length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }
    setCredentials((prev) => ({ ...prev, [email]: newPassword }));
    return { success: true };
  };

  const addToCart: AppContextValue['addToCart'] = (productId, size, color, quantity = 1) => {
    if (quantity <= 0) {
      return;
    }
    const product = products.find((entry) => entry.id === productId);
    if (!product) {
      return;
    }
    setCart((prev) => {
      const index = prev.findIndex((item) => item.productId === productId && item.size === size && item.color === color);
      if (index < 0) {
        return [
          ...prev,
          {
            productId,
            name: product.name,
            price: product.price,
            imageId: product.imageIds[0] ?? '',
            quantity,
            size,
            color,
          },
        ];
      }
      return prev.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }
        return { ...item, quantity: item.quantity + quantity };
      });
    });
  };

  const updateCartItem: AppContextValue['updateCartItem'] = (index, quantity) => {
    setCart((prev) => {
      if (index < 0 || index >= prev.length) {
        return prev;
      }
      if (quantity <= 0) {
        return prev.filter((_, itemIndex) => itemIndex !== index);
      }
      return prev.map((item, itemIndex) => (itemIndex === index ? { ...item, quantity } : item));
    });
  };

  const removeCartItem: AppContextValue['removeCartItem'] = (index) => {
    setCart((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist: AppContextValue['toggleWishlist'] = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const isWishlisted: AppContextValue['isWishlisted'] = (productId) => {
    return wishlist.includes(productId);
  };

  const createProduct: AppContextValue['createProduct'] = (draft) => {
    if (!isAdmin) {
      return { success: false, error: 'Admin access required.' };
    }
    if (!draft.name.trim() || !draft.description.trim() || !draft.category || !Number.isFinite(draft.price) || draft.price <= 0) {
      return { success: false, error: 'Please fill all required fields with valid values.' };
    }
    const numericIds = products.map((item) => Number(item.id)).filter((value) => Number.isFinite(value));
    const nextId = `${(numericIds.length ? Math.max(...numericIds) : 0) + 1}`;
    const fallbackImage = seedProducts[0]?.imageIds[0] ?? 'product-1-a';
    const nextProduct: Product = {
      id: nextId,
      name: draft.name.trim(),
      description: draft.description.trim(),
      price: toMoney(draft.price),
      category: draft.category,
      sizes: draft.sizes.length ? draft.sizes : ['M'],
      colors: draft.colors.length ? draft.colors : ['Black'],
      imageIds: [fallbackImage],
      rating: 0,
      reviewCount: 0,
    };
    setProducts((prev) => [nextProduct, ...prev]);
    return { success: true };
  };

  const deleteProduct: AppContextValue['deleteProduct'] = (productId) => {
    if (!isAdmin) {
      return { success: false, error: 'Admin access required.' };
    }
    const exists = products.some((product) => product.id === productId);
    if (!exists) {
      return { success: false, error: 'Product not found.' };
    }
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    return { success: true };
  };

  const updateOrderStatus: AppContextValue['updateOrderStatus'] = (orderId, status) => {
    if (!isAdmin) {
      return { success: false, error: 'Admin access required.' };
    }
    const exists = orders.some((order) => order.id === orderId);
    if (!exists) {
      return { success: false, error: 'Order not found.' };
    }
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    return { success: true };
  };

  const placeOrder: AppContextValue['placeOrder'] = (input) => {
    if (!currentUser) {
      return { success: false, error: 'Please sign in to place an order.' };
    }
    if (!input.fullName.trim() || !input.address.trim() || !input.city.trim() || !input.zip.trim()) {
      return { success: false, error: 'Please complete shipping details.' };
    }
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }
    const shipping = 5;
    const total = toMoney(cartSubtotal + shipping);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      userId: currentUser.id,
      userName: currentUser.name,
      total,
      status: 'Pending',
      date: formatDate(new Date()),
      itemCount,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return { success: true, orderId };
  };

  const value: AppContextValue = {
    ready,
    products,
    users,
    orders,
    cart,
    wishlist,
    categories,
    currentUser,
    isAdmin,
    cartCount,
    cartSubtotal,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    toggleWishlist,
    isWishlisted,
    createProduct,
    deleteProduct,
    updateOrderStatus,
    placeOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
