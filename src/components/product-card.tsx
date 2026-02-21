import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';

import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const productImage = PlaceHolderImages.find((img) => img.id === product.imageIds[0]);

  return (
    <Card className={cn('overflow-hidden rounded-lg group', className)}>
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="relative block h-80 w-full overflow-hidden">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              data-ai-hint={productImage.imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
           <div className="absolute top-2 right-2">
            <Button size="icon" variant="ghost" className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-body font-bold leading-tight mb-1">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span>{product.rating}</span>
          </div>
          <span>({product.reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-lg font-headline font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <Button size="sm">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
