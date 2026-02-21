import { FilterSidebar } from '@/components/filter-sidebar';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/placeholder-data';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function ProductsPage() {
  return (
    <div className="container py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">All Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find your new favorite style.</p>
      </header>

      <div className="flex items-start gap-8">
        <FilterSidebar />
        <main className="flex-1">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
