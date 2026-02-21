import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const total = 119.98;

export default function CheckoutPage() {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St" />
                            </div>
                             <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="Anytown" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input id="zip" placeholder="12345" />
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
                                <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM / YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
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
                            <div className="flex justify-between">
                                <span>Item 1: Classic Denim Jacket</span>
                                <span>$89.99</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Item 2: Floral Summer Dress</span>
                                <span>$65.00</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>$154.99</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>
                             <div className="flex justify-between text-muted-foreground">
                                <span>Taxes</span>
                                <span>$12.40</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>$172.39</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg">Place Order</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
