import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: DollarSign },
  { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: Users },
  { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: CreditCard },
  { title: 'Active Now', value: '+573', change: '+201 since last hour', icon: Activity },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
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
                {/* A chart or table of recent orders would go here */}
                <div className="flex items-center justify-center h-64 bg-muted rounded-md">
                    <p className="text-muted-foreground">Recent Orders Chart</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
