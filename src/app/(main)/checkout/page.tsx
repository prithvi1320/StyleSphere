'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/components/app-provider';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cart, products, cartSubtotal, currentUser, placeOrder } = useApp();
  const { toast } = useToast();
  const router = useRouter();
  const [fullName, setFullName] = useState(currentUser?.name ?? '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const shipping = cart.length > 0 ? 5 : 0;
  const taxes = useMemo(() => Math.round(cartSubtotal * 0.08 * 100) / 100, [cartSubtotal]);
  const total = cartSubtotal + shipping + taxes;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = placeOrder({ fullName, address, city, zip });
    if (!result.success) {
      toast({ title: 'Unable to place order', description: result.error, variant: 'destructive' });
      return;
    }
    toast({ title: 'Order placed', description: `Order ID: ${result.orderId}` });
    router.push('/profile');
  };

  if (cart.length === 0) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-xl rounded-lg border p-8 text-center">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="mt-3 text-muted-foreground">Your cart is empty.</p>
          <Button className="mt-6" onClick={() => router.push('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Checkout</h1>
      <form className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={fullName} onChange={(event) => setFullName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" value={address} onChange={(event) => setAddress(event.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" value={city} onChange={(event) => setCity(event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" value={zip} onChange={(event) => setZip(event.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information below. All transactions are secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM / YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${((products.find((entry) => entry.id === item.productId)?.price ?? item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" type="submit">
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
