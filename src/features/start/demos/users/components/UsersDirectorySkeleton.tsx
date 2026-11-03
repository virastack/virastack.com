import { UsersTableSkeleton } from "@/features/start/demos/users/components/UsersTableSkeleton";
import { Skeleton } from "@/features/start/demos/users/ui/skeleton";

export function UsersDirectorySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-9 w-full" />
      <UsersTableSkeleton />
    </div>
  );
}
