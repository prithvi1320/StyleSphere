'use client';

import { useState, useTransition } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

import { generateDescriptionAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { categories } from '@/lib/placeholder-data';

export function ProductForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerateDescription = () => {
    startTransition(async () => {
      const result = await generateDescriptionAction(keywords);
      if (result.success && result.description) {
        setDescription(result.description);
        toast({
          title: 'Success',
          description: 'Product description generated successfully.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to generate description.',
        });
      }
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" placeholder="e.g. Classic Denim Jacket" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="keywords">Keywords for Description</Label>
                        <div className="flex items-center gap-2">
                        <Input
                            id="keywords"
                            placeholder="e.g. timeless, durable denim, stylish"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGenerateDescription}
                            disabled={isPending}
                        >
                            {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                            <Wand2 className="h-4 w-4" />
                            )}
                            <span className="ml-2 hidden sm:inline">Generate</span>
                        </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                        id="description"
                        placeholder="A timeless denim jacket..."
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
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
                        <Input id="price" type="number" placeholder="89.99" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="outline">Upload Images</Button>
                </CardContent>
            </Card>
             <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Product</Button>
            </div>
        </div>
    </div>
  );
}
