'use client';

import { useViraPassword } from '@virastack/password';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SelfClosingDemo() {
  const { inputProps, btnProps } = useViraPassword();

  return (
    <div className="relative w-full max-w-sm mt-4">
      <Input
        {...inputProps}
        defaultValue="ViraStack"
        className="pr-10"
        placeholder="Password"
      />
      <Button
        {...btnProps}
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      />
    </div>
  );
}
