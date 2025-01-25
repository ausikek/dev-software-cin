import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant: 'bubble' | 'button';
};

export default function ChatButton({ variant, ...props }: ButtonProps) {
  if (variant == 'button') {
    return (
      <Button
        {...props}
        className={cn(
          'w-[13rem] h-[2.5rem] rounded-3xl bg-[#464646] hover:bg-[#464646]/90 text-white',
          props.className
        )}
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <div
        className={cn(
          'w-auto min-w-[13rem] max-w-[30rem] h-auto min-h-[2.5rem] rounded-3xl bg-[#464646] hover:bg-[#464646]/90 text-white flex items-center justify-center p-4',
          props.className
        )}
      >
        {props.children}
      </div>
    );
  }
}
