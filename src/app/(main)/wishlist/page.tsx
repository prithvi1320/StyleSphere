import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/placeholder-data";

export default function WishlistPage() {
    const wishlistItems = products.slice(2, 5);

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlistItems.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">Your wishlist is empty.</p>
            )}
        </div>
    )
}
