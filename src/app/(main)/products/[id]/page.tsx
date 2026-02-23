'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, Minus, Plus, Star } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useApp } from '@/components/app-provider';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, isWishlisted } = useApp();
  const { toast } = useToast();
  const product = products.find((entry) => entry.id === params.id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? '');
  const [quantity, setQuantity] = useState(1);

  const productImages = useMemo(() => {
    if (!product) return [];
    return product.imageIds
      .map((id) => PlaceHolderImages.find((img) => img.id === id))
      .filter((image): image is ImagePlaceholder => Boolean(image));
  }, [product]);

  if (!product) {
    return <div className="container py-12 text-center text-muted-foreground">Product not found.</div>;
  }

  const onAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor, quantity);
    toast({ title: 'Added to cart', description: `${product.name} x${quantity}` });
  };

  return (
    <div className="container py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            {productImages[0] && (
              <Image
                src={productImages[0].imageUrl}
                alt={product.name}
               
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.slice(1).map((image) => (
              <div key={image.id} className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image src={image.imageUrl} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
          <p className="mt-4 text-3xl font-headline font-bold text-primary">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <Separator className="my-8" />

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    className="capitalize"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant={selectedSize === size ? 'default' : 'outline'} className="w-12" onClick={() => setSelectedSize(size)}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-bold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => prev + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={onAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="px-4" onClick={() => toggleWishlist(product.id)}>
              <Heart className={`h-6 w-6 ${isWishlisted(product.id) ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>

          <Accordion type="single" collapsible className="mt-8 w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>Free shipping on orders over $50. Easy returns within 30 days.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

