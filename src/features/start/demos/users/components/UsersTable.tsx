import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FavoriteButton } from "@/features/start/demos/users/components/FavoriteButton";
import { RoleBadge } from "@/features/start/demos/users/components/RoleBadge";
import { getInitials } from "@/features/start/demos/users/helpers/get-initials";
import type { User } from "@/features/start/demos/users/schemas/user.schema";

type UsersTableProps = {
  users: User[];
};

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="rounded-lg border">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="hidden w-28 sm:table-cell">Role</TableHead>
            <TableHead className="hidden sm:table-cell">Department</TableHead>
            <TableHead className="w-14">
              <span className="sr-only">Favorite</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const name = `${user.firstName} ${user.lastName}`;

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 rounded shadow-[0_0_0_2px_var(--background),0_0_0_3px_var(--border)] after:rounded">
                      <AvatarImage src={user.image} alt="" className="rounded" />
                      <AvatarFallback className="rounded">{getInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.company?.title ?? `@${user.username}`}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <RoleBadge role={user.role}>{user.role}</RoleBadge>
                </TableCell>
                <TableCell className="hidden truncate text-muted-foreground sm:table-cell">
                  {user.company?.department ?? "—"}
                </TableCell>
                <TableCell>
                  <FavoriteButton userId={user.id} userName={name} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
