'use client';

import { useViraPassword } from '@virastack/password';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home, Star } from 'lucide-react';

export function CustomIconsDemo() {
  const { inputProps, btnProps } = useViraPassword({
    icons: {
      show: <Home className="h-4 w-4" />,
      hide: <Star className="h-4 w-4" />,
    },
  });

  return (
    <div className="flex w-full max-w-sm items-center gap-2 mt-4">
      <Input {...inputProps} defaultValue="ViraStack" placeholder="Password" />
      <Button {...btnProps} variant="outline" size="icon">
        {btnProps.children}
      </Button>
    </div>
  );
}
