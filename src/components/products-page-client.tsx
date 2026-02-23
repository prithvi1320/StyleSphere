'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ProductCard } from '@/components/product-card';
import { useApp } from '@/components/app-provider';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PAGE_SIZE = 6;

export function ProductsPageClient({ initialCategory }: { initialCategory: string }) {
  const router = useRouter();
  const { products, categories } = useApp();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [categoryParam, setCategoryParam] = useState(initialCategory || 'all');

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const byCategory =
      categoryParam === 'all'
        ? products
        : products.filter((product) => product.category.toLowerCase() === categoryParam.toLowerCase());
    const byText = normalizedSearch
      ? byCategory.filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedSearch) || product.description.toLowerCase().includes(normalizedSearch)
        )
      : byCategory;
    const sorted = [...byText];
    if (sortBy === 'price_low_high') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_high_low') sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [products, categoryParam, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="container py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">All Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find your new favorite style.</p>
      </header>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search by name or description"
        />
        <Select
          value={categoryParam}
          onValueChange={(value) => {
            setCategoryParam(value);
            setPage(1);
            router.replace(value === 'all' ? '/products' : `/products?category=${value}`);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price_low_high">Price: Low to High</SelectItem>
            <SelectItem value="price_high_low">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">No products match your filters.</div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage((prev) => Math.max(1, prev - 1));
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === currentPage}
                    onClick={(event) => {
                      event.preventDefault();
                      setPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage((prev) => Math.min(totalPages, prev + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
