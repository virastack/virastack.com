"use client";

import { useViraPassword } from "@virastack/password";

export function BasicDemo() {
  const { inputProps, btnProps } = useViraPassword();

  return (
    <div className="flex w-full max-w-sm items-center gap-2 mt-4">
      <input
        {...inputProps}
        defaultValue="ViraStack"
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Password"
      />
      <button
        {...btnProps}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
      >
        {btnProps.children}
      </button>
    </div>
  );
}
