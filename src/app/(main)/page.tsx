import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { categories, products } from '@/lib/placeholder-data';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const heroBanner = PlaceHolderImages.find((img) => img.id === 'hero-banner-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        {heroBanner && (
          <Image
            src={heroBanner.imageUrl}
            alt="Hero Banner"
            data-ai-hint={heroBanner.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">
            Effortless Style, Enduring Quality
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Discover curated collections of modern, stylish, and elegant clothing that defines you.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {categories.map((category) => {
              const categoryImage = PlaceHolderImages.find(
                (img) => img.id === category.imageId
              );
              return (
                <Link key={category.id} href={`/products?category=${category.id}`} className="group relative block overflow-hidden rounded-lg">
                  {categoryImage && (
                    <Image
                      src={categoryImage.imageUrl}
                      alt={category.name}
                      width={600}
                      height={800}
                      data-ai-hint={categoryImage.imageHint}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white drop-shadow-md">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
