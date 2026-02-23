'use client';

import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/components/app-provider';
import { useToast } from '@/hooks/use-toast';

export default function AdminProductsPage() {
  const { products, categories, deleteProduct } = useApp();
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products and view their sales performance.</CardDescription>
          </div>
          <Button asChild size="sm" className="gap-1">
            <Link href="/admin/products/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{categories.find((category) => category.id === product.category)?.name ?? product.category}</Badge>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    aria-label={`Delete ${product.name}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      const result = deleteProduct(product.id);
                      if (!result.success) {
                        toast({ variant: 'destructive', title: 'Delete failed', description: result.error });
                        return;
                      }
                      toast({ title: 'Product deleted', description: product.name });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
