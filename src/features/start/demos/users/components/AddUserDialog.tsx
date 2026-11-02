"use client";

import { PlusIcon } from "lucide-react";

import { AddUserForm } from "@/features/start/demos/users/components/AddUserForm";
import { Button } from "@/features/start/demos/users/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/start/demos/users/ui/dialog";

export function AddUserDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button className="shrink-0" />}>
        <PlusIcon aria-hidden />
        Add user
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Sends a real POST request to the DummyJSON demo API.
          </DialogDescription>
        </DialogHeader>
        <AddUserForm />
      </DialogContent>
    </Dialog>
  );
}
