import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Heart, Minus, Plus, Star } from 'lucide-react';

import { products } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const productImages = product.imageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                {productImages[0] && (
                    <Image
                    src={productImages[0].imageUrl}
                    alt={product.name}
                    data-ai-hint={productImages[0].imageHint}
                    fill
                    className="object-cover"
                    />
                )}
            </div>
            <div className="grid grid-cols-4 gap-4">
            {productImages.slice(1).map((image) => image && (
                <div key={image.id} className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                    src={image.imageUrl}
                    alt={product.name}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                />
                </div>
            ))}
            </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
          </div>
          <p className="mt-4 text-3xl font-headline font-bold text-primary">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          <Separator className="my-8" />
          
          {/* Options */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <Button key={color} variant={product.colors.length > 1 && color === product.colors[0] ? "default" : "outline"} className="capitalize">
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <Button key={size} variant="outline" className="w-12">{size}</Button>
                ))}
              </div>
            </div>
             <div>
                <h3 className="text-sm font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon"><Minus className="h-4 w-4" /></Button>
                    <span className="font-bold text-lg">1</span>
                    <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
                </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex gap-4">
            <Button size="lg" className="flex-1">Add to Cart</Button>
            <Button size="lg" variant="outline" className="px-4">
              <Heart className="h-6 w-6" />
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                More detailed information about the fabric, fit, and care instructions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free shipping on orders over $50. Easy returns within 30 days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
