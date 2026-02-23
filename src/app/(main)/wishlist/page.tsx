'use client';

import Link from 'next/link';

import { ProductCard } from '@/components/product-card';
import { useApp } from '@/components/app-provider';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { products, wishlist } = useApp();
  const wishlistItems = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Your wishlist is empty.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Start shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
