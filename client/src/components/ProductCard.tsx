import { type Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isLowStock = product.stockQuantity < 10;
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 flex flex-col h-full",
      isOutOfStock && "opacity-60 grayscale"
    )}>
      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          {isLowStock && !isOutOfStock && (
            <Badge variant="destructive" className="text-xs px-1.5 py-0 h-5">
              Low Stock
            </Badge>
          )}
        </div>
        
        <h3 className="font-display font-semibold text-lg line-clamp-2 mb-1" title={product.name}>
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">SKU: {product.sku}</p>
        
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">₹{product.sellingPrice}</span>
          <span className="text-xs text-muted-foreground">/unit</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product)}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
