import { Toaster } from "sonner";

import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <TooltipProvider delay={300}>{children}</TooltipProvider>
        <Toaster richColors position="bottom-right" closeButton />
      </QueryProvider>
    </ThemeProvider>
  );
}
