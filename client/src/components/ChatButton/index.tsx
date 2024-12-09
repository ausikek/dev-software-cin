import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function ChatButton({ ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "w-[13em] h-[2.5em] rounded-3xl bg-[#464646] hover:bg-[#464646]/90 text-white",
        props.className
      )}
    >
      {props.children}
    </Button>
  );
}
