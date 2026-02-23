'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useApp } from '@/components/app-provider';

export default function CartPage() {
  const { cart, products, cartSubtotal, updateCartItem, removeCartItem } = useApp();
  const shipping = cart.length > 0 ? 5 : 0;
  const total = cartSubtotal + shipping;

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item, index) => {
                const product = products.find((entry) => entry.id === item.productId);
                if (!product) {
                  return null;
                }
                const image = PlaceHolderImages.find((img) => img.id === item.imageId);
                return (
                  <Card key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center p-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-md">
                      {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size} / Color: {item.color}
                      </p>
                      <p className="mt-1 text-lg font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCartItem(index, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCartItem(index, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeCartItem(index)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coupon">Coupon Code</Label>
                  <div className="flex space-x-2">
                    <Input id="coupon" placeholder="Enter coupon code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

