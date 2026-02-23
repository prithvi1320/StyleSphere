'use client';

import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/components/app-provider';

export default function AdminDashboardPage() {
  const { products, users, orders } = useApp();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((order) => order.status === 'Pending').length;
  const stats = [
    { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, subtitle: `${orders.length} orders`, icon: DollarSign },
    { title: 'Customers', value: `${users.length}`, subtitle: 'Registered users', icon: Users },
    { title: 'Products', value: `${products.length}`, subtitle: 'Active catalog items', icon: CreditCard },
    { title: 'Pending Orders', value: `${pendingOrders}`, subtitle: 'Require fulfillment', icon: Activity },
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 6).map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
