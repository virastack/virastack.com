import { ProductGridSkeleton } from "@/features/start/demos/products/components/ProductGridSkeleton";
import { Skeleton } from "@/features/start/demos/users/ui/skeleton";

/** The page's loading state while the URL is read, with the toolbar and the grid in place. */
export function ProductListSkeleton() {
  return (
    <div className="@container flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 sm:w-44" />
        <Skeleton className="h-9 sm:w-44" />
      </div>
      <Skeleton className="h-5 w-32" />
      <ProductGridSkeleton />
    </div>
  );
}
