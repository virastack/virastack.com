"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addUser } from "@/features/start/demos/users/api/add-user.api";
import { userKeys } from "@/features/start/demos/users/api/query-keys";
import type { AddUserInput } from "@/features/start/demos/users/schemas/user.schema";

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddUserInput) => addUser(input),
    onSettled: () => queryClient.invalidateQueries({ queryKey: userKeys.lists() }),
  });
}
