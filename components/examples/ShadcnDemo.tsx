'use client';

import { useViraPassword } from '@virastack/password';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function ShadcnDemo() {
  const { inputProps, btnProps } = useViraPassword();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
      <Label htmlFor={inputProps.id}>Password</Label>
      <div className="flex w-full items-center gap-2">
        <Input
          {...inputProps}
          defaultValue="ViraStack"
          placeholder="Enter your password"
        />
        <Button {...btnProps} variant="ghost" size="icon">
          {btnProps.children}
        </Button>
      </div>
    </div>
  );
}
