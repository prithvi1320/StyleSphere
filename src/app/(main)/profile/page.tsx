import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from "@/lib/placeholder-data";

export default function ProfilePage() {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your account details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue="Diana Prince" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue="diana@example.com" type="email" />
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Set a new password for your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button>Update Password</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="orders" className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.status}</TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
