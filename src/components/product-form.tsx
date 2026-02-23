'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/components/app-provider';

export function ProductForm() {
  const { categories, createProduct } = useApp();
  const { toast } = useToast();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState('S, M, L');
  const [colors, setColors] = useState('Black');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = createProduct({
      name,
      description,
      category,
      price: Number(price),
      sizes: sizes.split(',').map((item) => item.trim()).filter(Boolean),
      colors: colors.split(',').map((item) => item.trim()).filter(Boolean),
    });
    if (!result.success) {
      toast({ variant: 'destructive', title: 'Could not save product', description: result.error });
      return;
    }
    toast({ title: 'Product created' });
    router.push('/admin/products');
  };

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={onSubmit}>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Classic Denim Jacket" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="A timeless denim jacket..."
                rows={8}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((entry) => (
                  <SelectItem key={entry.id} value={entry.id}>
                    {entry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" min="0" step="0.01" placeholder="89.99" value={price} onChange={(event) => setPrice(event.target.value)} required />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes (comma separated)</Label>
              <Input id="sizes" value={sizes} onChange={(event) => setSizes(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma separated)</Label>
              <Input id="colors" value={colors} onChange={(event) => setColors(event.target.value)} />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </div>
    </form>
  );
}
