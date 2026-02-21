import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { products } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const cartItems = [
    { ...products[0], quantity: 1, size: 'M', color: 'Blue' },
    { ...products[3], quantity: 1, size: 'S', color: 'Red' },
]

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
            <div className="space-y-6">
            {cartItems.map(item => {
                const image = PlaceHolderImages.find(img => img.id === item.imageIds[0]);
                return (
                    <Card key={item.id} className="flex items-center p-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            {image && <Image src={image.imageUrl} alt={item.name} data-ai-hint={image.imageHint} fill className="object-cover" />}
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Size: {item.size} / Color: {item.color}</p>
                            <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4"/></Button>
                            <span>{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4"/></Button>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-5 w-5"/>
                        </Button>
                    </Card>
                )
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
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
    </div>
  );
}
